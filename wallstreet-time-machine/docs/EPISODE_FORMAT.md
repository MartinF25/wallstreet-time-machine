# Episode Format

An `Episode` defines identity, dates, capital, currency, granularity, narrative summary, asset IDs, objectives, events, news, regime windows, difficulty, data type, and completion rules. `great-crash` runs in weekly rounds from 1928 through 1933.

Assets separately define class, sector, quote currency, unit, description, and availability dates. This keeps episode configuration independent from market generation.

## Sprint 2 fields

Episodes may declare `eraId`, `crisisWindows`, and `specialRules`. Round granularity accepts `DAY`, `WEEK`, or `MONTH`. A crisis window overrides the base granularity only while the current date lies within its range.
