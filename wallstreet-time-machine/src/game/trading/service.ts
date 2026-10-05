import { ASSETS } from "../episodes/prologue";
import { getMarketPrice } from "../market/service";
import { recalculateGameState } from "../engine/game-engine";
import type { GameState, Trade, TradeSide } from "../types";
import { TradeInputSchema } from "../validation";
import { getEpisode } from "../campaign/episodes";
import { coverShort, openShort } from "../advanced-trading/service";

export const TRADING_FEE_RATE = 0.0025;
export const calculateTradingFee = (gross: number) => gross * TRADING_FEE_RATE;

export function executeTrade(state: GameState, side: TradeSide, assetId: string, quantity: number, reason?: string, note?: string): GameState {
  const parsed = TradeInputSchema.safeParse({ side, assetId, quantity });
  if (!parsed.success) throw new Error("Quantity must be greater than zero");
  if (!ASSETS.some((asset) => asset.id === assetId)) throw new Error("Unknown asset");
  if (!getEpisode(state.episodeId).availableAssets.includes(assetId)) throw new Error("Asset is not available in this episode");
  const asset=ASSETS.find(item=>item.id===assetId)!; const rule=getEpisode(state.episodeId).specialRules?.find(item=>item.startDate<=state.currentDate&&item.endDate>=state.currentDate&&(!item.blockedAssetClasses||item.blockedAssetClasses.includes(asset.assetClass)));
  if(rule)throw new Error(`${rule.type.replaceAll("_"," ")}: ${rule.reason}`);
  if (!Number.isFinite(quantity) || quantity <= 0) throw new Error("Quantity must be greater than zero");
  if(side==="SHORT")return recalculateGameState(openShort(state,assetId,quantity));
  if(side==="COVER")return recalculateGameState(coverShort(state,assetId,quantity));
  const price = getMarketPrice(state, assetId); const grossValue = price * quantity; const fee = calculateTradingFee(grossValue);
  const positions = state.positions.map((position) => ({ ...position }));
  const index = positions.findIndex((position) => position.assetId === assetId);
  let cash = state.cash; let realizedPnL = state.realizedPnL;
  if (side === "BUY") {
    const netValue = grossValue + fee;
    if (netValue > cash + 1e-8) throw new Error("Insufficient cash");
    cash -= netValue;
    if (index >= 0) {
      const old = positions[index]; const totalQuantity = old.quantity + quantity;
      positions[index] = { ...old, quantity: totalQuantity, averageBuyPrice: ((old.quantity * old.averageBuyPrice) + grossValue + fee) / totalQuantity };
    } else positions.push({ assetId, quantity, averageBuyPrice: (grossValue + fee) / quantity, currentPrice: price, marketValue: grossValue, unrealizedPnL: -fee, unrealizedPnLPercent: -TRADING_FEE_RATE * 100 });
  } else {
    if (index < 0 || positions[index].quantity + 1e-8 < quantity) throw new Error("Insufficient position");
    const old = positions[index]; cash += grossValue - fee; realizedPnL += (price - old.averageBuyPrice) * quantity - fee;
    old.quantity -= quantity; if (old.quantity < 1e-8) positions.splice(index, 1);
  }
  const trade: Trade = { id: `${state.gameId}-${state.tradeHistory.length + 1}`, date: state.currentDate, roundNumber: state.roundNumber, assetId, side, quantity, price, grossValue, fee, netValue: side === "BUY" ? grossValue + fee : grossValue - fee, reason, note };
  return recalculateGameState({ ...state, cash, positions, realizedPnL, feesPaid: state.feesPaid + fee, tradeHistory: [...state.tradeHistory, trade] });
}
