import { PROLOGUE } from "../episodes/prologue";
import { addWeeks, getMarketPrices } from "../market/service";
import { calculateMaxDrawdown, calculatePortfolioValue, calculateTotalReturn, calculateUnrealizedPnL, valuePosition } from "../portfolio/calculations";
import type { GameState, RoundSummary } from "../types";

export function createNewGame(seed = 1928): GameState {
  const now = new Date().toISOString(); const prices = getMarketPrices(0, seed);
  return { schemaVersion: 1, gameId: `game-${Date.now()}`, seed, episodeId: PROLOGUE.id, status: "NOT_STARTED", currentDate: PROLOGUE.startDate, roundNumber: 0, baseCurrency: PROLOGUE.baseCurrency, cash: PROLOGUE.startingCapital, positions: [], portfolioValue: PROLOGUE.startingCapital, startingCapital: PROLOGUE.startingCapital, realizedPnL: 0, unrealizedPnL: 0, totalReturn: 0, maxDrawdown: 0, tradeHistory: [], portfolioHistory: [{ date: PROLOGUE.startDate, roundNumber: 0, portfolioValue: PROLOGUE.startingCapital, cash: PROLOGUE.startingCapital }], marketState: { prices, previousPrices: prices }, createdAt: now, updatedAt: now };
}
export function startGame(state: GameState) { return { ...state, status: "RUNNING" as const, updatedAt: new Date().toISOString() }; }
export function recalculateGameState(state: GameState): GameState {
  const positions = state.positions.map((position) => valuePosition(position, state.marketState.prices[position.assetId]));
  const portfolioValue = calculatePortfolioValue(state.cash, positions);
  return { ...state, positions, portfolioValue, unrealizedPnL: calculateUnrealizedPnL(positions), totalReturn: calculateTotalReturn(portfolioValue, state.startingCapital), maxDrawdown: calculateMaxDrawdown(state.portfolioHistory, portfolioValue), updatedAt: new Date().toISOString() };
}
export function advanceRound(state: GameState): { state: GameState; summary: RoundSummary } {
  if (state.status !== "RUNNING") throw new Error("Game is not running");
  const previousValue = state.portfolioValue; const roundNumber = state.roundNumber + 1;
  const currentDate = addWeeks(state.currentDate); const prices = getMarketPrices(roundNumber, state.seed);
  let next = recalculateGameState({ ...state, roundNumber, currentDate, marketState: { previousPrices: state.marketState.prices, prices } });
  const completed = currentDate >= PROLOGUE.endDate;
  next = { ...next, status: completed ? "COMPLETED" : "RUNNING", portfolioHistory: [...next.portfolioHistory, { date: currentDate, roundNumber, portfolioValue: next.portfolioValue, cash: next.cash }] };
  const changes = Object.entries(prices).map(([assetId, price]) => ({ assetId, change: ((price / state.marketState.prices[assetId]) - 1) * 100 })).sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  return { state: next, summary: { roundNumber, portfolioValue: next.portfolioValue, weeklyChange: previousValue ? ((next.portfolioValue / previousValue) - 1) * 100 : 0, cash: next.cash, biggestMover: changes[0] } };
}
export function completeGame(state: GameState) { return { ...state, status: "COMPLETED" as const }; }
export function resetGame(seed = 1928) { return createNewGame(seed); }
