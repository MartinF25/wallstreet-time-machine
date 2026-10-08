"use client";

import { useState, type ReactNode } from "react";
import { Portrait } from "./identity-ui";
import { ARCHETYPES } from "@/src/game/identity/catalog";
import { resolveAvatarPresentation, resolveMood } from "@/src/game/identity/evolution";
import { ERAS } from "@/src/game/campaign/eras";
import type { AppSaveV3 } from "@/src/game/campaign/types";
import type { Asset, GameState, RoundSummary, TradeSide } from "@/src/game/types";
import { exposure } from "@/src/game/advanced-trading/service";
import { tradingMetadata } from "@/src/game/advanced-trading/rules";
import { roundInvestmentSummary } from "@/src/game/round-investment/service";
import { historyForRange, latestOutcome, marketMemory } from "@/src/game/decision-memory/service";
import type { ChartRange, DecisionReason, DecisionType } from "@/src/game/decision-memory/models";
import type { MarketSessionPhase } from "@/src/game/round-experience/models";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const date = (value: string) => new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
const signed = (value: number) => `${value >= 0 ? "+" : ""}${money.format(value)}`;

export default function GameHud(props: {
  game: GameState;
  profile: AppSaveV3["investorProfile"];
  visualState: AppSaveV3["eraIdentityState"];
  assets: Asset[];
  episodeName: string;
  eraId: string;
  level: number;
  heat: string;
  crisis: boolean;
  side: TradeSide;
  assetId: string;
  quantity: string;
  reason: DecisionReason;
  holdSelected: boolean;
  summary: RoundSummary | null;
  before: GameState | null;
  revealActive: boolean;
  sessionPhase: MarketSessionPhase;
  overlay?: ReactNode;
  onHome: () => void;
  onSide: (side: TradeSide) => void;
  onAsset: (asset: string) => void;
  onQuantity: (quantity: string) => void;
  onReason: (reason: DecisionReason) => void;
  onTrade: () => void;
  onHold: () => void;
  onNext: () => void;
}) {
  const [range, setRange] = useState<ChartRange>("ERA");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [decisionFilter, setDecisionFilter] = useState<"ALL" | DecisionType>("ALL");
  const [assetFilter, setAssetFilter] = useState("ALL");
  const { game, profile, visualState, assets } = props;
  const x = exposure(game);
  const round = roundInvestmentSummary(game, props.holdSelected);
  const asset = assets.find((item) => item.id === props.assetId) ?? assets[0];
  const price = game.marketState.prices[asset.id];
  const previous = game.marketState.previousPrices[asset.id] ?? price;
  const move = previous ? ((price / previous) - 1) * 100 : 0;
  const meta = tradingMetadata(game, asset.id);
  const quantity = Math.max(0, Number(props.quantity) || 0);
  const gross = price * quantity;
  const fee = gross * 0.0025;
  const margin = props.side === "SHORT" ? gross * meta.initialMarginRequirement : 0;
  const currentEra = ERAS.find((era) => era.id === props.eraId);
  const archetype = ARCHETYPES.find((item) => item.id === profile?.archetypeId);
  const presentation = profile ? resolveAvatarPresentation({
    avatarId: profile.avatarId,
    currentEraId: props.eraId,
    archetypeId: profile.archetypeId,
    mood: resolveMood({ marketHeat: props.heat, crisisState: props.crisis, portfolioChange: props.summary?.weeklyChange }),
    crisisState: props.crisis,
    careerBadges: visualState.careerBadges,
    displayContext: "HEADER",
    visualState,
  }) : undefined;
  const positions = [
    ...game.positions.map((position) => ({ id: position.assetId, direction: "LONG", value: position.marketValue, pnl: position.unrealizedPnL })),
    ...game.shortPositions.map((position) => ({ id: position.assetId, direction: "SHORT", value: position.marketValue, pnl: position.unrealizedPnL })),
  ].sort((a, b) => b.value - a.value).slice(0, 5);
  const result = props.summary && props.before ? game.portfolioValue - props.before.portfolioValue : undefined;
  const rawHistory = historyForRange(game, asset.id, range);
  const history = rawHistory.length ? rawHistory : [{ assetId:asset.id, episodeId:game.episodeId, roundNumber:game.roundNumber, date:game.currentDate, close:price, dataType:"SIMULATED" as const }];
  const min = Math.min(...history.map((point) => point.close));
  const max = Math.max(...history.map((point) => point.close));
  const spread = Math.max(max - min, Math.max(1, max * .02));
  const coordinates = history.map((point, index) => ({ ...point, x:history.length === 1 ? 350 : index / (history.length - 1) * 700, y:230 - ((point.close - min) / spread) * 190 }));
  const chartLine = coordinates.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const memory = marketMemory(game, asset.id, range);
  const lastDecision = game.decisionHistory.at(-1);
  const lastOutcome = lastDecision ? latestOutcome(game, lastDecision.id) : undefined;
  const filteredDecisions = game.decisionHistory.filter((decision) => (decisionFilter === "ALL" || decision.type === decisionFilter) && (assetFilter === "ALL" || decision.assetId === assetFilter)).slice().reverse();

  return <main className={`game-hud ${props.crisis ? "is-crisis" : ""}`}>
    <header className="era-command">
      <div className="hud-nav"><button className="hud-menu" onClick={props.onHome}>← MENU</button><button className="hud-menu" onClick={()=>setHistoryOpen(true)}>HISTORY</button></div>
      <div><span>{currentEra?.title ?? props.episodeName}</span><strong>{date(game.currentDate)}</strong></div>
      <div><span>ROUND {game.roundNumber} / {props.sessionPhase.replaceAll("_", " ")}</span><strong>{props.sessionPhase === "TRADING" ? "MARKET OPEN" : `MARKET ${props.heat}`}</strong></div>
    </header>
    {props.crisis ? <div className="crisis-command"><b>CRISIS MODE</b><span>1 ROUND = 1 TRADING DAY</span><strong>MARKET STRESS: {props.heat}</strong></div> : null}
    <div className="hud-ticker" aria-label="Current market moves">{assets.map((item) => { const now = game.marketState.prices[item.id]; const old = game.marketState.previousPrices[item.id] ?? now; const change = old ? ((now / old) - 1) * 100 : 0; return <span key={item.id}>{item.symbol} <b>{change >= 0 ? "+" : ""}{change.toFixed(1)}%</b></span>; })}</div>
    <div className="hud-columns">
      <aside className="investor-hud">
        <span className="hud-kicker">YOUR INVESTOR</span>
        {profile ? <Portrait avatarId={profile.avatarId} name={profile.displayName} large presentation={presentation} /> : <div className="initial-avatar">INV</div>}
        <h1>{profile?.displayName ?? "INVESTOR"}</h1>
        <b>{archetype?.name ?? "MARKET OPERATOR"}</b>
        <span>LEVEL {props.level} · {currentEra?.title}</span>
        <div className="ability-signal"><small>ACTIVE ABILITY</small><strong>{archetype?.coreAbility.name ?? "MARKET DISCIPLINE"}</strong><span>{archetype?.coreAbility.description}</span></div>
        <div className="capital-mark"><small>CAPITAL</small><strong>{money.format(game.portfolioValue)}</strong><span className={(game.portfolioValue - game.startingCapital) >= 0 ? "positive" : "negative"}>{signed(game.portfolioValue - game.startingCapital)} career</span></div>
        <div className="top-risk"><small>TOP RISK</small><b>{game.riskAlerts.at(-1)?.title ?? "NO ACTIVE ALERT"}</b><span>Margin utilization {game.marginAccount.marginUtilization.toFixed(0)}%</span></div>
      </aside>

      <section className="market-action">
        <div className="selected-market"><div><span>SELECTED MARKET · SIMULATED</span><h2>{asset.name}</h2></div><div><strong>{price.toFixed(2)}</strong><b className={move >= 0 ? "positive" : "negative"}>{move >= 0 ? "+" : ""}{move.toFixed(2)}% THIS ROUND</b></div></div>
        <div className="chart-ranges" aria-label="Chart range">{(["1W","1M","3M","1Y","ERA"] as ChartRange[]).map((value)=><button aria-pressed={range===value} onClick={()=>setRange(value)} key={value}>{value}</button>)}</div>
        <div className={`market-chart ${Math.abs(move) >= 5 ? "major-move" : ""}`} role="img" aria-label={`${asset.name} ${range} price history from ${history[0].close.toFixed(2)} to ${price.toFixed(2)}, ${history.length} known points`}>
          <svg viewBox="0 0 700 260" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".3"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs><path className="chart-grid" d="M0 50H700M0 130H700M0 210H700"/><path className="chart-area" d={`${chartLine} L700 260 L0 260Z`}/><path className="chart-line" d={chartLine}/>{memory.entry?<><line className="entry-line" x1="0" x2="700" y1={230-((memory.entry.entry-min)/spread)*190} y2={230-((memory.entry.entry-min)/spread)*190}/><text className="entry-label" x="12" y={Math.max(18,220-((memory.entry.entry-min)/spread)*190)}>{memory.entry.direction==="SHORT"?"SHORT ENTRY":"AVG ENTRY"} {memory.entry.entry.toFixed(2)}</text></>:null}<circle className="current-marker" cx={coordinates.at(-1)!.x} cy={coordinates.at(-1)!.y} r="6"/></svg>
          <div className="chart-caption"><span>MARKET HISTORY · {history[0].dataType}</span><b>{game.marketState.regimeLabel}</b></div><div className="current-label">CURRENT · {price.toFixed(2)}</div>
        </div>
        <div className="memory-strip"><span><small>ERA HIGH</small><b>{memory.eraHigh.toFixed(2)}</b></span><span><small>ERA LOW</small><b>{memory.eraLow.toFixed(2)}</b></span><span><small>DRAWDOWN</small><b>{memory.drawdownFromEraHigh.toFixed(1)}%</b></span><span><small>SINCE ERA START</small><b>{memory.returnSinceEraStart.toFixed(1)}%</b></span>{memory.entry?<span><small>{memory.entry.direction} SINCE ENTRY</small><b>{memory.entry.returnPercent.toFixed(1)}%</b></span>:null}</div>        <div className="heat hud-heat"><span>MARKET HEAT</span>{["CALM", "ACTIVE", "NERVOUS", "STRESSED", "PANIC"].map((level) => <i className={level === props.heat ? "on" : ""} key={level}>{level}</i>)}</div>
        <div className="position-strip"><span>CURRENT POSITION</span>{positions.length ? positions.map((position) => <article key={`${position.id}-${position.direction}`}><b>{position.id.toUpperCase()} <em>{position.direction}</em></b><strong>{money.format(position.value)}</strong><small className={position.pnl >= 0 ? "positive" : "negative"}>{signed(position.pnl)}</small></article>) : <p><b>NO POSITIONS</b><br/>Your capital is held in cash. Choose an action to enter the market.</p>}</div>
        {result !== undefined ? <div className="round-result"><span>ROUND RESULT</span><strong className={result >= 0 ? "positive" : "negative"}>{signed(result)}</strong><p>{props.summary?.biggestMover ? `Best move: ${props.summary.biggestMover.assetId.toUpperCase()} ${props.summary.biggestMover.change.toFixed(1)}%` : "Portfolio result recorded."}</p><small>Cash change {signed(props.summary?.cashChange ?? 0)} · Fees {money.format(round.feesPaid)} · Borrow {money.format(round.borrowFees)}</small></div> : null}
      </section>

      <aside className="investment-hud">
        <span className="hud-kicker">THIS ROUND</span>{game.roundHistory.at(-1)?<div className="last-round"><small>LAST ROUND RESULT</small><strong className={game.roundHistory.at(-1)!.pnl>=0?"positive":"negative"}>{signed(game.roundHistory.at(-1)!.pnl)}</strong><span>Long {signed(game.roundHistory.at(-1)!.longPnL)} · Short {signed(game.roundHistory.at(-1)!.shortPnL)}</span></div>:null}
        <div className="invested"><small>INVESTED THIS ROUND</small><strong>{money.format(round.buyValue + round.shortValue)}</strong></div>
        <dl><div><dt>Start portfolio</dt><dd>{money.format(round.startCapital)}</dd></div><div><dt>Bought</dt><dd>{money.format(round.buyValue)}</dd></div><div><dt>Sold</dt><dd>{money.format(round.sellValue)}</dd></div><div><dt>Shorted</dt><dd>{money.format(round.shortValue)}</dd></div><div><dt>Covered</dt><dd>{money.format(round.coverValue)}</dd></div><div><dt>Fees</dt><dd>{money.format(round.feesPaid)}</dd></div><div><dt>Current cash</dt><dd>{money.format(game.cash)}</dd></div><div className="round-pnl"><dt>Round P&amp;L</dt><dd className={round.roundPnL >= 0 ? "positive" : "negative"}>{signed(round.roundPnL)}</dd></div></dl>
        {round.holdSelected ? <div className="hold-record"><b>HOLD POSITION</b><span>No trade executed. Current strategy maintained.</span></div> : null}
        <div className="exposure-card"><h3>CURRENT EXPOSURE</h3><dl><div><dt>LONG</dt><dd>{money.format(x.long)}</dd></div><div><dt>SHORT</dt><dd>{money.format(x.short)}</dd></div><div><dt>NET</dt><dd>{money.format(x.net)}</dd></div><div><dt>GROSS</dt><dd>{money.format(x.gross)}</dd></div><div><dt>MARGIN USED</dt><dd>{money.format(game.marginAccount.marginUsed)}</dd></div><div><dt>MARGIN AVAILABLE</dt><dd>{money.format(game.marginAccount.marginAvailable)}</dd></div></dl></div>
        <div className="last-decision"><h3>LAST DECISION</h3>{lastDecision?<><b>{lastDecision.type}{lastDecision.assetId?` · ${lastDecision.assetId.toUpperCase()}`:""}</b><span>{game.roundNumber-lastDecision.roundNumber} rounds ago · {lastOutcome?.status}</span><strong className={(lastOutcome?.netPnL??0)>=0?"positive":"negative"}>{signed(lastOutcome?.netPnL??0)}</strong></>:<p>No decision recorded yet.</p>}<button onClick={()=>setHistoryOpen(true)}>VIEW HISTORY</button></div>
      </aside>
    </div>

    <section className="trade-dock" aria-label="Trade actions">
      <div className="action-cluster">{(["BUY", "SELL", "SHORT", "COVER"] as TradeSide[]).map((action) => <button className={props.side === action ? "active" : ""} aria-pressed={props.side === action} onClick={() => props.onSide(action)} key={action}>{action}</button>)}<button className={props.holdSelected ? "active" : ""} aria-pressed={props.holdSelected} onClick={props.onHold}>HOLD</button></div>
      <div className="trade-ticket"><select aria-label="Asset" value={props.assetId} onChange={(event) => props.onAsset(event.target.value)}>{assets.map((item) => <option value={item.id} key={item.id}>{item.symbol} · {item.name}</option>)}</select><input aria-label="Quantity" type="number" min=".01" value={props.quantity} onChange={(event) => props.onQuantity(event.target.value)}/><select className="reason-select" aria-label="Decision reason" value={props.reason} onChange={(event)=>props.onReason(event.target.value as DecisionReason)}>{["STRATEGY","VALUATION","MOMENTUM","CREDIT_STRESS","RISK_REDUCTION","LIQUIDITY","MACRO","NEWS","CRISIS","CUSTOM"].map(value=><option value={value} key={value}>{value.replaceAll("_"," ")}</option>)}</select><div><small>AMOUNT</small><b>{money.format(gross)}</b></div><div><small>FEES</small><b>{money.format(fee)}</b></div>{props.side === "SHORT" ? <><div><small>BORROW</small><b>{meta.borrowAvailability} · {(meta.borrowFeeRate * 100).toFixed(1)}%</b></div><div><small>INITIAL MARGIN</small><b>{money.format(margin)}</b></div></> : null}<button className="execute-order" onClick={props.onTrade}>CONFIRM {props.side}</button></div>
      {props.side === "SHORT" ? <p className="short-warning"><b>SHORT POSITION</b> · Losses can exceed initial collateral. Maintenance margin {(meta.maintenanceMarginRequirement * 100).toFixed(0)}%.</p> : null}
      <button className="next-round" disabled={props.revealActive} onClick={props.onNext}>END ROUND</button>
    </section>
    {historyOpen?<section className="decision-history" role="dialog" aria-modal="true" aria-label="Decision History"><header><div><span>MARKET MEMORY</span><h2>DECISION HISTORY</h2></div><button onClick={()=>setHistoryOpen(false)}>CLOSE</button></header><nav aria-label="Decision filters">{(["ALL","BUY","SELL","SHORT","COVER","HOLD"] as const).map(value=><button aria-pressed={decisionFilter===value} onClick={()=>setDecisionFilter(value)} key={value}>{value}</button>)}<select aria-label="Filter by asset" value={assetFilter} onChange={event=>setAssetFilter(event.target.value)}><option value="ALL">ALL ASSETS</option>{assets.map(item=><option value={item.id} key={item.id}>{item.symbol}</option>)}</select></nav><div className="decision-timeline">{filteredDecisions.length?filteredDecisions.map(decision=>{const outcome=latestOutcome(game,decision.id);return<article key={decision.id}><time>{date(decision.gameDate)} · ROUND {decision.roundNumber}</time><h3>{decision.type}{decision.assetId?` · ${decision.assetId.toUpperCase()}`:""}</h3><div className="decision-facts"><span><small>AMOUNT</small><b>{decision.amount?money.format(decision.amount):"NO TRADE"}</b></span><span><small>ENTRY</small><b>{decision.price?.toFixed(2)??"—"}</b></span><span><small>STATUS</small><b>{outcome.status}</b></span><span><small>NET OUTCOME</small><b className={(outcome.netPnL??0)>=0?"positive":"negative"}>{signed(outcome.netPnL??0)}</b></span></div><p><b>WHY</b> · {decision.reasonText??decision.reason?.replaceAll("_"," ")??"No reason recorded"}</p><p><b>AT THE TIME</b> · {decision.marketContext.marketHeat} · {decision.strategyContext} · Capital {money.format(decision.portfolioBefore.portfolioValue)}</p><small>{outcome.roundsElapsed} rounds · Costs {money.format((outcome.fees??0)+(outcome.borrowFees??0))} · {decision.status}</small></article>}):<p className="history-empty"><b>NO DECISIONS YET</b><br/>Your investment story begins with a trade or a deliberate hold.</p>}</div></section>:null}    {props.overlay}
  </main>;
}
