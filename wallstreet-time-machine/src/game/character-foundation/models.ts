export const CHARACTER_STAT_MIN=0,CHARACTER_STAT_MAX=100;
export const CHARACTER_STAT_KEYS=["trading","risk","information","network","reputation","influence"]as const;
export type CharacterStatKey=typeof CHARACTER_STAT_KEYS[number];
export type CharacterStats=Record<CharacterStatKey,number>;
export type CharacterArchetypeId="SPECULATOR"|"VALUE_INVESTOR"|"NETWORKER"|"CRISIS_TRADER"|"CORPORATE_RAIDER"|"BANKER";
export type CharacterTraitId="TAPE_READER"|"CONTRARIAN"|"CALCULATED_RISK"|"NETWORK_BUILDER"|"DEEP_RESEARCH"|"FAST_OPERATOR"|"NEGOTIATOR"|"MARKET_HISTORIAN";
export type CharacterWeaknessId="OVERCONFIDENT"|"IMPATIENT"|"RISK_AVERSE"|"REPUTATION_SENSITIVE"|"INFORMATION_ADDICT"|"LEVERAGE_HABIT";
export type CharacterSkillCategory="TRADING"|"INFORMATION"|"NETWORK"|"RISK"|"REPUTATION"|"EMPIRE";
export type CharacterSkillId="TAPE_READER_I"|"TAPE_READER_II"|"SHORT_SPECIALIST"|"EXECUTION_DISCIPLINE"|"SOURCE_EVALUATION"|"DEEP_RESEARCH_SKILL"|"RUMOR_ANALYST"|"INTELLIGENCE_NETWORK"|"BANKER_CONTACTS"|"PRESS_NETWORK"|"INDUSTRIAL_CONNECTIONS"|"INSTITUTIONAL_NETWORK"|"MARGIN_DISCIPLINE"|"LIQUIDITY_RESERVE"|"CRISIS_DISCIPLINE"|"DRAWDOWN_RECOVERY"|"TRUSTED_OPERATOR"|"INSTITUTIONAL_STANDING"|"OFFICE_MANAGEMENT"|"BRANCH_PLANNING";
export type CreditRewardReason="round_completed"|"scenario_completed"|"crisis_survived"|"reputation_milestone"|"character_milestone"|"special_objective";
export type ModifierCategory="TRADING"|"RISK"|"INFORMATION"|"NETWORK"|"REPUTATION"|"INFLUENCE"|"DECISION_SPEED"|"LEVERAGE";
export interface CharacterModifier{category:ModifierCategory;stat?:CharacterStatKey;operation:"ADD"|"MULTIPLY";value:number;source:string}
export interface CharacterArchetypeDefinition{id:CharacterArchetypeId;name:string;description:string;strengths:string[];tradeoff:string;baseStats:CharacterStats}
export interface CharacterTraitDefinition{id:CharacterTraitId;name:string;description:string;modifiers:CharacterModifier[]}
export interface CharacterWeaknessDefinition{id:CharacterWeaknessId;name:string;description:string;modifiers:CharacterModifier[]}
export interface CharacterSkillDefinition{id:CharacterSkillId;name:string;description:string;category:CharacterSkillCategory;tier:number;creditCost:number;requiredLevel?:number;prerequisites?:CharacterSkillId[];allowedArchetypes?:CharacterArchetypeId[];modifiers:CharacterModifier[]}
export interface Character{schemaVersion:1;id:string;actorType:"PLAYER"|"HISTORICAL_RIVAL"|"FICTIONAL_RIVAL"|"NPC";name:string;avatar:string;archetype:CharacterArchetypeId;traits:[CharacterTraitId,CharacterTraitId];weakness:CharacterWeaknessId;stats:CharacterStats;level:number;xp:number;reputation:number;credits:number;unlockedSkills:CharacterSkillId[]}
