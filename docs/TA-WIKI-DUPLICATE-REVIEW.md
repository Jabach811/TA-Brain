# TA Wiki Duplicate Review

Date: 2026-06-25

This is a non-destructive review of likely overlapping pages. No pages are merged, deleted, moved, or marked superseded by this document.

## Recommendation Summary

| Pair | Recommendation | Why |
|---|---|---|
| `concepts/transfer-in-kind` / `processes/tik-transfer` | Merge into `processes/tik-transfer` | `tik-transfer` has the stronger process structure: trigger, steps, handoffs, timing, failure modes. `transfer-in-kind` has useful clarifications and form-field details that should be folded in. |
| `concepts/reversal-process` / `processes/reversal-submission` | Merge into `processes/reversal-submission` | Both describe the same March 6, 2026 reversal process. `reversal-submission` is cleaner procedurally; `reversal-process` has extra evidence/example detail worth preserving. |
| `concepts/loading-eligibility-eds` / `processes/eligibility-loading` | Merge into `processes/eligibility-loading` | Both cover the same EDS eligibility loading procedure. `eligibility-loading` is the better operational page; `loading-eligibility-eds` has detailed field/edit language to fold in. |
| Balance import hub and variants | Keep as a hub-and-spoke set | `balance-import` is a useful overview. `balance-import-cash`, `balance-import-mapping`, and `balance-import-tik` are distinct method pages, not true duplicates. |

## Merge Rules

- Keep process pages as canonical when a pair has both a concept page and a process page for the same workflow.
- Preserve useful detail before retiring any page.
- Add aliases to canonical pages for old slugs.
- Update all incoming links to the canonical page.
- Do not delete old pages in the first merge pass. Convert retired pages to short redirect/alias notes only after approval.

## Proposed Canonical Pages

### TIK / Re-registration

Canonical: `processes/tik-transfer`

Fold in from `concepts/transfer-in-kind`:
- Re-registration form field list
- TIK tracker spreadsheet explanation
- "No dummy participant needed" clarification
- Key clarification bullets around account info, pooled Fidelity accounts, and share matching

Then update links currently pointing to `concepts/transfer-in-kind` where the target means the process.

### Reversal

Canonical: `processes/reversal-submission`

Fold in from `concepts/reversal-process`:
- More explicit "why it matters" explanation
- Reversal form field reference
- March 9, 2026 loan reload example
- Old Plan Correction Checklist retired note

Then update links currently pointing to `concepts/reversal-process` where the target means the current workflow.

### Eligibility Loading

Canonical: `processes/eligibility-loading`

Fold in from `concepts/loading-eligibility-eds`:
- EDS layout requirements
- Data element details
- Eligibility status table
- Processing type table
- Run Eligibility checkbox detail
- Job completion email detail

Then update links currently pointing to `concepts/loading-eligibility-eds` where the target means the current operational workflow.

## Do Not Merge Yet

The following duplicate bare slugs are intentional namespace pairs:

- `roles/com` and `onboarding/com`
- `roles/lm-dc` and `onboarding/lm-dc`
- `concepts/nsa` and `glossary/nsa`
- `concepts/csr` and `glossary/csr`
- `concepts/vef` and `glossary/vef`

They serve different reader jobs and should remain separate unless the navigation model changes.
