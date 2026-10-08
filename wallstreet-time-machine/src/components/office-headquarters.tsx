"use client";
import type { AppSaveV3 } from "@/src/game/campaign/types";
import { getEra } from "@/src/game/campaign/eras";
import { CHARACTER_ARCHETYPES } from "@/src/game/character-foundation/catalog";
import { resolveAvatarPresentation } from "@/src/game/identity/evolution";
import { getRivalBriefing } from "@/src/game/rivals/service";
import { OFFICE_LEVELS, OFFICE_ZONES, getOfficeEraPresentation } from "@/src/game/office/service";
import type { OfficeTarget } from "@/src/game/office/models";
import { Portrait } from "./identity-ui";

const money=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});
export function OfficeHeadquarters({save,navigate}:{save:AppSaveV3;navigate:(target:OfficeTarget)=>void}){
 const career=save.career,profile=save.investorProfile;if(!career||!profile)return null;
 const era=getEra(career.currentEraId),year=save.activeEpisode?Number(save.activeEpisode.currentDate.slice(0,4)):(era?.startYear??1900),presentation=getOfficeEraPresentation(year),office=save.officeState,level=OFFICE_LEVELS.find(x=>x.level===office.level)!,game=save.activeEpisode,character=profile.character,archetype=CHARACTER_ARCHETYPES.find(x=>x.id===character.archetype),portrait=resolveAvatarPresentation({avatarId:profile.avatarId,currentEraId:career.currentEraId,archetypeId:profile.archetypeId,mood:"FOCUSED",careerBadges:save.eraIdentityState.careerBadges,displayContext:"HEADER",visualState:save.eraIdentityState}),visibleRivals=getRivalBriefing(save.rivals,character).length,availableInfo=save.information.items.filter(x=>x.availableFromDate<=(game?.currentDate??`${year}-12-31`)&&!['EXPIRED','IGNORED'].includes(x.status)).length;
 const market=()=>navigate(game?"MARKET":"CAMPAIGN");
 return<section className={`office office-${presentation.id.toLowerCase()}`} aria-label="Office headquarters">
  <header className="office-command"><div><div className="eyebrow">HEADQUARTERS / {year} / OFFICE LEVEL {office.level}</div><h1>{level.name}</h1><p>{presentation.theme}. {presentation.atmosphere}.</p></div><button className="office-investor" onClick={()=>navigate("PROFILE")}><Portrait avatarId={profile.avatarId} name={profile.displayName} presentation={portrait}/><span><b>{profile.displayName}</b>{archetype?.name}<small>LEVEL {character.level} / {character.credits} CREDITS</small></span></button></header>
  <div className="office-status" aria-label="Headquarters status"><span><small>ERA</small><b>{era?.title}</b></span><span><small>CAPITAL</small><b>{money.format(game?.portfolioValue??career.capital)}</b></span><span><small>MARKET</small><b>{game?`ROUND ${game.roundNumber} / ${save.roundExperience?.phase.replaceAll('_',' ')??'TRADING'}`:"NO ACTIVE SESSION"}</b></span><span><small>INTELLIGENCE</small><b>{availableInfo} ITEMS / {visibleRivals} RIVAL SIGNALS</b></span><span><small>FINANCIAL HOUSE</small><b>LEVEL {save.financialHouse.level} / {save.expansionState.branches.length} BRANCH{save.expansionState.branches.length===1?"":"ES"} / {save.financialHouse.divisions.filter(x=>x.status==="ACTIVE").length} DIVISIONS / {save.workforce.employees.length} STAFF</b></span></div>
  <div className="office-scene" aria-label={`${presentation.theme} interactive office`}>
   <div className="office-window" aria-hidden="true"><i/><i/><i/><span>WALL STREET / {year}</span></div><div className="office-rug" aria-hidden="true"/>
   {OFFICE_ZONES.map(zone=>{const unlocked=office.unlockedZones.includes(zone.id),action=zone.target?(zone.target==="MARKET"?market:()=>navigate(zone.target!)):undefined;return<button key={zone.id} className={`office-zone zone-${zone.id.toLowerCase()} ${unlocked?"unlocked":"locked"}`} disabled={!unlocked} onClick={action} aria-label={`${zone.label}${unlocked?"":" locked"}`}><span>{zone.objectLabel}</span><strong>{zone.label}</strong><small>{zone.id==="CONFERENCE_TABLE"?"Requires Investment Banking Division":unlocked?zone.description:`LOCKED / OFFICE LEVEL ${zone.unlockLevel}`}</small></button>})}
  </div>
  <footer className="office-footer"><div><span>MARKET DEVICE</span><b>{presentation.marketDevice}</b></div><div><span>COMMUNICATION</span><b>{presentation.communicationDevice}</b></div><div><span>NEWS</span><b>{presentation.newsMedium}</b></div><div><span>RESEARCH</span><b>{presentation.researchMedium}</b></div><button className="btn" onClick={()=>navigate("CAMPAIGN")}>CAMPAIGN TIMELINE</button></footer>
 </section>
}
