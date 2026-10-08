import{describe,expect,it}from"vitest";
import{createAppSave,migrateToV3,newCareerSave}from"../campaign/persistence";
import type{Character}from"../character-foundation/models";
import{FINANCIAL_CENTERS,specialtiesForEra}from"./catalog";
import{ExpansionStateSchema}from"./schema";
import{activeBranchModifiers,canOpenBranch,centerAvailable,createExpansionState,openBranch}from"./service";
import type{ExpansionContext,ExpansionState,FinancialCenterId}from"./models";

const character:Character={schemaVersion:1,id:"test",actorType:"PLAYER",name:"Test",avatar:"avatar-classic",archetype:"BANKER",traits:["NEGOTIATOR","NETWORK_BUILDER"],weakness:"IMPATIENT",stats:{trading:60,risk:70,information:70,network:80,reputation:90,influence:80},level:8,xp:0,reputation:90,credits:5000,unlockedSkills:["OFFICE_MANAGEMENT","BRANCH_PLANNING"]};
const context=(overrides:Partial<ExpansionContext>={}):ExpansionContext=>({year:1900,round:12,officeLevel:5,cash:1_000_000,character,...overrides});
const branch=(centerId:FinancialCenterId)=>({id:`branch-${centerId.toLowerCase()}-1`,centerId,status:"ACTIVE"as const,level:1,openedRound:1,openedYear:1900,upgrades:[]});

describe("global expansion foundation",()=>{
 it("registers the headquarters and seven branch centers",()=>{expect(FINANCIAL_CENTERS).toHaveLength(8);expect(FINANCIAL_CENTERS.map(x=>x.id)).toEqual(["NEW_YORK","LONDON","FRANKFURT","ZURICH","PARIS","CHICAGO","TOKYO","HONG_KONG"])});
 it("creates New York as headquarters",()=>expect(createExpansionState()).toEqual({headquarters:"NEW_YORK",branches:[]}));
 it("applies era availability",()=>{expect(centerAvailable("TOKYO",1877)).toBe(false);expect(centerAvailable("TOKYO",1878)).toBe(true)});
 it("uses historical and modern London specialties",()=>{const london=FINANCIAL_CENTERS.find(x=>x.id==="LONDON")!;expect(specialtiesForEra(london,1900)).toContain("Government Bonds");expect(specialtiesForEra(london,1985)).toContain("Eurobonds");expect(specialtiesForEra(london,2020)).toContain("Global Capital Markets")});
 it.each([
  ["office level",{officeLevel:2},"requires_office_level"],
  ["cash",{cash:1},"requires_cash"],
  ["credits",{character:{...character,credits:1}},"requires_credits"],
  ["character level",{character:{...character,level:2}},"requires_character_level"],
  ["reputation",{character:{...character,stats:{...character.stats,reputation:20}}},"requires_reputation"],
  ["skill",{character:{...character,unlockedSkills:["OFFICE_MANAGEMENT"]}},"requires_skill"],
 ] as const)("enforces %s requirements",(_name,override,reason)=>expect(canOpenBranch(createExpansionState(),"LONDON",context(override as Partial<ExpansionContext>)).reasons).toContain(reason));
 it("rejects the headquarters, future centers and active branches",()=>{expect(canOpenBranch(createExpansionState(),"NEW_YORK",context()).reasons).toContain("headquarters");expect(canOpenBranch(createExpansionState(),"TOKYO",context({year:1800})).reasons).toContain("era_locked");expect(canOpenBranch({...createExpansionState(),branches:[branch("LONDON")]},"LONDON",context()).reasons).toContain("already_active")});
 it("requires London before Hong Kong",()=>expect(canOpenBranch(createExpansionState(),"HONG_KONG",context()).reasons).toContain("requires_london"));
 it("opens a branch atomically and deducts its exact cost",()=>{const before=createExpansionState(),result=openBranch(before,"LONDON",context());expect(before.branches).toHaveLength(0);expect(result.state.branches[0]).toMatchObject({centerId:"LONDON",status:"ACTIVE",level:1,openedRound:12,openedYear:1900});expect(result.cash).toBe(750_000);expect(result.credits).toBe(4000)});
 it("does not mutate state when opening fails",()=>{const before=createExpansionState(),snapshot=structuredClone(before);expect(()=>openBranch(before,"LONDON",context({cash:0}))).toThrow();expect(before).toEqual(snapshot)});
 it("exposes only active branch modifiers",()=>{const state:ExpansionState={...createExpansionState(),branches:[branch("LONDON"),branch("CHICAGO")]};expect(activeBranchModifiers(state).map(x=>x.scope)).toEqual(expect.arrayContaining(["INTERNATIONAL_TRADE","COMMODITIES","AGRICULTURE"]));expect(activeBranchModifiers(createExpansionState())).toEqual([])});
 it("rejects duplicate, headquarters and malformed branches",()=>{expect(ExpansionStateSchema.safeParse({headquarters:"NEW_YORK",branches:[branch("LONDON"),branch("LONDON")]}).success).toBe(false);expect(ExpansionStateSchema.safeParse({headquarters:"NEW_YORK",branches:[branch("NEW_YORK")]}).success).toBe(false);expect(ExpansionStateSchema.safeParse({headquarters:"NEW_YORK",branches:[{...branch("LONDON"),level:0}]}).success).toBe(false)});
 it("adds expansion state to fresh careers",()=>expect(newCareerSave().expansionState).toEqual(createExpansionState()));
 it("migrates older v3 saves and preserves valid branches",()=>{const old={...createAppSave()}as Record<string,unknown>;delete old.expansionState;expect(migrateToV3(old).expansionState).toEqual(createExpansionState());const saved={...createAppSave(),expansionState:{headquarters:"NEW_YORK"as const,branches:[branch("LONDON")]}};expect(migrateToV3(saved).expansionState.branches[0].centerId).toBe("LONDON")});
});
