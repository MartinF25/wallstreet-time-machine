# Historical Data Architecture

The pipeline is fetch → validate → normalize → classify → cache → date-filter → game. Raw provider payloads never enter the engine. Normalized observations retain observation, release, availability, vintage, provenance, quality, and `DataType`. Careers pin `historicalDatasetVersion`; external updates cannot silently change an ongoing run.

The current minimal storage is versioned JSON manifests plus curated TypeScript content. A database is unnecessary for three compact episodes. `data/raw` ignores provider payloads, while approved normalized snapshots may be reviewed independently.
