import { describe, expect, it } from "vitest";
import { advanceRound, createNewGame, startGame } from "./engine/game-engine";
import { getVisibleMarketData, priceFor } from "./market/service";
import { executeTrade, TRADING_FEE_RATE } from "./trading/service";
import type { GameState } from "./types";

describe("game foundation", () => {
  it("creates a reproducible new game with $100,000", () => {
    const a = createNewGame(42), b = createNewGame(42);
    expect(a.cash).toBe(100_000);
    expect(a.currentDate).toBe("1928-01-01");
    expect(a.marketState.prices).toEqual(b.marketState.prices);
    expect(priceFor("banking", 10, 42)).toBe(priceFor("banking", 10, 42));
  });

  it("buys with fees and calculates a fee-inclusive average price", () => {
    const game = startGame(createNewGame());
    const next = executeTrade(game, "BUY", "industrials", 10);
    const price = game.marketState.prices.industrials;
    expect(next.cash).toBeCloseTo(100_000 - price * 10 * (1 + TRADING_FEE_RATE));
    expect(next.positions[0].averageBuyPrice).toBeCloseTo(price * (1 + TRADING_FEE_RATE));
    expect(next.portfolioValue).toBeLessThan(100_000);
  });

  it("keeps weighted cost basis, realizes P&L, and rejects invalid trades", () => {
    let game: GameState = startGame(createNewGame());
    game = executeTrade(game, "BUY", "banking", 5);
    game = executeTrade(game, "BUY", "banking", 3);
    const basis = game.positions[0].averageBuyPrice;
    game = executeTrade(game, "SELL", "banking", 2);
    expect(game.positions[0].averageBuyPrice).toBeCloseTo(basis);
    expect(game.tradeHistory).toHaveLength(3);
    expect(() => executeTrade(game, "SELL", "banking", 99)).toThrow("Insufficient position");
    expect(() => executeTrade(game, "BUY", "banking", 1_000_000)).toThrow("Insufficient cash");
    expect(() => executeTrade(game, "BUY", "banking", 0)).toThrow("Quantity");
  });

  it("advances exactly one week and revalues the portfolio", () => {
    let game: GameState = startGame(createNewGame(9));
    game = executeTrade(game, "BUY", "gold", 100);
    const result = advanceRound(game);
    expect(result.state.currentDate).toBe("1928-01-08");
    expect(result.state.roundNumber).toBe(1);
    expect(result.state.portfolioHistory).toHaveLength(2);
    expect(result.state.positions[0].currentPrice).toBe(result.state.marketState.prices.gold);
  });

  it("never exposes future prices", () => {
    const game = { ...startGame(createNewGame()), currentDate: "1928-06-01", roundNumber: 21 };
    const visible = getVisibleMarketData(game);
    expect(visible.length).toBeGreaterThan(0);
    expect(visible.every((point) => point.date <= game.currentDate)).toBe(true);
  });

  it("completes at the episode boundary", () => {
    const game = { ...startGame(createNewGame()), currentDate: "1933-12-30", roundNumber: 312 };
    expect(advanceRound(game).state.status).toBe("COMPLETED");
  });
});
