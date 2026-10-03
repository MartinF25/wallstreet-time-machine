import { ASSETS } from "../episodes/prologue";
import type { GameState, MarketDataPoint } from "../types";

const BASE_PRICES: Record<string, number> = { industrials: 112, banking: 86, railroads: 96, gold: 20.67, bonds: 101 };
const DRIFT: Record<string, number> = { industrials: 0.0016, banking: 0.0012, railroads: 0.0008, gold: 0.00025, bonds: 0.00035 };

export function addWeeks(date: string, weeks = 1): string {
  const value = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(value.getTime())) throw new Error("Invalid game date");
  value.setUTCDate(value.getUTCDate() + weeks * 7);
  return value.toISOString().slice(0, 10);
}

function hash(seed: number, round: number, assetIndex: number) {
  const value = Math.sin(seed * 12.9898 + round * 78.233 + assetIndex * 37.719) * 43758.5453;
  return value - Math.floor(value);
}

export function priceFor(assetId: string, round: number, seed: number): number {
  const index = ASSETS.findIndex((asset) => asset.id === assetId);
  if (index < 0) throw new Error("Unknown asset");
  let price = BASE_PRICES[assetId];
  for (let i = 1; i <= round; i += 1) {
    const shock = (hash(seed, i, index) - 0.5) * (assetId === "banking" ? 0.065 : 0.045);
    const cycle = Math.sin((i + index * 2) / 7) * 0.006;
    price *= 1 + DRIFT[assetId] + shock + cycle;
  }
  return Number(Math.max(1, price).toFixed(2));
}

export function getMarketPrices(round: number, seed: number): Record<string, number> {
  return Object.fromEntries(ASSETS.map((asset) => [asset.id, priceFor(asset.id, round, seed)]));
}

export function getMarketPrice(state: GameState, assetId: string): number {
  const price = state.marketState.prices[assetId];
  if (!Number.isFinite(price) || price <= 0) throw new Error("Market price unavailable");
  return price;
}

export function getVisibleMarketData(state: GameState): MarketDataPoint[] {
  const points: MarketDataPoint[] = [];
  for (let round = 0; round <= state.roundNumber; round += 1) {
    const date = addWeeks("1928-01-01", round);
    if (date > state.currentDate) continue;
    for (const asset of ASSETS) points.push({ assetId: asset.id, date, price: priceFor(asset.id, round, state.seed), dataType: "SIMULATED" });
  }
  return points;
}

export function getAssetMarketHistory(state: GameState, assetId: string) {
  return getVisibleMarketData(state).filter((point) => point.assetId === assetId);
}
