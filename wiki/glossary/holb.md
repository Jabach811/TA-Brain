---
title: "HOLB"
type: glossary
tags: [glossary, loans, p3, takeover-loans]
created: 2026-05-03
updated: 2026-05-03
sources: 1
---

# HOLB

**Full Name:** Highest Outstanding Loan Balance

## Definition

HOLB is the highest outstanding balance a participant's loan has reached over its life. It's used to drive the **hierarchy of loans** when a participant has multiple loans active at once and to determine how repayments are split across those loans.

When uploading [[loan-setup|takeover loans]] in P3, the loan upload screen asks whether a HOLB file exists:

- **HOLB file exists** → upload it directly
- **No HOLB file** → click **Upload and Create**, and P3 derives the HOLB values from the loaded loan data

## Used By

- [[lm-dc]] — handles the HOLB branch on the Takeover Loans upload screen
- [[loan-setup]] — Step 12 (Upload) decision

## See Also

- [[loan-setup]]
- [[informatica-loan-module]]
