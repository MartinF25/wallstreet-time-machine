import{describe,expect,it}from"vitest";import{createAppSave,migrateToV3,newCareerSave}from"../campaign/persistence";import{createOfficeState,getOfficeEraPresentation,normalizeOfficeState,OFFICE_LEVELS,OFFICE_ZONES}from"./service";
describe("office headquarters foundation",()=>{
 it("creates a level one broker office",()=>expect(createOfficeState()).toMatchObject({level:1,upgrades:[]}));
 it("unlocks every functional level one zone",()=>{const state=createOfficeState(),required=["DESK","MARKET_BOARD","NEWSPAPER","TELEPHONE","RESEARCH","CHARACTER"];expect(required.every(x=>state.unlockedZones.includes(x as never))).toBe(true)});
 it("exposes expansion and the gated mandate table",()=>{const state=createOfficeState();expect(state.unlockedZones).toContain("WORLD_MAP");expect(state.unlockedZones).toContain("CONFERENCE_TABLE")});
 it("defines all five planned office levels",()=>expect(OFFICE_LEVELS.map(x=>x.name)).toEqual(["Broker Office","Successful Trader Office","Wall Street Firm","Investment House","Global Financial Headquarters"]));
 it("gives unlocked zones existing screen targets",()=>expect(OFFICE_ZONES.filter(x=>x.unlockLevel===1).every(x=>Boolean(x.target))).toBe(true));
 it("uses ledger technology before 1920",()=>expect(getOfficeEraPresentation(1907)).toMatchObject({id:"LEDGER",communicationDevice:expect.stringMatching(/telephone|telegraph/i)}));
 it("uses art deco presentation from 1920",()=>expect(getOfficeEraPresentation(1929).id).toBe("DECO"));
 it("uses mid-century office presentation",()=>expect(getOfficeEraPresentation(1973).id).toBe("MID_CENTURY"));
 it("uses terminals without modernizing earlier eras",()=>{expect(getOfficeEraPresentation(1987).id).toBe("TERMINAL");expect(getOfficeEraPresentation(1907).marketDevice).not.toMatch(/digital|computer|PC/i)});
 it("uses a digital headquarters in modern eras",()=>expect(getOfficeEraPresentation(2026).id).toBe("DIGITAL"));
 it("adds office state to new careers",()=>expect(newCareerSave().officeState.level).toBe(1));
 it("migrates older v3 saves with a valid office",()=>{const raw={...createAppSave()}as Record<string,unknown>;delete raw.officeState;expect(migrateToV3(raw).officeState).toEqual(createOfficeState())});
 it("normalizes saved zones without losing valid progress",()=>{const state=normalizeOfficeState({level:2,unlockedZones:["WORLD_MAP"],upgrades:["BETTER_TICKER"]});expect(state.level).toBe(2);expect(state.unlockedZones).toContain("DESK");expect(state.unlockedZones).toContain("WORLD_MAP")});
});
