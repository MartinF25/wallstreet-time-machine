# Event System

Historical events are episode data with a date, category, severity, provenance label, affected markets, and optional delayed historical context. `getAvailableEvents(currentDate)` is the only display boundary. Context is independently gated by `historicalContextAvailableFrom`.

The Great Crash dataset covers credit expansion, speculation, weakening production, the October 1929 breaks, contraction, banking and international stress, depression lows, the 1933 banking emergency, and stabilization. Reconstructed news uses the same date boundary and is explicitly labeled.
