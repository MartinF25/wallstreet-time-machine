import type{CharacterSkillId}from"../character-foundation/models";import type{BranchModifier,FinancialCenterId}from"../expansion/models";
export type HouseLevel=1|2|3|4|5;export type DivisionLevel=1|2|3;export type DivisionId="TRADING"|"RESEARCH"|"BONDS"|"FOREIGN_EXCHANGE"|"COMMODITIES"|"CORPORATE_FINANCE"|"INVESTMENT_BANKING"|"WEALTH_MANAGEMENT"|"PRIVATE_BANKING";
export type DivisionRequirement={type:"house_level"|"office_level"|"character_level"|"reputation"|"credits"|"cash"|"year";value:number}|{type:"skill";skillId:CharacterSkillId}|{type:"branch_any";centerIds:FinancialCenterId[]}|{type:"division";divisionId:DivisionId};
export interface DivisionSynergy{centerId:FinancialCenterId;modifier:BranchModifier}
export interface DivisionDefinition{id:DivisionId;availableFromYear:number;requirements:DivisionRequirement[];cashCost:number;creditCost:number;specialties:string[];modifiers:BranchModifier[];synergies:DivisionSynergy[]}
export interface FinancialHouseDivision{id:DivisionId;level:DivisionLevel;status:"ACTIVE"|"INACTIVE";openedYear:number;openedRound:number}
export interface BranchDivisionAssignment{centerId:FinancialCenterId;divisionId:DivisionId}
export interface FinancialHouse{id:string;name:string;headquartersCenterId:FinancialCenterId;foundedYear:number;level:HouseLevel;prestige:number;divisions:FinancialHouseDivision[];branchAssignments:BranchDivisionAssignment[]}
export interface HouseContext{year:number;round:number;officeLevel:number;cash:number;character:{level:number;credits:number;stats:{reputation:number};unlockedSkills:CharacterSkillId[]};activeBranches:FinancialCenterId[]}
