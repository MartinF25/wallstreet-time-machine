# Character Progression, Credits & Skill Tree Report

## Summary

The existing Character Foundation now supports permanent Credits, learned Skills and a player-facing progression screen. The active build remains part of `InvestorProfile.character`; campaign cash and Character Credits are separate values and separate APIs.

## Existing Foundation Reused

The sprint reuses the six Character stats, archetypes, traits, weaknesses, `CharacterCard`, Zod schema, XP helpers and `getEffectiveCharacterStats`. No second Character, XP or modifier engine was introduced. The ten legacy Identity archetypes, Era Traits, Perks, Mentors and avatar rules remain unchanged.

## Progression Architecture

`Character` owns `credits` and `unlockedSkills`. This keeps portable Player, Rival and NPC builds in one domain model. UI state only tracks the selected tab and selected Skill; all balances and unlock decisions come from pure domain functions.

## Credits

`awardCharacterCredits`, `canSpendCharacterCredits` and `spendCharacterCredits` validate non-negative integer amounts and return immutable updated Characters. Episode completion awards 250 Credits plus 25 per completed objective. Challenge completion awards 150 Credits plus objective rewards. Cash is never read or changed by these functions.

## XP / Levels

The Foundation XP curve and overflow behavior remain authoritative. Career completion continues to supply Level and XP; the Character mirrors those established values. Skill requirements read the Character Level and do not create another progression counter.

## Skill Tree

Twenty data-driven Skills are registered across Trading, Information, Network, Risk, Reputation and Empire. The categorized UI supports a future graph layout while keeping the current interaction readable on desktop and mobile.

## Skill Definitions

Every definition has category, tier, Credit cost, optional required Level, prerequisites, optional archetype affinity and existing `CharacterModifier` records. Unlocking runs requirement validation, Credit spending and Skill persistence as one immutable operation.

## Archetype Synergies

Speculator and Crisis Trader receive access to Short Specialist. Corporate Raider and Banker receive early access to the small Empire branch. All archetypes still have meaningful paths across the unrestricted categories; affinity does not lock the complete tree.

## Modifier Integration

`getCharacterModifiers` returns modifiers in a stable order: Traits, Weakness, then unlocked Skills in saved order. `getEffectiveCharacterStats` applies Add/Multiply operations in that order and clamps final stat values to 0–100. Skills with Trait-like names represent learned development and stack with the starting personality.

## CharacterCard Changes

Credits and owned-Skill count are optional through `showProgression`. Player progression enables them; Rival and NPC use remains unchanged.

## Save / Migration

Save version 3 remains valid because the change is additive. Existing Characters receive `credits = 0` and `unlockedSkills = []` through `upgradeCharacterProgression`. Identity, stats, archetype, traits, weakness, Level and XP remain intact. Zod rejects unknown or duplicate Skill IDs.

## Legacy Compatibility

Legacy Characters still use the Foundation mapper. The old ten-archetype Identity catalog is untouched and continues to serve agents, reactions, avatar presentation and legacy calculations.

## Tests

The suite covers Credits award/spend/failure, all Skill requirement branches, atomic unlocks, Trait/Weakness/Skill composition, clamping, valid persistence, missing-progression migration and invalid Skill IDs. Existing Character Creator, Identity, Campaign and trading tests remain green.

## Browser Verification

The mobile flow was checked from Character creation through profile navigation, Credits display, locked/available/owned Skill states, unlock, reload and persisted effective stats.

## Quality Gates

- Typecheck: PASS
- Lint: PASS
- Tests: PASS
- Production Build: PASS

## UI / Game Experience Compliance

- Character HUD: PASS — the Profile opens with Character identity and build.
- Investment Visibility: PASS — no trading screen was altered.
- Round Action: PASS — trading actions remain unchanged.
- Game Feel: PASS — restrained status, Credit and unlock feedback uses the historical visual language.
- Responsive: PASS — tabs, categorized Skills and detail panel collapse to one column.
- Accessibility: PASS — tab state, disabled unlock states, labels and status feedback are exposed without relying only on color.

## Open Points

Office and Branch Skills currently affect Character stats only. Office Hub, expansion, employees and financial-house systems remain intentionally deferred. The next planned sprint is Information & Rumor Engine.
