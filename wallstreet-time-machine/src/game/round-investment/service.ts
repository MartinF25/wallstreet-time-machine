import type { GameState, Trade } from "../types";

export interface RoundInvestmentSummary {
  roundNumber: number;
  startCapital: number;
  startCash: number;
  buyValue: number;
  sellValue: number;
  shortValue: number;
  coverValue: number;
  feesPaid: number;
  borrowFees: number;
  endCash: number;
  roundPnL: number;
  roundReturn: number;
  trades: Trade[];
  holdSelected: boolean;
}

export function roundInvestmentSummary(state: GameState, holdSelected = false): RoundInvestmentSummary {
  const trades = state.tradeHistory.filter((trade) => trade.roundNumber === state.roundNumber);
  const latest = state.portfolioHistory.at(-1);
  const startCapital = latest?.roundNumber === state.roundNumber
    ? latest.portfolioValue
    : state.portfolioValue;
  const startCash = latest?.roundNumber === state.roundNumber ? latest.cash : state.cash;
  const total = (side: Trade["side"]) => trades.filter((trade) => trade.side === side).reduce((sum, trade) => sum + trade.grossValue, 0);
  const feesPaid = trades.reduce((sum, trade) => sum + trade.fee, 0);
  const borrowFees = trades.reduce((sum, trade) => sum + (trade.borrowFee ?? 0), 0);
  const roundPnL = state.portfolioValue - startCapital;
  return {
    roundNumber: state.roundNumber,
    startCapital,
    startCash,
    buyValue: total("BUY"),
    sellValue: total("SELL"),
    shortValue: total("SHORT"),
    coverValue: total("COVER"),
    feesPaid,
    borrowFees,
    endCash: state.cash,
    roundPnL,
    roundReturn: startCapital ? (roundPnL / startCapital) * 100 : 0,
    trades,
    holdSelected,
  };
}
