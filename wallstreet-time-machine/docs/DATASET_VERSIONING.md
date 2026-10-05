# Dataset Versioning

Every career archive stores `historicalDatasetVersion`. The approved manifest records import time, providers, series, errors, and fallback use. A new approved snapshot receives a new immutable version. Existing careers keep their pinned version; new careers use the current approved version.

Commands: `npm run data:status`, `npm run data:validate`, and `npm run data:import`. Import deliberately refuses to invent or bundle external rows without approved provider configuration.
