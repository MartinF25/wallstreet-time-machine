import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const AssetSchema = z.object({
  id: z.string().min(1), symbol: z.string().min(1), name: z.string().min(1),
  assetClass: z.enum(["EQUITY", "COMMODITY", "BOND", "FOREX", "CASH"]),
  sector: z.string(), quoteCurrency: z.string().length(3), priceUnit: z.string(),
  description: z.string(), availableFrom: isoDate, availableUntil: isoDate.optional(),
});
export const EpisodeSchema = z.object({
  id: z.string().min(1), name: z.string().min(1), subtitle: z.string(), startDate: isoDate,
  endDate: isoDate, startingCapital: z.number().positive(), baseCurrency: z.string().length(3),
  roundGranularity: z.literal("WEEK"), description: z.string(),
  availableAssets: z.array(z.string()).min(1), dataType: z.enum(["SIMULATED", "HISTORICAL"]),
});
export const TradeInputSchema = z.object({
  side: z.enum(["BUY", "SELL"]), assetId: z.string().min(1), quantity: z.number().positive().finite(),
});
const PositionSchema = z.object({
  assetId: z.string(), quantity: z.number(), averageBuyPrice: z.number(), currentPrice: z.number(),
  marketValue: z.number(), unrealizedPnL: z.number(), unrealizedPnLPercent: z.number(),
});
export const GameStateSchema = z.looseObject({
  schemaVersion: z.literal(1), gameId: z.string(), seed: z.number(), episodeId: z.string(),
  status: z.enum(["NOT_STARTED", "RUNNING", "COMPLETED"]), currentDate: isoDate,
  roundNumber: z.number().int().nonnegative(), baseCurrency: z.string(), cash: z.number(),
  positions: z.array(PositionSchema), portfolioValue: z.number(), startingCapital: z.number(),
  realizedPnL: z.number(), unrealizedPnL: z.number(), totalReturn: z.number(), maxDrawdown: z.number(),
  tradeHistory: z.array(z.looseObject({ id: z.string() })),
  portfolioHistory: z.array(z.looseObject({ date: isoDate, portfolioValue: z.number() })),
  marketState: z.object({ prices: z.record(z.string(), z.number()), previousPrices: z.record(z.string(), z.number()) }),
  createdAt: z.string(), updatedAt: z.string(),
});
