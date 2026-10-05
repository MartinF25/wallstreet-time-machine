import { describe, expect, it } from "vitest";
import { createNewGame, startGame } from "../engine/game-engine";
import { executeTrade } from "../trading/service";
import { roundInvestmentSummary } from "./service";

describe("round investment summary", () => {
  it("groups long and short decisions without mutating game state", () => {
    const game = startGame(createNewGame(1928, "great-crash"));
    const bought = executeTrade(game, "BUY", "banking", 2);
    const shorted = executeTrade(bought, "SHORT", "industrials", 1);
    const summary = roundInvestmentSummary(shorted);
    expect(summary.buyValue).toBeGreaterThan(0);
    expect(summary.shortValue).toBeGreaterThan(0);
    expect(summary.trades).toHaveLength(2);
    expect(game.tradeHistory).toHaveLength(0);
  });

  it("records hold as an explicit round decision without creating a trade", () => {
    const game = startGame(createNewGame(1928, "great-crash"));
    const summary = roundInvestmentSummary(game, true);
    expect(summary.holdSelected).toBe(true);
    expect(summary.trades).toHaveLength(0);
  });
});
