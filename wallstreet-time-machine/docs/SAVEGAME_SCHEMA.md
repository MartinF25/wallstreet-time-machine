# Savegame Schema

Browser storage key: `wallstreet-time-machine:save:v2`.

The stored envelope contains `schemaVersion: 2` and the full `GameState`, including strategy profile/history, risk alerts, seen event/news IDs, objectives, fees, regime, sentiment, benchmark snapshots, and the latest briefing. Zod checks browser data before use.

`migrateSavegame` upgrades Foundation v1 saves without losing cash, positions, trades, date, or history. New fields receive safe defaults and the old key is removed after a successful v2 save.
