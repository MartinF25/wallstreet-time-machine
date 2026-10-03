import type { Asset, Episode } from "../types";
import { AssetSchema, EpisodeSchema } from "../validation";

export const ASSETS: Asset[] = AssetSchema.array().parse([
  { id: "industrials", symbol: "IND", name: "US Industrials", assetClass: "EQUITY", sector: "Industrials", quoteCurrency: "USD", priceUnit: "index points", description: "A simulated basket of large American industrial companies.", availableFrom: "1928-01-01" },
  { id: "banking", symbol: "BNK", name: "Banking", assetClass: "EQUITY", sector: "Financials", quoteCurrency: "USD", priceUnit: "index points", description: "A simulated basket of major banks and trusts.", availableFrom: "1928-01-01" },
  { id: "railroads", symbol: "RAIL", name: "Railroads", assetClass: "EQUITY", sector: "Transportation", quoteCurrency: "USD", priceUnit: "index points", description: "A simulated railroad equity index.", availableFrom: "1928-01-01" },
  { id: "gold", symbol: "GOLD", name: "Gold", assetClass: "COMMODITY", sector: "Precious Metals", quoteCurrency: "USD", priceUnit: "simulated unit", description: "A simulated gold exposure for the prologue.", availableFrom: "1928-01-01" },
  { id: "bonds", symbol: "UST", name: "US Government Bonds", assetClass: "BOND", sector: "Government", quoteCurrency: "USD", priceUnit: "index points", description: "A simulated US government bond index.", availableFrom: "1928-01-01" },
]);

export const PROLOGUE: Episode = EpisodeSchema.parse({
  id: "great-crash-prologue", name: "The Great Crash", subtitle: "Prologue · 1928–1929",
  startDate: "1928-01-01", endDate: "1929-12-31", startingCapital: 100_000,
  baseCurrency: "USD", roundGranularity: "WEEK",
  description: "A compact, simulated market sandbox. You know the era—not the next move.",
  availableAssets: ASSETS.map((asset) => asset.id), dataType: "SIMULATED",
});
