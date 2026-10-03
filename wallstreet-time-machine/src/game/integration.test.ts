import { describe, expect, it } from "vitest";
import { advanceRound, createNewGame, startGame } from "./engine/game-engine";
import { executeTrade } from "./trading/service";
import type { GameState } from "./types";

describe("playable loop", () => {
  it("supports new game, buy, round, sell, and a lossless JSON roundtrip", () => {
    let game: GameState = startGame(createNewGame(1928));
    game = executeTrade(game, "BUY", "railroads", 100);
    game = advanceRound(game).state;
    game = executeTrade(game, "SELL", "railroads", 25);
    const loaded = JSON.parse(JSON.stringify(game));
    expect(loaded).toEqual(game);
    expect(loaded.positions[0].quantity).toBe(75);
    expect(loaded.portfolioHistory).toHaveLength(2);
  });
});
