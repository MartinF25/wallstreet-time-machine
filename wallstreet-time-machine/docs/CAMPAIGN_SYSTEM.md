# Campaign System

Sprint 2 introduces a registry-driven campaign spanning 18 eras from 1900 to the present. `ERAS` contains spoiler-safe public metadata only. Full events, news, prices, and regimes remain in the episode registry and are queried only for the active episode.

A new career starts in E01 with USD 100,000 and only E01 unlocked. Completing the active era marks it complete and unlocks exactly the next era. The three capital modes are:

- `FULL`: use ending capital, with a USD 1,000 floor.
- `NORMALIZED`: carry half of gains or losses around USD 100,000, capped to the configured band.
- `FIXED`: reset to USD 100,000.

The playable registry contains Panic of 1907, The Great Crash, and Oil Shock. Remaining eras keep campaign order and public teasers but do not manufacture playable historical content.

