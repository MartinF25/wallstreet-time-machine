# Short Selling

SHORT opens a borrowed position; COVER closes it partially or fully. Proceeds remain restricted and initial margin is removed from available cash into collateral. Portfolio equity equals available cash + long value + collateral + restricted proceeds − short liability. This prevents free spending of sale proceeds.

Cover P&L is `(entry − cover) × quantity − transaction fees − allocated borrow fees`. Losses can exceed collateral. Order validation checks episode availability, closures, strategy permission, shortability, borrow availability, dated bans, quantity, and margin.
