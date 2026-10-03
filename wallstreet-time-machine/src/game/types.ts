export type ISODate = string;
export type GameStatus = "NOT_STARTED" | "RUNNING" | "COMPLETED";
export type AssetClass = "EQUITY" | "COMMODITY" | "BOND" | "FOREX" | "CASH";
export type DataType = "SIMULATED" | "HISTORICAL";
export type TradeSide = "BUY" | "SELL";

export interface Asset {
  id: string; symbol: string; name: string; assetClass: AssetClass; sector: string;
  quoteCurrency: string; priceUnit: string; description: string;
  availableFrom: ISODate; availableUntil?: ISODate;
}

export interface MarketDataPoint { assetId: string; date: ISODate; price: number; dataType: DataType }
export interface Episode {
  id: string; name: string; subtitle: string; startDate: ISODate; endDate: ISODate;
  startingCapital: number; baseCurrency: string; roundGranularity: "WEEK";
  description: string; availableAssets: string[]; dataType: DataType;
}
export interface Position {
  assetId: string; quantity: number; averageBuyPrice: number; currentPrice: number;
  marketValue: number; unrealizedPnL: number; unrealizedPnLPercent: number;
}
export interface Trade {
  id: string; date: ISODate; roundNumber: number; assetId: string; side: TradeSide;
  quantity: number; price: number; grossValue: number; fee: number; netValue: number;
}
export interface PortfolioSnapshot {
  date: ISODate; roundNumber: number; portfolioValue: number; cash: number;
}
export interface MarketState { prices: Record<string, number>; previousPrices: Record<string, number> }
export interface GameState {
  schemaVersion: 1; gameId: string; seed: number; episodeId: string; status: GameStatus;
  currentDate: ISODate; roundNumber: number; baseCurrency: string; cash: number;
  positions: Position[]; portfolioValue: number; startingCapital: number;
  realizedPnL: number; unrealizedPnL: number; totalReturn: number; maxDrawdown: number;
  tradeHistory: Trade[]; portfolioHistory: PortfolioSnapshot[]; marketState: MarketState;
  createdAt: string; updatedAt: string;
}
export interface GameSettings { tradingFeeRate: number }
export interface RoundSummary {
  roundNumber: number; portfolioValue: number; weeklyChange: number; cash: number;
  biggestMover?: { assetId: string; change: number };
}
