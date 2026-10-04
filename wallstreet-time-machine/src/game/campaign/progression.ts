import type { GameState } from "../types";
import type { EpisodeGrade, EpisodeResult } from "./types";

export function scoreEpisode(state:GameState){const completed=state.objectives.filter(o=>o.status==="COMPLETED").length;const objectiveScore=state.objectives.length?completed/state.objectives.length*350:0;const returnScore=Math.max(0,Math.min(300,150+state.totalReturn*3));const drawdownScore=Math.max(0,250-state.maxDrawdown*5);const disciplineScore=Math.max(0,100-state.riskAlerts.filter(a=>a.severity!=="INFO").length*5);return Math.round(Math.max(0,Math.min(1000,objectiveScore+returnScore+drawdownScore+disciplineScore)))}
export function gradeForScore(score:number):EpisodeGrade{return score>=900?"S":score>=750?"A":score>=600?"B":score>=450?"C":"D"}
export function levelForXp(xp:number){return Math.min(10,Math.floor(Math.max(0,xp)/1000)+1)}
export function resultFor(state:GameState):EpisodeResult{const score=scoreEpisode(state);return{episodeId:state.episodeId,score,grade:gradeForScore(score),xpEarned:Math.max(100,Math.round(score/2)),endingCapital:state.portfolioValue,totalReturn:state.totalReturn,maxDrawdown:state.maxDrawdown,objectivesCompleted:state.objectives.filter(o=>o.status==="COMPLETED").length,completedAt:new Date().toISOString()}}
