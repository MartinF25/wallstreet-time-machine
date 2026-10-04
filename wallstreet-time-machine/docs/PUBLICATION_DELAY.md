# PUBLICATION DELAY

Publication delay rules support daily, weekly, monthly, and custom schedules. Visibility requires both releaseDate and availableFrom to be no later than currentDate. New releases use previousRoundDate < availableFrom <= currentDate, so monthly rounds retain every intervening release.
