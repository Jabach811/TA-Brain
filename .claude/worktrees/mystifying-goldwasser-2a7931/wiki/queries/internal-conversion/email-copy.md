---
title: "Copy Email / Secure-Data Records"
type: analysis
tags: [query, sql, internal-conversion, email, ee-secure-data, password]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion]
aqt-parameters: []
tables: [PENSION.EE_SECURE_DATA]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Copy Email / Secure-Data Records

Single-statement INSERT that copies `PENSION.EE_SECURE_DATA` rows from the old case to the new case, excluding any SSNs that already have a secure-data row on the target.

> [!warning]
> Writes PII / auth data (password hashes, security answers, email addresses) into the new case. Confirm the **encrypted** password text is the column copied (`PSW_ENCRYPT_T`) — do not hand-edit.

## Purpose

`PENSION.EE_SECURE_DATA` holds participant online-access credentials: encrypted password, mother's maiden name, security-question status, email address, privacy acceptance. When a plan internally converts, these must follow the participant so they can continue to log in to the participant website without resetting their password or re-accepting privacy terms.

## When to Run

Post-load, once new-case participant indicatives are established. Before the communications team sends any conversion notifications that contain web-login instructions.

## Parameters

Hardcoded:
- **New case**: `JK62250   00001`
- **Old case**: `QK62132   00001`

Update both before running.

## Notes

- Anti-join (`NOT IN ... where case_no='JK62250   00001'`) avoids duplicating rows if the copy has been partially run before.
- Columns explicitly listed in the INSERT so new columns added to `EE_SECURE_DATA` later won't silently break the copy.
- `PKG_ID` carries forward from the source — confirm this is the right behavior for the conversion (some conversions require `PKG_ID` to be rewritten to the new case's package).

## Tables Used

- `PENSION.EE_SECURE_DATA` — both source (WHERE) and target (INSERT).

## SQL

```sql
insert into pension.ee_secure_data
( PKG_ID, CASE_NO, SOC_SEC_NO, MOTHERS_MAIDEN_NM, LAST_MOD_DT, PASS_WORD, PSW_STAT_CD, PSW_EXP_DT, PSW_EXP_FREQ_CD, CONF_STAT_CD, CONF_PROCESS_DT, EMAIL_ADDR_NM, PASSWORD_HINT_TXT, CUSTOMER_SIGNIN_I, PSW_ENCRYPT_T, PRIVACY_ACCEPT_C)

select PKG_ID, 'JK62250   00001', SOC_SEC_NO, MOTHERS_MAIDEN_NM, LAST_MOD_DT, PASS_WORD, PSW_STAT_CD, PSW_EXP_DT, PSW_EXP_FREQ_CD, CONF_STAT_CD, CONF_PROCESS_DT, EMAIL_ADDR_NM, PASSWORD_HINT_TXT, CUSTOMER_SIGNIN_I, PSW_ENCRYPT_T, PRIVACY_ACCEPT_C

from pension.ee_secure_data
where case_no='QK62132   00001'
and soc_Sec_no not in (select soc_sec_no from pension.ee_secure_data where case_no='JK62250   00001')
```

## Output / What to Look For

After running, SELECT COUNT(*) on new-case `EE_SECURE_DATA` should equal old-case count minus any pre-existing SSNs.

## Related Queries

- [[estatement-copy]]
- [[saveexpress-copy]]

## See Also

- [[internal-conversion]]
- [[participant-online-access]]
