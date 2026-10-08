# Global Expansion Foundation Report

## Implemented scope

This sprint adds a data-driven international expansion layer to the existing Office hub. New York remains the permanent headquarters. London, Frankfurt, Zurich, Paris, Chicago, Tokyo, and Hong Kong are modeled as branch locations with historical availability, era-aware specialties, opening costs, progression requirements, and scoped strategic modifiers.

The Office World Map now opens the Global Expansion view. Desktop uses a layered strategic map with selectable financial centers; mobile uses compact center cards and the same detail panel. The Headquarters status strip reports the active global network.

## Domain and rules

`src/game/expansion` contains the registry, models, schema, and service layer. `canOpenBranch` evaluates year, office level, character level, reputation, skills, cash, credits, existing branches, headquarters identity, and duplicate activation. `openBranch` validates first and returns a new expansion state plus the remaining cash and credits, leaving all inputs unchanged when validation fails.

Opening a branch creates a level-one active branch with its opening year and round. Modifiers improve bounded access, research, regional insight, reputation opportunity, or rumor freshness. No branch reveals an information item's hidden truth state and no branch grants perfect information.

The current sprint implements branch opening only. Branch upgrades, closure, staffing, foreign exchange accounting, operational overhead, and a full office economy remain prepared by the model but are outside this scope.

## Historical presentation

Each center defines its first available year and financial specialties. London changes from government bonds, international trade, commodities, and foreign securities in early eras to Eurobonds and investment banking after 1980, then global capital markets and asset management after 2000. Tokyo and Hong Kong use period-appropriate early specialties. The current career era supplies the year when no episode is active.

## Persistence and migration

V3 saves now contain `expansionState`. Fresh careers start with New York headquarters and no branches. Older V3 saves receive that default additively. Valid branch progress survives migration; malformed states, headquarters duplication, and duplicate center branches are rejected by Zod and migrate to the safe default.

Branch purchases update the active episode's cash when a session is active, otherwise career capital, and deduct Character credits in the same committed save update.

## Tests and verification

Automated coverage verifies the complete center registry, headquarters default, era availability, era-specific specialties, individual progression gates, dependency requirements, duplicate prevention, exact resource deductions, atomic failure behavior, active modifiers, schema rejection, fresh-career state, and migration preservation.

## UI compliance

The implementation follows `wallstreet-game-ui.md`: it reuses the established dark historical command-center palette, typography, button language, status strips, portrait component, spacing, borders, responsive breakpoints, and existing Office navigation. The map is CSS-based and layered; it adds no 3D, WebGL, modern early-era terminal imagery, parallel navigation shell, or duplicated market, information, rival, portfolio, or character screen.
