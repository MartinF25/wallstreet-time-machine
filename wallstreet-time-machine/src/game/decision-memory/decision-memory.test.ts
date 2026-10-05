import { describe, expect, it } from "vitest";
import { createAgentContext } from "../agents/runtime";
import { migrateToV3, createAppSave } from "../campaign/persistence";
import { advanceRound, createNewGame, recalculateGameState, startGame } from "../engine/game-engine";
import { executeTrade } from "../trading/service";
import type { GameState } from "../types";
import { evaluateDecision, getAssetHistory, historyForRange, marketMemory, recordHold } from "./service";

const game=()=>startGame(createNewGame(1928,"great-crash"));

describe("decision memory",()=>{
  it("creates and links BUY, SELL, SHORT, and COVER decisions",()=>{
    let state=executeTrade(game(),"BUY","gold",2,"VALUATION");
    state=executeTrade(state,"SELL","gold",1,"RISK_REDUCTION");
    state=executeTrade(state,"SHORT","banking",2,"CREDIT_STRESS");
    state=executeTrade(state,"COVER","banking",1,"RISK_REDUCTION");
    expect(state.decisionHistory.map(x=>x.type)).toEqual(["BUY","SELL","SHORT","COVER"]);
    expect(state.tradeHistory.every(x=>x.decisionId&&state.decisionHistory.some(d=>d.id===x.decisionId))).toBe(true);
    expect(new Set(state.tradeHistory.map(x=>x.decisionId)).size).toBe(4);
  });

  it("persists HOLD without creating a trade and migrates old saves safely",()=>{
    const held=recordHold(game());
    expect(held.decisionHistory[0].status).toBe("HELD");
    expect(held.tradeHistory).toHaveLength(0);
    const save=createAppSave(),raw={...save,activeEpisode:held,episodeSaves:{[held.episodeId]:held}};
    const loaded=migrateToV3(JSON.parse(JSON.stringify(raw)));
    expect(loaded.activeEpisode?.decisionHistory[0].type).toBe("HOLD");
    const old={...held} as Partial<typeof held>;delete old.decisionHistory;delete old.decisionOutcomes;delete old.assetPriceHistory;delete old.roundHistory;
    const migrated=migrateToV3({...save,activeEpisode:old,episodeSaves:{}});
    expect(migrated.activeEpisode?.portfolioValue).toBe(held.portfolioValue);
    expect(migrated.activeEpisode?.decisionHistory).toEqual([]);
    expect(migrated.activeEpisode?.assetPriceHistory.length).toBeGreaterThan(0);
  });

  it("stores one known price per asset and round without future leakage",()=>{
    let state:GameState=game();for(let i=0;i<10;i++)state=advanceRound(state).state;
    const history=getAssetHistory(state,"banking");
    expect(history).toHaveLength(11);
    expect(new Set(history.map(x=>x.roundNumber)).size).toBe(11);
    const leaked={...state,assetPriceHistory:[...state.assetPriceHistory,{...history.at(-1)!,roundNumber:99,date:"2099-01-01",close:999}]};
    expect(getAssetHistory(leaked,"banking").some(x=>x.date>state.currentDate)).toBe(false);
    expect(historyForRange(state,"banking","1M").every(x=>x.date<=state.currentDate)).toBe(true);
    expect(history.every(x=>x.dataType==="SIMULATED")).toBe(true);
  });

  it("calculates long and short outcomes with costs",()=>{
    const bought=executeTrade(game(),"BUY","gold",2,"VALUATION"),buy=bought.decisionHistory[0],gold=bought.marketState.prices.gold;
    const up=recalculateGameState({...bought,marketState:{...bought.marketState,prices:{...bought.marketState.prices,gold:gold+10}}});
    expect(evaluateDecision(up,buy).netPnL).toBeGreaterThan(0);
    const shorted=executeTrade(game(),"SHORT","banking",2,"CREDIT_STRESS"),short=shorted.decisionHistory[0],bank=shorted.marketState.prices.banking;
    const down=recalculateGameState({...shorted,marketState:{...shorted.marketState,prices:{...shorted.marketState.prices,banking:bank-10}}});
    expect(evaluateDecision(down,short).netPnL).toBeGreaterThan(0);
  });

  it("preserves multi-horizon snapshots and freezes a closed cover",()=>{
    let state:GameState=executeTrade(game(),"SHORT","banking",2,"CREDIT_STRESS");
    const entry=state.decisionHistory[0];
    for(let i=0;i<10;i++)state=advanceRound(state).state;
    expect(state.decisionOutcomes.filter(x=>x.decisionId===entry.id).map(x=>x.roundsElapsed)).toEqual([1,3,5,10]);
    state=executeTrade(state,"COVER","banking",2,"RISK_REDUCTION");
    const cover=state.decisionHistory.at(-1)!;
    const frozen=state.decisionOutcomes.find(x=>x.decisionId===cover.id);
    expect(frozen?.status).toBe("CLOSED");
    expect(frozen?.frozen).toBe(true);
    const frozenNet=frozen?.netPnL;
    state=advanceRound(state).state;
    expect(state.decisionOutcomes.find(x=>x.id===frozen?.id)?.netPnL).toBe(frozenNet);
  });

  it("calculates era memory and exposes only known history to agents",()=>{
    const state=game(),banking=state.assetPriceHistory.find(x=>x.assetId==="banking")!;
    const custom={...state,currentDate:"1928-03-01",assetPriceHistory:[banking,{...banking,roundNumber:1,date:"1928-02-01",close:120},{...banking,roundNumber:2,date:"1928-03-01",close:90}]};
    const memory=marketMemory(custom,"banking");
    expect(memory.eraHigh).toBe(120);expect(memory.eraLow).toBe(86);expect(memory.drawdownFromEraHigh).toBe(-25);
    const context=createAgentContext(custom);
    expect(context.knownPriceHistory.every(x=>x.date<=custom.currentDate)).toBe(true);
  });
});
