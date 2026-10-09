"use client";
import { useEffect, useMemo, useState } from "react";
import { ExperienceHero } from "./experience-moments";
import { getIntraRoundEventSchedule, getPendingSessionEvents } from "@/src/game/experience/service";
import type { AppSaveV3 } from "@/src/game/campaign/types";
import type { GameState } from "@/src/game/types";
import type { RoundExperienceState } from "@/src/game/round-experience/models";
import type { OfficeTarget } from "@/src/game/office/models";
export function DynamicSessionEvent({save,game,experience,setExperience,onNavigate,onFocusAsset,reducedMotion}:{save:AppSaveV3;game:GameState;experience:RoundExperienceState;setExperience:(state:RoundExperienceState)=>void;onNavigate:(target:OfficeTarget)=>void;onFocusAsset:(id:string)=>void;reducedMotion:boolean}){
 const schedule=useMemo(()=>getIntraRoundEventSchedule(save,game,experience.phase),[save,game,experience.phase]),[remaining,setRemaining]=useState(60),active=getPendingSessionEvents(schedule,experience.triggeredDynamicEventIds??[]).find(item=>remaining<=item.secondsRemaining);
 useEffect(()=>{if(experience.phase!=="TRADING")return;const timer=window.setInterval(()=>setRemaining(value=>Math.max(0,value-1)),1000);return()=>window.clearInterval(timer)},[experience.phase,game.roundNumber]);
 if(experience.phase!=="TRADING")return null;
 const close=()=>{if(active)setExperience({...experience,triggeredDynamicEventIds:[...(experience.triggeredDynamicEventIds??[]),active.id]})},act=(id:string)=>{const action=active?.event.actions.find(item=>item.id===id);if(action?.focusAssetId)onFocusAsset(action.focusAssetId);if(action?.target&&action.target!=="MARKET")onNavigate(action.target);close()};
 return<><div className={`market-countdown ${remaining<=10?"closing":""}`} role="timer" aria-label={`${remaining} seconds remaining`}><span>{remaining<=10?"MARKET CLOSING":"MARKET OPEN"}</span><strong>00:{String(remaining).padStart(2,"0")}</strong></div>{active?<div className={`dynamic-event ${reducedMotion?"reduced-motion":""}`} role="dialog" aria-label="Dynamic market event"><button className="dynamic-dismiss" onClick={close}>DISMISS</button><ExperienceHero compact event={active.event} eraYear={Number(game.currentDate.slice(0,4))} onAction={act}/></div>:null}</>
}
