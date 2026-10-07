import{z}from"zod";import{CHARACTER_STAT_KEYS}from"./models";
export const CharacterArchetypeSchema=z.enum(["SPECULATOR","VALUE_INVESTOR","NETWORKER","CRISIS_TRADER","CORPORATE_RAIDER","BANKER"]);
export const CharacterTraitSchema=z.enum(["TAPE_READER","CONTRARIAN","CALCULATED_RISK","NETWORK_BUILDER","DEEP_RESEARCH","FAST_OPERATOR","NEGOTIATOR","MARKET_HISTORIAN"]);
export const CharacterWeaknessSchema=z.enum(["OVERCONFIDENT","IMPATIENT","RISK_AVERSE","REPUTATION_SENSITIVE","INFORMATION_ADDICT","LEVERAGE_HABIT"]);
const score=z.number().int().min(0).max(100),stats=z.object(Object.fromEntries(CHARACTER_STAT_KEYS.map(k=>[k,score]))as Record<typeof CHARACTER_STAT_KEYS[number],typeof score>);
export const CharacterSchema=z.object({schemaVersion:z.literal(1),id:z.string().min(1),actorType:z.enum(["PLAYER","HISTORICAL_RIVAL","FICTIONAL_RIVAL","NPC"]),name:z.string().trim().min(1).max(30),avatar:z.string().min(1),archetype:CharacterArchetypeSchema,traits:z.tuple([CharacterTraitSchema,CharacterTraitSchema]).refine(([a,b])=>a!==b,"Traits must be unique"),weakness:CharacterWeaknessSchema,stats,level:z.number().int().min(1),xp:z.number().int().min(0),reputation:score});
