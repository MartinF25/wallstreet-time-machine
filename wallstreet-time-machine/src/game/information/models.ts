import type{Character}from"../character-foundation/models";
export type InformationType="CONFIRMED_NEWS"|"RUMOR"|"ANALYST_OPINION"|"PRIVATE_TIP"|"MARKET_SIGNAL"|"CORPORATE"|"MACRO"|"POLITICAL";
export type InformationSourceCategory="NEWSPAPER"|"BANKER"|"BROKER"|"JOURNALIST"|"ANALYST"|"INDUSTRIALIST"|"GOVERNMENT"|"MARKET_TAPE"|"EXCHANGE"|"PRIVATE_CONTACT"|"UNKNOWN"|"NEWSWIRE"|"ELECTRONIC_TERMINAL"|"DIGITAL_NEWS";
export type InformationImportance="LOW"|"MEDIUM"|"HIGH"|"CRITICAL";export type InformationImpact="LOW"|"MEDIUM"|"HIGH"|"EXTREME";
export type RumorTruthState="TRUE"|"FALSE"|"PARTIALLY_TRUE";export type InformationStatus="UNSEEN"|"AVAILABLE"|"ACQUIRED"|"INVESTIGATING"|"CONFIRMED"|"DISPROVED"|"IGNORED"|"EXPIRED";
export type InformationFreshness="FRESH"|"RECENT"|"AGING"|"STALE"|"EXPIRED";
export interface InformationSource{id:string;name:string;category:InformationSourceCategory;baseReliability:number;accessLevel:number;minYear:number;maxYear?:number}
export interface InformationItem{id:string;type:InformationType;sourceId:string;title:string;summary:string;details:string[];revealedDetails:string[];episodeId?:string;availableFromDate:string;createdRound:number;expiresRound?:number;affectedAssets:string[];affectedSectors:string[];baseReliability:number;displayedReliability?:number;importance:InformationImportance;marketImpact:InformationImpact;acquisitionCost:number;investigationCost:number;status:InformationStatus;rumorTruthState?:RumorTruthState;investigationCount:number;seed:number}
export interface InformationState{items:InformationItem[];lastProcessedRound:number}
export interface ReliabilityDisplay{value:number;min:number;max:number;label:"LOW"|"MEDIUM"|"HIGH";precision:number}
export interface InvestigationResult{character:Character;information:InformationItem;cash:number;cost:number;quality:number}
