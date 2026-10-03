# Savegame Schema

Browser storage key: `wallstreet-time-machine:save:v1`.

The stored envelope contains `schemaVersion: 1` and the full `GameState`: identity, episode, status, date, round, seed, cash, positions, portfolio metrics, trades, snapshots, prices, and timestamps. Browser data is checked before use. Invalid or unsupported saves are ignored safely.

`migrateSavegame` is the future migration boundary. Version 1 passes through after validation; there are no fabricated legacy migrations.
