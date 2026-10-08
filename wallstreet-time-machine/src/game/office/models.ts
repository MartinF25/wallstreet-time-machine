export type OfficeLevel = 1 | 2 | 3 | 4 | 5;
export type OfficeZoneId = "DESK" | "MARKET_BOARD" | "NEWSPAPER" | "TELEPHONE" | "RESEARCH" | "WORLD_MAP" | "CONFERENCE_TABLE" | "CHARACTER";
export type OfficeUpgradeId = "BETTER_TICKER" | "PRIVATE_LINE" | "RESEARCH_LIBRARY" | "LARGER_DESK";
export type OfficeTarget = "MARKET" | "CAMPAIGN" | "INFORMATION" | "RIVALS" | "PROFILE";
export interface OfficeState { level:OfficeLevel; unlockedZones:OfficeZoneId[]; upgrades:OfficeUpgradeId[] }
export interface OfficeLevelDefinition { level:OfficeLevel; name:string; description:string; requiredCareerLevel:number }
export interface OfficeZoneDefinition { id:OfficeZoneId; label:string; objectLabel:string; description:string; target?:OfficeTarget; unlockLevel:OfficeLevel }
export interface OfficeEraPresentation { id:"LEDGER"|"DECO"|"MID_CENTURY"|"TERMINAL"|"DIGITAL"; theme:string; marketDevice:string; communicationDevice:string; newsMedium:string; researchMedium:string; atmosphere:string }
