# Price History

Each episode starts with one `AssetPricePoint` per available asset and appends one point after every completed round. Simulated episodes label every point `SIMULATED`; provider-backed series can retain `HISTORICAL` or `RECONSTRUCTED`. Selectors expose known points by date, round count, date range, latest point, and 1W/1M/3M/1Y/ERA windows. Duplicate asset/round keys are rejected by construction.
