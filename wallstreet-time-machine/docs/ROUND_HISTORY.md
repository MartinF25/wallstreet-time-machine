# Round History

Every completed round stores a compact `RoundSummaryRecord`: starting and ending portfolio, P&L and return, long/short contribution, fees, borrow fees, cash change, and decision IDs. It avoids copying full portfolio state and supports the Last Round and future recap views.
