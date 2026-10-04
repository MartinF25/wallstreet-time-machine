import{describe,expect,it}from"vitest";
import{createNewGame,startGame}from"../engine/game-engine";
import{createAppSave,migrateToV3,storeEpisode}from"../campaign/persistence";
import{AGENTS,buildConsensus,createAgentContext,decaySignal,riskScenario,runAgentRuntime,strategyDrift}from"./runtime";

const game=()=>startGame(createNewGame());

describe("Sprint 4 analyst agents",()=>{
  it("registers six deterministic rule-based desks",()=>{const state=game(),a=runAgentRuntime(state),b=runAgentRuntime(state);expect(AGENTS.map(x=>x.id)).toEqual(["MARKET","MACRO","RISK","NEWS","COMMODITY","STRATEGY"]);expect(a.analyses).toEqual(b.analyses)});
  it("uses only information released by the current game date",()=>{const state={...game(),currentDate:"1929-09-01"},context=createAgentContext(state);expect(context.knownNews.every(x=>x.availableFrom<=state.currentDate)).toBe(true);expect(context.knownEvents.some(x=>x.id==="black-thursday")).toBe(false)});
  it("creates traceable signals and desk evidence",()=>{const run=runAgentRuntime(game());expect(run.analyses.every(x=>x.signals.length>0)).toBe(true);expect(run.analyses.flatMap(x=>x.signals).every(x=>x.evidenceRefs.length>0)).toBe(true)});
  it("detects severe strategy drift",()=>{const context=createAgentContext(game()),drifted={...context,portfolio:{...context.portfolio,cash:0,portfolioValue:100000,positions:[{assetId:"industrials",quantity:1,averageBuyPrice:1,currentPrice:1,marketValue:100000,unrealizedPnL:0,unrealizedPnLPercent:0}]}};expect(strategyDrift(drifted)).toBeGreaterThanOrEqual(70)});
  it("runs stress scenarios without mutating the portfolio",()=>{const context=createAgentContext(game()),before=JSON.stringify(context.portfolio),scenario=riskScenario(context);expect(scenario.dataType).toBe("SIMULATED");expect(JSON.stringify(context.portfolio)).toBe(before)});
  it("decays unconfirmed signals",()=>{const original=runAgentRuntime(game()).analyses[0].signals[0],aged=decaySignal(original,original.lastConfirmedRound+30);expect(["WEAKENING","STALE"]).toContain(aged.status);expect(original.status).toBe("NEW")});
  it("builds consensus from current desk outputs",()=>{const analyses=runAgentRuntime(game()).analyses;expect(buildConsensus(analyses).supportingAgents.length+buildConsensus(analyses).opposingAgents.length+buildConsensus(analyses).neutralAgents.length).toBe(6)});
  it("persists bounded analyses, signals, disagreements and memory",()=>{const save=storeEpisode(createAppSave(),game());expect(save.agentAnalyses).toHaveLength(6);expect(save.agentSignalHistory.length).toBeGreaterThanOrEqual(6);expect(save.agentMemory).toHaveLength(6)});
  it("migrates saves with complete agent defaults",()=>{const old=createAppSave() as unknown as Record<string,unknown>;delete old.agentSettings;delete old.agentMemory;const migrated=migrateToV3(old);expect(migrated.agentSettings.enabledAgents.MARKET).toBe(true);expect(migrated.agentMemory).toEqual([])});
});
