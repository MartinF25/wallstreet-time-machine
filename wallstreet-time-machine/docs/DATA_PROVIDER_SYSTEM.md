# Data Provider System

`HistoricalDataProvider` standardizes metadata, observations, point/range lookup, latest-known lookup, optional vintage lookup, price history, and health. World Bank and ECB adapters perform real HTTP normalization. FRED/ALFRED is key-gated and inactive; Alpha Vantage remains inactive pending a commercial plan and redistribution review. Provider chains fall back to curated reconstructed data and deterministic simulation.

External calls belong in build/admin or server workflows. API keys are server-only environment values. Missing optional credentials degrade the provider and never stop the game.
