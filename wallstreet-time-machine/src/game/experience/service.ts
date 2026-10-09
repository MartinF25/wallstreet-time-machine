import type { AppSaveV3 } from "../campaign/types";
import { getAvailableEvents, getAvailableNews } from "../intelligence/service";
import { getDisplayedInformationReliability, visibleInformation } from "../information/service";
import { getRivalBriefing } from "../rivals/service";
import type { GameState } from "../types";
import type { GameExperienceEvent, OfficeActivity, RoundExperienceEvents, RoundStory, ScheduledExperienceEvent } from "./models";

const priorityValue = { CRITICAL: 4, MAJOR: 3, STANDARD: 2, AMBIENT: 1 } as const;
const hash = (value: string) => [...value].reduce((n, char) => (n * 33 + char.charCodeAt(0)) >>> 0, 5381);
const risk = (value: number): "LOW" | "MODERATE" | "HIGH" => value >= 4 ? "HIGH" : value >= 2 ? "MODERATE" : "LOW";

export function getRoundExperienceEvents(save: AppSaveV3, game: GameState): RoundExperienceEvents {
  const character = save.investorProfile?.character;
  const availableNews = getAvailableNews(game.currentDate, game.episodeId).filter(item => item.availableFrom <= game.currentDate);
  const historicalEvents = getAvailableEvents(game.currentDate, game.episodeId).filter(item => item.date <= game.currentDate);
  const information = character ? visibleInformation(save.information, { character, year: Number(game.currentDate.slice(0, 4)), currentDate: game.currentDate, currentRound: game.roundNumber, episodeId: game.episodeId }).filter(item => !["EXPIRED", "IGNORED", "UNSEEN"].includes(item.status)) : [];
  const rivalIntel = character ? getRivalBriefing(save.rivals, character) : [];
  const candidates: GameExperienceEvent[] = [];

  for (const item of information.slice(0, 4)) {
    const reliability = character ? getDisplayedInformationReliability(character, item).value : undefined;
    const phone = ["BANKER", "BROKER", "PRIVATE_CONTACT"].some(source => item.sourceId.includes(source.toLowerCase()));
    candidates.push({ id: `information-${item.id}`, priority: item.importance === "CRITICAL" ? "CRITICAL" : item.importance === "HIGH" ? "MAJOR" : "STANDARD", source: "INFORMATION", title: phone ? "PRIVATE CALL" : item.title.toUpperCase(), summary: item.summary, detail: `${item.type.replaceAll("_", " ")} / ${item.marketImpact} market impact`, relatedEntityId: item.id, relatedAssetId: item.affectedAssets[0], confidence: reliability, upside: item.marketImpact === "EXTREME" ? "HIGH" : "MODERATE", risk: item.marketImpact === "EXTREME" || item.marketImpact === "HIGH" ? "HIGH" : "MODERATE", reputationExposure: "MODERATE", actions: [{ id: "INVESTIGATE", label: item.status === "AVAILABLE" ? "OPEN INFORMATION DESK" : "INVESTIGATE", target: "INFORMATION", relatedEntityId: item.id }, ...(item.affectedAssets[0] ? [{ id: "VIEW_MARKET" as const, label: `FOCUS ${item.affectedAssets[0].toUpperCase()}`, target: "MARKET" as const, focusAssetId: item.affectedAssets[0] }] : []), { id: "WAIT", label: "WAIT" }] });
  }
  for (const item of availableNews.slice(-4)) candidates.push({ id: `news-${item.id}`, priority: item.importance >= 5 ? "CRITICAL" : item.importance >= 4 ? "MAJOR" : "STANDARD", source: "NEWS", title: item.importance >= 4 ? `EXTRA / ${item.headline.toUpperCase()}` : item.headline.toUpperCase(), summary: item.summary, detail: `${item.category} / ${item.sentiment}`, relatedEntityId: item.id, relatedAssetId: item.relatedAssets[0], upside: item.sentiment.includes("POSITIVE") ? "HIGH" : "LOW", risk: risk(item.importance), reputationExposure: "LOW", actions: [{ id: "VIEW_MARKET", label: "VIEW MARKET", target: "MARKET", focusAssetId: item.relatedAssets[0] }, { id: "WAIT", label: "HOLD COURSE" }] });
  for (const item of rivalIntel.slice(-3)) candidates.push({ id: `rival-${item.activityId}`, priority: item.confidence >= 70 ? "MAJOR" : "STANDARD", source: "RIVAL", title: "RIVAL ACTIVITY", summary: item.headline, detail: `${item.likelyAsset?.toUpperCase() ?? "MARKET"} / Confidence ${Math.round(item.confidence)}%`, relatedEntityId: item.rivalId, relatedAssetId: item.likelyAsset, confidence: item.confidence, upside: "MODERATE", risk: item.estimatedSize === "LARGE" ? "HIGH" : "MODERATE", reputationExposure: "LOW", actions: [{ id: "VIEW_RIVAL", label: "VIEW RIVAL", target: "RIVALS", relatedEntityId: item.rivalId }, ...(item.likelyAsset ? [{ id: "VIEW_MARKET" as const, label: "FOCUS ASSET", target: "MARKET" as const, focusAssetId: item.likelyAsset }] : [])] });
  for (const deal of save.dealState.opportunities.slice(0, 2)) candidates.push({ id: `deal-${deal.id}`, priority: deal.difficulty >= 70 ? "MAJOR" : "STANDARD", source: "DEAL", title: "URGENT FINANCING REQUEST", summary: `${deal.company.name} requires ${deal.type.toLowerCase().replaceAll("_", " ")}.`, detail: `Mandate $${Math.round(deal.dealSize / 1000).toLocaleString()}K / Potential fee $${Math.round(deal.expectedFee).toLocaleString()}`, relatedEntityId: deal.id, upside: "HIGH", risk: deal.difficulty >= 70 ? "HIGH" : "MODERATE", reputationExposure: "HIGH", actions: [{ id: "VIEW_DEAL", label: "REVIEW MANDATE", target: "DEALS", relatedEntityId: deal.id }, { id: "ACCEPT_DEAL", label: "ACCEPT / DEAL DESK", target: "DEALS", relatedEntityId: deal.id }, { id: "DECLINE", label: "DECLINE / DEAL DESK", target: "DEALS", relatedEntityId: deal.id }] });
  for (const alert of game.riskAlerts.slice(-2)) candidates.push({ id: `risk-${alert.id}`, priority: alert.severity === "CRITICAL" ? "CRITICAL" : "MAJOR", source: "RISK", title: alert.title.toUpperCase(), summary: alert.message, detail: "Portfolio attention required", relatedEntityId: alert.id, relatedAssetId: alert.relatedAssets[0], upside: "LOW", risk: alert.severity === "CRITICAL" ? "HIGH" : "MODERATE", reputationExposure: "LOW", actions: [{ id: "VIEW_MARKET", label: "REDUCE EXPOSURE", target: "MARKET", focusAssetId: alert.relatedAssets[0] }, { id: "WAIT", label: "ACCEPT RISK" }] });
  const currentHistorical = historicalEvents.filter(item => !game.seenEvents.includes(item.id)).at(-1);
  if (currentHistorical) candidates.push({ id: `event-${currentHistorical.id}`, priority: ["SYSTEMIC", "CRISIS"].includes(currentHistorical.severity) ? "CRITICAL" : "MAJOR", source: "MARKET", title: currentHistorical.title.toUpperCase(), summary: currentHistorical.summary, detail: `${currentHistorical.category} / ${currentHistorical.severity}`, relatedEntityId: currentHistorical.id, relatedAssetId: currentHistorical.relatedAssets[0], upside: "LOW", risk: currentHistorical.severity === "SYSTEMIC" ? "HIGH" : "MODERATE", reputationExposure: "LOW", actions: [{ id: "VIEW_MARKET", label: "ENTER MARKET", target: "MARKET", focusAssetId: currentHistorical.relatedAssets[0] }, { id: "WAIT", label: "WAIT FOR OPEN" }] });

  if (!candidates.length) candidates.push({ id: `market-${game.episodeId}-${game.roundNumber}`, priority: game.marketState.sentiment === "PANIC" ? "CRITICAL" : game.marketState.sentiment === "NERVOUS" ? "MAJOR" : "STANDARD", source: "MARKET", title: game.marketState.sentiment === "PANIC" ? "LIQUIDITY FEARS GRIP THE STREET" : game.marketState.regimeLabel.toUpperCase(), summary: `The market enters the session in a ${game.marketState.sentiment.toLowerCase().replaceAll("_", " ")} mood.`, detail: `Round ${game.roundNumber} / ${game.currentDate}`, upside: game.marketState.sentiment.includes("POSITIVE") ? "HIGH" : "MODERATE", risk: game.marketState.sentiment === "PANIC" ? "HIGH" : "MODERATE", reputationExposure: "LOW", actions: [{ id: "VIEW_MARKET", label: "OPEN MARKET", target: "MARKET" }, { id: "WAIT", label: "REVIEW BRIEFING" }] });
  candidates.sort((a, b) => priorityValue[b.priority] - priorityValue[a.priority] || a.id.localeCompare(b.id));
  return { hero: candidates[0], supporting: candidates.slice(1, 3), ambient: candidates.slice(3, 6).map(item => ({ ...item, priority: "AMBIENT" })) };
}

export function getIntraRoundEventSchedule(save: AppSaveV3, game: GameState, phase: string = "TRADING"): ScheduledExperienceEvent[] {
  if (phase !== "TRADING") return [];
  const events = getRoundExperienceEvents(save, game);
  const pool = [...events.supporting, events.hero, ...events.ambient];
  const count = pool.length > 2 ? 2 : 1;
  const base = hash(`${game.episodeId}:${game.roundNumber}:${game.seed}`);
  return Array.from({ length: count }, (_, index) => ({ id: `session-${game.episodeId}-${game.roundNumber}-${index}`, secondsRemaining: index === 0 ? 48 - (base % 7) : 24 - (base % 5), event: pool[(index + 1) % pool.length] }));
}
export function getPendingSessionEvents(schedule: ScheduledExperienceEvent[], triggeredIds: string[]) { return schedule.filter(item => !triggeredIds.includes(item.id)); }

export function getOfficeActivities(save: AppSaveV3, game: GameState): OfficeActivity[] {
  const events = getRoundExperienceEvents(save, game);
  const all = [events.hero, ...events.supporting, ...events.ambient];
  const investigating = save.information.items.filter(item => item.status === "INVESTIGATING" && item.availableFromDate <= game.currentDate).length;
  const activities: OfficeActivity[] = [
    { zone: "TELEPHONE", label: all.some(item => item.source === "DEAL") ? "CLIENT CALL" : "PRIVATE CALL", count: all.filter(item => item.source === "INFORMATION" || item.source === "DEAL").length, priority: events.hero.source === "INFORMATION" ? events.hero.priority : "STANDARD", eventId: events.hero.id },
    { zone: "NEWSPAPER", label: all.some(item => item.source === "NEWS" && ["CRITICAL", "MAJOR"].includes(item.priority)) ? "EXTRA" : "MORNING EDITION", count: all.filter(item => item.source === "NEWS").length, priority: all.find(item => item.source === "NEWS")?.priority ?? "AMBIENT" },
    { zone: "MARKET_BOARD", label: game.marketState.sentiment === "PANIC" ? "PANIC ON THE TAPE" : `${game.marketState.sentiment.replaceAll("_", " ")} TAPE`, count: 1, priority: game.marketState.sentiment === "PANIC" ? "CRITICAL" : "STANDARD" },
    { zone: "CONFERENCE_TABLE", label: save.dealState.activeDeals.length ? "DEAL DOCUMENTS" : "NEW MANDATES", count: save.dealState.activeDeals.length + save.dealState.opportunities.length, priority: save.dealState.activeDeals.length ? "MAJOR" : "STANDARD" },
    { zone: "RESEARCH", label: investigating ? "ANALYSIS IN PROGRESS" : "RESEARCH NOTES", count: investigating || save.workforce.employees.filter(item => ["ANALYST", "RESEARCHER"].includes(item.role) && ["ASSIGNED", "MANAGER"].includes(item.status)).length, priority: investigating ? "MAJOR" : "AMBIENT" }
  ];
  return activities.filter(item => item.count > 0);
}

export function getRoundStory(save: AppSaveV3, game: GameState): RoundStory {
  const snapshot = save.roundExperience?.snapshot;
  if (!snapshot) return { headline: "THE STREET AWAITS THE NEXT SESSION", sentences: ["No completed market session has been recorded."] };
  const stories: { score: number; text: string }[] = [];
  const move = snapshot.marketChange;
  stories.push({ score: Math.abs(move) + 4, text: `Markets ${move < 0 ? "fell" : "advanced"} ${Math.abs(move).toFixed(1)}% as ${snapshot.summary.sentiment.toLowerCase().replaceAll("_", " ")} sentiment shaped the session.` });
  if (snapshot.tradesExecuted) stories.push({ score: 6, text: `${save.investorProfile?.displayName ?? "Your firm"} executed ${snapshot.tradesExecuted} trade${snapshot.tradesExecuted === 1 ? "" : "s"}, including ${snapshot.shorts} short sale${snapshot.shorts === 1 ? "" : "s"}.` });
  if (snapshot.bestPosition) stories.push({ score: 5 + Math.abs(snapshot.bestPosition.pnl) / Math.max(1, game.portfolioValue) * 100, text: `${snapshot.bestPosition.assetId.toUpperCase()} was the strongest position, contributing ${snapshot.bestPosition.pnl >= 0 ? "a gain" : "a loss"} of $${Math.abs(Math.round(snapshot.bestPosition.pnl)).toLocaleString()}.` });
  for (const headline of snapshot.importantNews) stories.push({ score: 8, text: `${headline}.` });
  if (snapshot.rivalActivityIds.length) stories.push({ score: 7, text: `${snapshot.rivalActivityIds.length} visible rival move${snapshot.rivalActivityIds.length === 1 ? " was" : "s were"} detected during the session.` });
  if (snapshot.informationChanges.length) stories.push({ score: 6, text: `Research changed the picture: ${snapshot.informationChanges[0]}.` });
  const completedDeal = save.dealState.completedDeals.at(-1);
  if (completedDeal?.outcome?.resolvedYear === Number(game.currentDate.slice(0, 4))) stories.push({ score: completedDeal.outcome.quality === "EXCEPTIONAL" ? 10 : 6, text: `${save.financialHouse.name} completed the ${completedDeal.company.name} mandate with a ${completedDeal.outcome.quality.toLowerCase()} result.` });
  stories.sort((a, b) => b.score - a.score);
  const exceptional = Math.abs(move) >= 5 || snapshot.importantNews.length > 0 || completedDeal?.outcome?.quality === "EXCEPTIONAL";
  return { headline: Math.abs(move) >= 5 ? "A TURBULENT SESSION ON WALL STREET" : move >= 0 ? "CONFIDENCE HOLDS ON WALL STREET" : "NERVOUS TRADING ON WALL STREET", newspaperTitle: exceptional ? (move < 0 ? "MARKETS PLUNGE" : "SPECULATION GRIPS WALL STREET") : undefined, sentences: stories.slice(0, 5).map(item => item.text) };
}

export function actionTarget(event: GameExperienceEvent, actionId: string) { return event.actions.find(action => action.id === actionId)?.target; }
