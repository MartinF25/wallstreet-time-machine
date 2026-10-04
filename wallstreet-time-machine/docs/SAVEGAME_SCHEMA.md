# Savegame Schema

Sprint 4.6 adds `eraIdentityState` to v3 with visual unlocks, immutable era memories, career badges, visual settings, and optional legacy portrait configuration. Older v3 saves receive safe defaults.

Sprint 4.5 extends v3 with `investorProfile`, `characterHistory`, and optional `investorLegacy`. Existing careers receive a pending setup profile during migration; their financial and campaign state remains untouched.

Schema v3 now defaults and migrates `agentSettings`, `agentAnalyses`, `agentSignalHistory`, `agentDisagreements`, and `agentMemory`. Analysis and signal collections are bounded; each desk retains at most 20 prior analyses in memory.

Browser storage key: `wallstreet-time-machine:save:v3`. The former v2 key is read as a migration source.

The embedded episode state retains its schema version 2 shape, including strategy profile/history, risk alerts, seen event/news IDs, objectives, fees, regime, sentiment, benchmark snapshots, and the latest briefing.

`migrateSavegame` upgrades Foundation v1 saves without losing cash, positions, trades, date, or history. New fields receive safe defaults and the old key is removed after a successful v2 save.

## Version 3 archive

The application archive contains `career`, `activeEpisode`, `episodeSaves`, `challengeSaves`, `achievements`, `stats`, and `settings`. Embedded episode states retain schema version 2. A prior v2 wrapper is imported into `activeEpisode` and `episodeSaves` as a standalone game.

Sprint 3 extends the same v3 archive with `watchlist`, `playerNotes`, `acknowledgedAlerts`, `intelligenceAlerts`, `seenIndicatorReleases`, and the persistent Intelligence Detail preference. Existing v3 saves receive defaults during migration.
