import type { OfficeTarget } from "../office/models";

export type ExperiencePriority = "CRITICAL" | "MAJOR" | "STANDARD" | "AMBIENT";
export type ExperienceSource = "NEWS" | "INFORMATION" | "RIVAL" | "DEAL" | "RISK" | "MARKET" | "EMPLOYEE";

export interface ExperienceAction {
  id: "VIEW_MARKET" | "INVESTIGATE" | "VIEW_RIVAL" | "VIEW_DEAL" | "ACCEPT_DEAL" | "DECLINE" | "WAIT";
  label: string;
  target?: OfficeTarget;
  relatedEntityId?: string;
  focusAssetId?: string;
}

export interface GameExperienceEvent {
  id: string;
  priority: ExperiencePriority;
  source: ExperienceSource;
  title: string;
  summary: string;
  detail: string;
  relatedEntityId?: string;
  relatedAssetId?: string;
  confidence?: number;
  upside: "LOW" | "MODERATE" | "HIGH";
  risk: "LOW" | "MODERATE" | "HIGH";
  reputationExposure: "LOW" | "MODERATE" | "HIGH";
  actions: ExperienceAction[];
}

export interface RoundExperienceEvents {
  hero: GameExperienceEvent;
  supporting: GameExperienceEvent[];
  ambient: GameExperienceEvent[];
}

export interface ScheduledExperienceEvent {
  id: string;
  secondsRemaining: number;
  event: GameExperienceEvent;
}

export interface RoundStory {
  headline: string;
  newspaperTitle?: string;
  sentences: string[];
}

export interface OfficeActivity {
  zone: "TELEPHONE" | "NEWSPAPER" | "MARKET_BOARD" | "CONFERENCE_TABLE" | "RESEARCH";
  label: string;
  count: number;
  priority: ExperiencePriority;
  eventId?: string;
}
