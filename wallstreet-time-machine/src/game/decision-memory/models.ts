import type { DataType, ISODate, PositionDirection, TradeSide } from "../types";

export type DecisionType = TradeSide | "HOLD" | "STRATEGY_CHANGE" | "RESEARCH_ACTION" | "RISK_ACTION" | "WATCHLIST_ACTION";
export type DecisionStatus = "EXECUTED" | "HELD" | "CANCELLED" | "INVALIDATED";
export type DecisionReason = "CREDIT_STRESS" | "MOMENTUM" | "VALUATION" | "RISK_REDUCTION" | "LIQUIDITY" | "MACRO" | "NEWS" | "STRATEGY" | "CRISIS" | "CUSTOM" | "MIGRATED_TRADE" | "UNKNOWN";
export type OutcomeStatus = "OPEN" | "POSITIVE" | "NEGATIVE" | "MIXED" | "NEUTRAL" | "CLOSED";

export interface CompactPortfolioSnapshot { id:string; portfolioValue:number; cash:number; longExposure:number; shortExposure:number; grossExposure:number; netExposure:number; marginUtilization:number }
export interface KnownMarketContext { id:string; marketHeat:string; knownRegime:string; knownSentiment:string; knownRiskState:string; knownNewsIds:string[]; knownIndicatorIds:string[]; knownTopSignals:string[] }
export interface DecisionRecord { id:string; actorType:"PLAYER"|"NPC"|"SYSTEM"; careerId?:string; episodeId:string; roundNumber:number; gameDate:ISODate; type:DecisionType; status:DecisionStatus; assetId?:string; quantity?:number; amount?:number; price?:number; positionDirection?:PositionDirection; reason?:DecisionReason; reasonText?:string; reasonTags?:string[]; strategyContext?:string; marketContextSnapshotId?:string; portfolioSnapshotBeforeId?:string; portfolioSnapshotAfterId?:string; marketContext:KnownMarketContext; portfolioBefore:CompactPortfolioSnapshot; portfolioAfter?:CompactPortfolioSnapshot; tradeId?:string; createdAt:string }
export interface AssetPricePoint { assetId:string; episodeId:string; roundNumber:number; date:ISODate; open?:number; high?:number; low?:number; close:number; volume?:number; dataType:DataType; sourceId?:string }
export interface DecisionOutcome { id:string; decisionId:string; evaluationRound:number; evaluationDate:ISODate; roundsElapsed:number; assetPriceAtDecision?:number; assetPriceNow?:number; grossPnL?:number; positionPnL?:number; netPnL?:number; fees?:number; borrowFees?:number; portfolioImpact?:number; status:OutcomeStatus; frozen:boolean }
export interface RoundSummaryRecord { roundNumber:number; date:ISODate; portfolioStart:number; portfolioEnd:number; pnl:number; return:number; bestContributor?:{assetId:string;pnl:number}; worstContributor?:{assetId:string;pnl:number}; longPnL:number; shortPnL:number; fees:number; borrowFees:number; cashChange:number; decisionIds:string[] }
export type ChartRange = "1W" | "1M" | "3M" | "1Y" | "ERA";
