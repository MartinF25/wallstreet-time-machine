import type{CharacterSkillId}from"../character-foundation/models";
export type FinancialCenterId="NEW_YORK"|"LONDON"|"FRANKFURT"|"ZURICH"|"PARIS"|"CHICAGO"|"TOKYO"|"HONG_KONG";export type BranchStatus="ACTIVE";export type BranchUpgradeId="RESEARCH_DESK"|"TRADING_DESK"|"CLIENT_OFFICE"|"PRIVATE_BANKING"|"COMMODITY_DESK";export type BranchModifierCategory="informationAccess"|"sourceAccess"|"rumorFreshness"|"regionalInsight"|"reputationGain"|"researchQuality";
export type BranchRequirement={type:"office_level"|"reputation"|"credits"|"cash"|"character_level"|"year";value:number}|{type:"skill";skillId:CharacterSkillId}|{type:"existing_branch";centerId:FinancialCenterId};
export interface BranchModifier{category:BranchModifierCategory;value:number;scope:string;description:string}
export interface FinancialCenterDefinition{id:FinancialCenterId;name:string;country:string;availableFromYear:number;availableToYear?:number;specialties:string[];description:string;requirements:BranchRequirement[];cashCost:number;creditCost:number;modifiers:BranchModifier[]}
export interface Branch{id:string;centerId:FinancialCenterId;status:BranchStatus;level:number;openedRound:number;openedYear:number;upgrades:BranchUpgradeId[]}
export interface ExpansionState{headquarters:FinancialCenterId;branches:Branch[]}
export interface ExpansionContext{year:number;round:number;officeLevel:number;cash:number;character:{level:number;credits:number;stats:{reputation:number};unlockedSkills:CharacterSkillId[]}}
