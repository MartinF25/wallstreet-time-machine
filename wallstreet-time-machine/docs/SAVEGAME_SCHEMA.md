# Savegame Schema

The Deals & Corporate Finance Foundation adds `dealState` to V3. It stores generated opportunities accepted into the archive, active mandates and assigned team IDs, preparation progress, completed/failed outcomes, fee history, and the episode/round processing guard. Older saves receive an empty pipeline. Duplicate or malformed deals, invalid amounts, progress, statuses, roles, and division references are rejected and normalized safely.

The Employees & Leadership Foundation adds `workforce` to the additive V3 archive. It stores hired employees, their compact skills, salary obligation, loyalty, reputation, location/division assignment, management responsibility, and status. Candidate pools remain deterministic registry data. Older saves receive an empty workforce, so existing divisions continue without a staffing penalty; malformed or duplicate employee/manager records fall back safely.

The Financial House Foundation adds `financialHouse` to the additive V3 archive. It stores the house identity, New York headquarters reference, founded year, independent house level, prestige, global division instances, and local division assignments. Existing saves derive a default house name from the investor name and receive active Level 1 Trading assigned to New York. Zod rejects malformed names, levels, duplicate divisions, duplicate assignments, assignments to unopened divisions, and divisions opened before their historical availability.

The Global Expansion Foundation adds `expansionState` to the additive V3 archive. New and migrated careers use New York as their headquarters and start without branches. Each branch stores a unique financial-center ID, active status, level, opening round and year, and future upgrade IDs. Invalid or duplicate branch records fall back to the safe initial expansion state during migration.

The Office / Headquarters Foundation adds `officeState` to the additive V3 archive. It stores the office level, unlocked zone IDs, and future upgrade IDs. Existing V3 saves migrate to a Level 1 Broker Office with Desk, Market Board, Newspaper, Telephone, Research, Character, and World Map zones unlocked; branch eligibility remains governed by the expansion requirements and Deals remain locked.

The Opening / Closing Bell Experience adds the optional top-level `roundExperience` state to archive version 3. It stores the current session phase (`PRE_MARKET`, `OPENING`, `TRADING`, `CLOSING`, `SUMMARY`, or `OVERNIGHT`), the processed round guard, and the immutable closing snapshot used by summary and overnight screens. Reloading therefore resumes the exact session without advancing the market or reprocessing rivals, information expiry, XP, or rewards. Older active v3 episodes migrate to `TRADING`; saves without an active episode use `null`.

Sprint 5.6 adds episode-local `decisionHistory`, `decisionOutcomes`, `assetPriceHistory`, and `roundHistory`. Migration initializes missing collections and seeds only the current known simulated price; it never invents prior HOLD decisions.

Sprint 5 keeps archive version 3 and adds `historicalDatasetVersion`, short positions, borrow fees, margin state, margin calls, forced-cover counters, and advanced exposure limits. Migration supplies safe zero-value defaults and preserves prior cash, long positions, trades, and identity data.

Sprint 4.6 adds `eraIdentityState` to v3 with visual unlocks, immutable era memories, career badges, visual settings, and optional legacy portrait configuration. Older v3 saves receive safe defaults.

Sprint 4.5 extends v3 with `investorProfile`, `characterHistory`, and optional `investorLegacy`. Existing careers receive a pending setup profile during migration; their financial and campaign state remains untouched.

Schema v3 now defaults and migrates `agentSettings`, `agentAnalyses`, `agentSignalHistory`, `agentDisagreements`, and `agentMemory`. Analysis and signal collections are bounded; each desk retains at most 20 prior analyses in memory.

Browser storage key: `wallstreet-time-machine:save:v3`. The former v2 key is read as a migration source.

The embedded episode state retains its schema version 2 shape, including strategy profile/history, risk alerts, seen event/news IDs, objectives, fees, regime, sentiment, benchmark snapshots, and the latest briefing.

`migrateSavegame` upgrades Foundation v1 saves without losing cash, positions, trades, date, or history. New fields receive safe defaults and the old key is removed after a successful v2 save.

## Version 3 archive

The application archive contains `career`, `activeEpisode`, `episodeSaves`, `challengeSaves`, `achievements`, `stats`, and `settings`. Embedded episode states retain schema version 2. A prior v2 wrapper is imported into `activeEpisode` and `episodeSaves` as a standalone game.

Sprint 3 extends the same v3 archive with `watchlist`, `playerNotes`, `acknowledgedAlerts`, `intelligenceAlerts`, `seenIndicatorReleases`, and the persistent Intelligence Detail preference. Existing v3 saves receive defaults during migration.
# Character Foundation

`investorProfile.character` enthält seit der Character Foundation das validierte Character-Modell mit Archetyp, zwei Traits, Weakness, sechs Basiswerten, Level, XP und Reputation. Ältere Saves mit `schemaVersion: 3` werden beim Laden additiv ergänzt; deshalb war keine neue Top-Level-Schemaversion erforderlich.

Character Progression ergänzt darin `credits` und `unlockedSkills`. V3-Saves ohne diese Felder erhalten 0 Credits und eine leere Skill-Liste. Unbekannte oder doppelte Skill-IDs werden nicht als gültiger Character akzeptiert.

Die Information & Rumor Engine ergänzt `information` als additiven V3-Zustand. Gespeichert werden verfügbare und erworbene Items, interne Truth States, Investigation-Fortschritt, enthüllte Details und Lifecycle-Status. Alte V3-Saves erhalten einen leeren Information State; neue Careers erhalten kuratierte Seed-Items.

Rival Investors ergänzen `rivals` additiv. Der Zustand umfasst Rival-IDs, Character, Strategie, Kapital, Cash, Positionen, privates Wissen, versteckte Ziele, Status und Activity History. Alte V3-Saves erhalten deterministisch die für 1900 verfügbare Rival-Besetzung.

