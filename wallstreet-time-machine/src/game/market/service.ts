import { advanceDate } from "../campaign/rounds";
import { getEpisode, getEpisodeAssets } from "../campaign/episodes";
import { ASSETS } from "../episodes/prologue";
import type { GameState, MarketDataPoint } from "../types";
const BASE_PRICES:Record<string,number>={industrials:112,banking:86,railroads:96,gold:20.67,bonds:101,energy:72,automotive:91};
const DRIFT:Record<string,number>={industrials:.0016,banking:.0012,railroads:.0008,gold:.00025,bonds:.00035,energy:.0015,automotive:.0007};
export const addWeeks=(date:string,weeks=1)=>advanceDate(date,"WEEK",weeks);
const hash=(seed:number,round:number,index:number)=>{const value=Math.sin(seed*12.9898+round*78.233+index*37.719)*43758.5453;return value-Math.floor(value)};
export function priceFor(assetId:string,round:number,seed:number,episodeId="great-crash"){const index=ASSETS.findIndex(a=>a.id===assetId);if(index<0)throw new Error("Unknown asset");let price=BASE_PRICES[assetId];for(let i=1;i<=round;i++){const volatility=episodeId==="panic-1907"?.08:episodeId==="oil-shock"?.06:assetId==="banking"?.065:.045;const shock=(hash(seed,i,index)-.5)*volatility,cycle=Math.sin((i+index*2)/7)*.006;let crisis=0;if(episodeId==="great-crash"&&i>=91&&i<=105&&["industrials","banking","railroads"].includes(assetId))crisis=-.025;if(episodeId==="panic-1907"&&i>=21&&i<=23&&["industrials","banking","railroads"].includes(assetId))crisis=-.06;if(episodeId==="oil-shock"&&i>=21&&i<=35)crisis=assetId==="energy"?.025:["industrials","automotive","banking"].includes(assetId)?-.025:0;price*=1+(DRIFT[assetId]??.001)+shock+cycle+crisis}return Number(Math.max(1,price).toFixed(2))}
export function getMarketPrices(round:number,seed:number,episodeId="great-crash"){return Object.fromEntries(getEpisodeAssets(episodeId).map(a=>[a.id,priceFor(a.id,round,seed,episodeId)]))}
export function getMarketPrice(state:GameState,assetId:string){const price=state.marketState.prices[assetId];if(!Number.isFinite(price)||price<=0)throw new Error("Market price unavailable");return price}
export function getVisibleMarketData(state:GameState):MarketDataPoint[]{const e=getEpisode(state.episodeId),points:MarketDataPoint[]=[];for(let round=0;round<=state.roundNumber;round++){const date=advanceDate(e.startDate,e.roundGranularity,round);if(date>state.currentDate)continue;for(const asset of getEpisodeAssets(e.id))points.push({assetId:asset.id,date,price:priceFor(asset.id,round,state.seed,e.id),dataType:"SIMULATED"})}return points}
export const getAssetMarketHistory=(state:GameState,assetId:string)=>getVisibleMarketData(state).filter(p=>p.assetId===assetId);
