import type { ChallengeDefinition } from "./types";
export const CHALLENGES:ChallengeDefinition[]=[
 {id:"panic-survivor",title:"Panic Survivor",description:"Preserve capital through the Panic of 1907.",episodeId:"panic-1907",status:"AVAILABLE",startingCapital:75000,difficulty:"HISTORIAN",objective:"Finish above $60,000"},
 {id:"crash-proof",title:"Crash Proof",description:"Face the Great Crash with limited starting cash.",episodeId:"great-crash",status:"AVAILABLE",startingCapital:75000,difficulty:"EXPERT",objective:"Keep drawdown below 45%"},
 {id:"energy-trader",title:"Energy Trader",description:"Trade the 1973 oil shock.",episodeId:"oil-shock",status:"AVAILABLE",startingCapital:100000,difficulty:"HISTORIAN",objective:"Beat the industrial benchmark"},
 {id:"war-finance",title:"War Finance",description:"Allocate capital during wartime controls.",status:"COMING_SOON",startingCapital:100000,difficulty:"EXPERT",objective:"Coming soon"},
 {id:"dot-com-discipline",title:"Dot-Com Discipline",description:"Separate durable growth from speculation.",status:"COMING_SOON",startingCapital:100000,difficulty:"EXPERT",objective:"Coming soon"},
 {id:"liquidity-2008",title:"Liquidity 2008",description:"Survive a modern credit freeze.",status:"COMING_SOON",startingCapital:100000,difficulty:"EXPERT",objective:"Coming soon"}
];
export const getChallenge=(id:string)=>CHALLENGES.find(c=>c.id===id);
