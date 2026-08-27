# ShipToFix

**Check a GSTIN before the e-way bill.** One wrong character rejects the bill and holds the truck at the gate. Paste a GSTIN, get pass/fail plus exactly what to fix — in under a second.

🔗 Live tool: https://shivamkumarsehagal-web.github.io/shiptofix/

## What it does

**One GSTIN.** Paste it, get a verdict. A pass decodes the number back at you — state, PAN, entity number. A failure names the one thing that is wrong: the character that should have been a `Q` and isn't, the state code that doesn't exist, the count that came to 14 instead of 15.

**A whole register.** Drop in an Excel or CSV export of your invoices. The columns are matched to the fields that matter, every row is checked, and each problem comes back in plain words against its invoice number — Ship-to GSTIN missing where the goods go somewhere else, a GSTIN whose state code contradicts the Ship-to state, a PIN that belongs to a different state than the row claims. Click a marked cell to correct it and the row re-checks as you type.

**Take it back out.** Download the corrected file in the format you brought, or a separate problem list as CSV to work through offline.

Every message is available in English and Hindi.

## Why it's safe to use

Nothing you paste ever leaves your browser tab. Zero network requests after load — verifiable in DevTools → Network. Works offline after the first visit. No login, no uploads, no server.

There is no backend to breach because there is no backend. Open the Network tab, run a whole register through it, and watch nothing happen.

## Ownership

Proprietary — see [LICENSE](LICENSE). This repository publishes only the minified production build. Sources, tests, and datasets are kept private. Copies, mirrors, and rebrands are prohibited and enforceable.

## Roadmap

- ✅ **Milestone 1** — single GSTIN checker
- ✅ **Milestone 2** — batch import with a plain-English results table (Excel and CSV live; Tally XML in final testing)
- ✅ **Milestone 3** — corrected export back to your format, plus a problem-list CSV

---

© 2026 ShipToFix. All rights reserved.
