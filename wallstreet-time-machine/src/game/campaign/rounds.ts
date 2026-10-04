import type { Episode, RoundGranularity } from "../types";

export function advanceDate(date:string,granularity:RoundGranularity,steps=1){const value=new Date(`${date}T00:00:00Z`);if(Number.isNaN(value.getTime()))throw new Error("Invalid game date");if(granularity==="DAY")value.setUTCDate(value.getUTCDate()+steps);else if(granularity==="WEEK")value.setUTCDate(value.getUTCDate()+steps*7);else value.setUTCMonth(value.getUTCMonth()+steps);return value.toISOString().slice(0,10)}
export function effectiveGranularity(episode:Episode,date:string):RoundGranularity{return episode.crisisWindows?.find(w=>w.startDate<=date&&w.endDate>=date)?.granularity??episode.roundGranularity}
export function activeCrisis(episode:Episode,date:string){return episode.crisisWindows?.find(w=>w.startDate<=date&&w.endDate>=date)}
