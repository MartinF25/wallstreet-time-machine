import type { Difficulty, GameState, ISODate } from "../types";
import type { IntelligenceAlert, PlayerNote, WatchlistItem } from "../intelligence/models";
import type { AgentAnalysis, AgentDisagreement, AgentMemory, AgentSettings, AgentSignal } from "../agents/models";
import type { CharacterHistory, InvestorLegacy, InvestorProfile } from "../identity/models";

export type EraStatus = "LOCKED" | "UNLOCKED" | "COMPLETED";
export type CapitalCarryoverMode = "FULL" | "NORMALIZED" | "FIXED";
export type EpisodeGrade = "S" | "A" | "B" | "C" | "D";
export type ChallengeStatus = "AVAILABLE" | "COMING_SOON";

export interface EraDefinition { id:string; order:number; title:string; years:string; startYear:number; endYear:number; description:string; episodeId?:string; teaser:string }
export interface EraProgress { eraId:string; status:EraStatus; bestScore?:number; bestGrade?:EpisodeGrade; completedAt?:string }
export interface CareerStats { episodesStarted:number; episodesCompleted:number; challengesCompleted:number; trades:number; bestScore:number; totalXp:number; highestCapital:number; largestDrawdown:number }
export interface CareerState { id:string; createdAt:string; updatedAt:string; currentEraId:string; capital:number; carryoverMode:CapitalCarryoverMode; difficulty:Exclude<Difficulty,"STANDARD">; eraProgress:EraProgress[]; level:number; xp:number; completedEpisodeIds:string[] }
export interface Achievement { id:string; title:string; description:string; unlockedAt?:string }
export type AnimationSpeed="NORMAL"|"FAST"|"OFF"; export type IntelligenceDetail="STANDARD"|"DETAILED"|"EXPERT"; export interface CareerSettings { difficulty:Exclude<Difficulty,"STANDARD">; carryoverMode:CapitalCarryoverMode; reducedMotion:boolean; animationSpeed:AnimationSpeed; masterAudio:boolean; uiSounds:boolean; marketSounds:boolean; newsSounds:boolean; ambience:boolean; cinematicIntros:boolean; breakingNewsOverlays:boolean; tickerMotion:boolean; intelligenceDetail:IntelligenceDetail }
export interface AppSaveV3 { schemaVersion:3; investorProfile:InvestorProfile|null; characterHistory:CharacterHistory; investorLegacy:InvestorLegacy|null; career:CareerState|null; activeEpisode:GameState|null; episodeSaves:Record<string,GameState>; challengeSaves:Record<string,GameState>; achievements:Achievement[]; stats:CareerStats; settings:CareerSettings; watchlist:WatchlistItem[]; playerNotes:PlayerNote[]; acknowledgedAlerts:string[]; intelligenceAlerts:IntelligenceAlert[]; seenIndicatorReleases:string[]; agentAnalyses:AgentAnalysis[]; agentSignalHistory:AgentSignal[]; agentDisagreements:AgentDisagreement[]; agentMemory:AgentMemory[]; agentSettings:AgentSettings; updatedAt:string }
export interface EpisodeResult { episodeId:string; score:number; grade:EpisodeGrade; xpEarned:number; endingCapital:number; totalReturn:number; maxDrawdown:number; objectivesCompleted:number; completedAt:ISODate|string }
export interface ChallengeDefinition { id:string; title:string; description:string; episodeId?:string; status:ChallengeStatus; startingCapital:number; difficulty:"CASUAL"|"HISTORIAN"|"EXPERT"; objective:string }
