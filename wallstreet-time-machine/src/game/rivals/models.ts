import type{Character}from"../character-foundation/models";
export type RivalStrategyId="MOMENTUM"|"VALUE"|"CRISIS"|"NETWORK"|"BANKING"|"CORPORATE_CONTROL";
export type RivalAction="BUY"|"SELL"|"SHORT"|"COVER"|"HOLD"|"INVESTIGATE";export type RivalStatus="ACTIVE"|"WATCHING"|"AGGRESSIVE"|"DEFENSIVE"|"DISTRESSED"|"EXITED";
export type RivalReasonCode="MOMENTUM"|"VALUATION"|"CRISIS"|"PRIVATE_INFORMATION"|"RISK_LIMIT"|"HIDDEN_OBJECTIVE"|"LOW_CONFIDENCE"|"POSITION_EXIT";
export interface RivalStrategyDefinition{id:RivalStrategyId;name:string;preferredAssets:string[];riskBias:number;patience:number;shortBias:number;informationDependence:number;sentimentBias:number}
export interface RivalPosition{assetId:string;side:"LONG"|"SHORT";quantity:number;exposure:number;entryPrice:number;unrealizedPnL:number}
export interface RivalObjective{id:string;description:string;type:"BUILD_SHORT"|"PRESERVE_CAPITAL"|"BANKING_EXPOSURE"|"CRISIS_PROFIT"|"ACCUMULATE_INDUSTRY"|"REPUTATION";weight:number}
export interface RivalKnowledgeState{knownInformationIds:string[];investigatedInformationIds:string[];confidenceByInformationId:Record<string,number>}
export interface RivalInvestor{id:string;historical:boolean;availableFromYear:number;availableUntilYear?:number;character:Character;strategy:RivalStrategyId;capital:number;cash:number;positions:RivalPosition[];riskTolerance:number;confidence:number;objectives:RivalObjective[];knowledge:RivalKnowledgeState;status:RivalStatus}
export interface RivalDecision{action:RivalAction;assetId?:string;confidence:number;reasonCodes:RivalReasonCode[];desiredExposure?:number;informationId?:string}
export interface RivalTradeIntent{rivalId:string;assetId:string;side:"BUY"|"SELL"|"SHORT"|"COVER";sizeClass:"SMALL"|"MEDIUM"|"LARGE";confidence:number}
export type RivalVisibility="HIDDEN"|"DETECTED"|"PUBLIC";export type RivalActivityType="INFORMATION_DISCOVERED"|"INVESTIGATION"|"TRADE_INTENT"|"POSITION_CHANGE"|"STATUS_CHANGE";
export interface RivalActivity{id:string;round:number;gameDate:string;rivalId:string;type:RivalActivityType;assetId?:string;action?:RivalAction;sizeClass?:RivalTradeIntent["sizeClass"];publicVisibility:RivalVisibility;summary:string}
export interface RivalState{rivals:RivalInvestor[];activities:RivalActivity[];lastProcessedRound:number;lastEpisodeId?:string}
export interface RivalMarketContext{episodeId:string;gameDate:string;round:number;seed:number;prices:Record<string,number>;previousPrices:Record<string,number>;sentiment:string;volatility:number}
export interface VisibleRivalIntelligence{rivalId:string;activityId:string;headline:string;likelyAsset?:string;estimatedSize?:RivalTradeIntent["sizeClass"];confidence:number;details:string[]}
