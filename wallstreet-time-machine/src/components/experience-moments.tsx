"use client";
import type { GameExperienceEvent, RoundStory } from "@/src/game/experience/models";

export function ExperienceHero({ event, eraYear, onAction, compact = false }: { event: GameExperienceEvent; eraYear: number; onAction: (actionId: string) => void; compact?: boolean }) {
  const medium = eraYear < 1920 ? (event.source === "NEWS" ? "NEWSPAPER EXTRA" : "PRIVATE WIRE") : eraYear < 1980 ? "MARKET BULLETIN" : "MARKET ALERT";
  return <article className={`experience-hero priority-${event.priority.toLowerCase()} ${compact ? "compact" : ""}`} aria-label={`${event.priority} ${event.title}`}>
    <div className="experience-medium">{medium} / {event.priority}</div>
    <h2>{event.title}</h2><p className="experience-summary">{event.summary}</p><p className="experience-detail">{event.detail}</p>
    {!compact ? <div className="consequence-preview"><span><small>POTENTIAL UPSIDE</small><b>{event.upside}</b></span><span><small>RISK</small><b>{event.risk}</b></span>{event.confidence !== undefined ? <span><small>INFORMATION CONFIDENCE</small><b>{Math.round(event.confidence)}%</b></span> : null}<span><small>REPUTATION EXPOSURE</small><b>{event.reputationExposure}</b></span></div> : null}
    <div className="experience-actions">{event.actions.slice(0, compact ? 2 : 4).map(action => <button className={action.id === "WAIT" ? "text-btn" : "btn small"} key={action.id} onClick={() => onAction(action.id)}>{action.label}</button>)}</div>
  </article>;
}

export function RoundStoryPage({ story, firmName }: { story: RoundStory; firmName: string }) {
  return <article className={`round-story ${story.newspaperTitle ? "front-page" : ""}`}>
    <div className="story-masthead">THE WALL STREET CHRONICLE</div>{story.newspaperTitle ? <div className="story-extra">EXTRA</div> : null}
    <h2>{story.newspaperTitle ?? story.headline}</h2>{story.newspaperTitle ? <h3>{story.headline}</h3> : null}
    <div className="story-copy">{story.sentences.map(sentence => <p key={sentence}>{sentence}</p>)}</div><footer>{firmName.toUpperCase()} / ROUND RECORD</footer>
  </article>;
}
