import type { GameState } from "../types";
import { GameStateSchema } from "../validation";

const KEY = "wallstreet-time-machine:save:v1";
export function isGameState(value: unknown): value is GameState {
  return GameStateSchema.safeParse(value).success;
}
export function migrateSavegame(value: unknown): GameState { if (!isGameState(value)) throw new Error("Savegame is invalid or unsupported"); return value; }
export function saveGame(state: GameState) { localStorage.setItem(KEY, JSON.stringify({ schemaVersion: 1, gameState: state })); }
export function loadGame(): GameState | null {
  const raw = localStorage.getItem(KEY); if (!raw) return null;
  try { const parsed = JSON.parse(raw) as { gameState?: unknown }; return migrateSavegame(parsed.gameState); } catch { return null; }
}
export function deleteGame() { localStorage.removeItem(KEY); }
export function hasSavedGame() { return localStorage.getItem(KEY) !== null; }
