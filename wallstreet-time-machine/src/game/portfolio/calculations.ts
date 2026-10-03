import type { GameState, Position } from "../types";

export function valuePosition(position: Position, price: number): Position {
  const marketValue = position.quantity * price;
  const unrealizedPnL = (price - position.averageBuyPrice) * position.quantity;
  return { ...position, currentPrice: price, marketValue, unrealizedPnL, unrealizedPnLPercent: position.averageBuyPrice ? ((price / position.averageBuyPrice) - 1) * 100 : 0 };
}

export function calculatePortfolioValue(cash: number, positions: Position[]) {
  return cash + positions.reduce((sum, position) => sum + position.marketValue, 0);
}
export function calculateUnrealizedPnL(positions: Position[]) { return positions.reduce((sum, position) => sum + position.unrealizedPnL, 0); }
export function calculateTotalReturn(value: number, startingCapital: number) { return ((value / startingCapital) - 1) * 100; }
export function calculateMaxDrawdown(history: GameState["portfolioHistory"], currentValue: number) {
  const values = [...history.map((item) => item.portfolioValue), currentValue];
  let peak = values[0] ?? currentValue; let max = 0;
  for (const value of values) { peak = Math.max(peak, value); max = Math.max(max, peak ? ((peak - value) / peak) * 100 : 0); }
  return max;
}
