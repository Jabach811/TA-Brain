---
title: "Takeover Loan Query Build"
type: analysis
tags: [query, sql, internal-conversion, loan, takeover, loan-detail, aqt-setparm]
used-by-role: [lm-dc, cts]
used-in-process: [internal-conversion, loan-takeover]
aqt-parameters: [CASE, Business_line, NOT_THESE_AFFILIATES]
tables: [CORP.LOAN_DETAIL, CORP.LOAN_REPAYMENT, CORP.LOAN_HISTORY, PENSION.LOAN_REPAY_SRC, PENSION.LOAN_DEF_SRC, PENSION.PLAN_PROV_GRP]
systems: [p3, aqt]
created: 2026-04-17
updated: 2026-04-17
sources: 1
---

# Takeover Loan Query Build

Builds the new-case takeover loan record per outstanding loan on the old case — initial amount, original date, repayment frequency and amount, principal due, deemed-distribution status, blended rate, maturity, loan type, loan duration.

## Purpose

When an internal conversion includes active loans, each loan is "taken over" on the new case with a single set of canonical fields. This query assembles that set from multiple sources: `LOAN_DETAIL` (primary), `LOAN_HISTORY` (original-issue amounts where SEQ_N=0), `LOAN_REPAY_SRC` (paid-amount-to-date), and `LOAN_DEF_SRC` (defaulted amounts) — then picks the maximum across available `init_ln_amt` sources and computes loan duration from dates.

## When to Run

Pre-liquidation, once the outgoing-plan loan portfolio is stable. Run together with [[takeover-loan-sources]] to get the fund-source split for each loan.

## Parameters

Uses AQT SETPARM:

| Parameter | Example | Meaning |
|---|---|---|
| `CASE` | `932339` | 6-char case stem (old case) |
| `Business_line` | `CORP` | Schema prefix — `CORP` or `TDA` |
| `NOT_THESE_AFFILIATES` | `'ABCDE'` | Comma-separated quoted sub-ID list to exclude (placeholder sub-IDs) |

## Notes

- `init_ln_amt` resolution uses a three-way CASE: initial (from LOAN_HISTORY), init_tkovr_ln_amt (from LOAN_DETAIL if this is a nested takeover), init_ln_amt (LOAN_DETAIL) — picks the maximum.
- `ORIGINAL_LN_DT` formatting: if `SRC_CD = 'T'` (takeover-sourced), use `INIT_TKOVR_EFF_DT`; otherwise format `ORIG_LN_ISS_DT` as MM/DD/YYYY.
- `principal_due` = `init_ln_amt` minus `paid_amt` from `LOAN_REPAY_SRC`.
- `deemed_date` and `deemed_amount` populated only when a deemed distribution has occurred (`LN_DEEMED_DEF_DT` / `LOAN_DEF_SRC` non-null).
- `loan_purpose`: `LN_TYP_RQST_C = '2'` → PRIMARY RESIDENCE, else GENERAL PURPOSE.
- `LOAN_DURATION` derived from date arithmetic when `INIT_LN_TERM_YR_CT` is missing for takeover-sourced loans; capped at 5.00 for general-purpose loans (`LN_TYP_RQST_C IN (1,3)`).
- Exclusion filter: not-refinanced (`REFI_LOAN_NO IS NULL`), remaining principal > 0 (with a 0.02 tolerance for status='1' final-payment rounding), not-in-terminal-status (`LN_TR_STAT_CD NOT IN ('4','E','3','7','5','1')`).

## Tables Used

- `$Business_line.LOAN_DETAIL` — primary loan row.
- `$Business_line.LOAN_REPAYMENT` (aliased via `last_amort_date` CTE) — most recent amortization date for status='1' loans.
- `$Business_line.LOAN_HISTORY` — SEQ_N=0 row for original loan amount.
- `PENSION.LOAN_REPAY_SRC` (via `repayments` CTE) — total principal paid by loan.
- `PENSION.LOAN_DEF_SRC` — defaulted amount by loan + tr_ref_no.
- `PENSION.PLAN_PROV_GRP` — case scope (RELATED_GRP_TYP_C IN (361,12)).

## SQL

```sql
--AQT SETPARM,PARM=CASE,VALUE="932339"
--AQT SETPARM,PARM=Business_line,VALUE="CORP"
--AQT SETPARM,PARM=NOT_THESE_AFFILIATES,VALUE="'ABCDE'"


with repayments as
(select enrl_prov_grp_i, loan_no, soc_Sec_no, sum(LN_PRNC_A) as paid_amt from pension.loan_repay_src
where ENRL_PROV_GRP_I in (select ENRL_PROV_GRP_I from pension.plan_prov_grp where account_no like '$CASE%' )

group by enrl_prov_grp_i, loan_no, soc_Sec_no),

last_amort_date as
(select case_no, loan_no, soc_Sec_no, max(CAST(SUBSTR(LN_AMORTIZATION_DT, 1, 4) || '-' || SUBSTR(LN_AMORTIZATION_DT, 5, 2) || '-' || SUBSTR(LN_AMORTIZATION_DT, 7, 2) AS DATE)) as loan_amort
from $Business_line.loan_repayment
where case_no like '$CASE%'
and (LN_REPAY_STAT_CD='1' )
group by case_no, loan_no, soc_sec_no)

select ' ' as case_no, ' ' as sub_id , a.SOC_SEC_NO , a.LOAN_NO ,
case
when init_tkovr_ln_amt>init_ln_amt and init_tkovr_ln_amt>coalesce(initial_ln_amt,0) then init_tkovr_ln_amt
when coalesce(initial_ln_amt,0)>init_ln_amt and coalesce(initial_ln_amt,0)>init_tkovr_ln_amt then coalesce(initial_ln_amt,0)
else INIT_LN_AMT end as init_ln_amt , 
 CASE 
WHEN A.SRC_CD='T' THEN INIT_TKOVR_EFF_DT
ELSE SUBSTR(a.ORIG_LN_ISS_DT,5,2)||'/'||SUBSTR(A.ORIG_LN_ISS_DT,7,2)||'/'||SUBSTR(ORIG_LN_ISS_DT,1,4) END AS ORIGINAL_LN_DT , a.LN_REPAY_FREQ_CD , a.LN_REPAY_AMT ,
 case
when coalesce(initial_ln_amt,0)>init_ln_amt  then coalesce(initial_ln_amt,0)
else INIT_LN_AMT end-coalesce(paid_amt,0) as principal_due,
 case
when CHAR(LN_DEEMED_DEF_DT,USA) is null then ''
else CHAR(LN_DEEMED_DEF_DT,USA) end as deemed_date,
coalesce(DEFAULTED_AMT,0) as deemed_amount,a.BAS_BLENDED_LN_PCT, substr(a.FINAL_LN_REPAY_dt,1,4)||'-'||substr(a.FINAL_LN_REPAY_dt,5,2)||'-'||substr(a.FINAL_LN_REPAY_dt,7,2) as maturity_date,

 CASE 
			WHEN LN_TYP_RQST_C = '2'
				THEN 'PRIMARY RESIDENCE'
			ELSE 'GENERAL PURPOSE'
			END as loan_purpose,


CASE
WHEN a.SRC_CD = 'T' AND (INIT_LN_TERM_YR_CT IS NULL OR INIT_LN_TERM_YR_CT = 0)
THEN
                (
CASE
WHEN LN_TYP_RQST_C IN (1,3)
THEN
                (
CASE
WHEN DECIMAL(DECIMAL(DAYS(DATE(SUBSTR(a.FINAL_LN_REPAY_DT,1,4)||'-'||SUBSTR(a.FINAL_LN_REPAY_DT,5,2)||'-'||SUBSTR(a.FINAL_LN_REPAY_DT,7,2))) -
DAYS(ORIG_LN_ISS_Dt))/365.25,5,2) >5.00
THEN 5.00
ELSE DECIMAL(DECIMAL(DAYS(DATE(SUBSTR(a.FINAL_LN_REPAY_DT,1,4)||'-'||SUBSTR(a.FINAL_LN_REPAY_DT,5,2)||'-'||SUBSTR(a.FINAL_LN_REPAY_DT,7,2))) -
DAYS(ORIG_LN_ISS_Dt))/365.25,5,2) END)
ELSE DECIMAL(DECIMAL(DAYS(DATE(SUBSTR(a.FINAL_LN_REPAY_DT,1,4)||'-'||SUBSTR(a.FINAL_LN_REPAY_DT,5,2)||'-'||SUBSTR(a.FINAL_LN_REPAY_DT,7,2))) -
DAYS(ORIG_LN_ISS_Dt))/365.25,5,2) END)
WHEN a.SRC_CD = 'T' AND INIT_LN_TERM_YR_CT > 0
THEN INIT_LN_TERM_YR_CT
WHEN a.SRC_CD <> 'T'
THEN DECIMAL(ROUND(DECIMAL(a.LOAN_TERM_MTH_CT) / DECIMAL(12),2),5,2)
END LOAN_DURATION,' ' as NPER, ' ' as pays_to_load,' ' as first_pay_dt,
coalesce (cast(loan_amort as varchar), substr(ORIG_LN_ISS_DT,1,4)||'-'||substr(orig_ln_iss_dt,5,2)||'-'||substr(orig_ln_iss_dt,7,2)) as last_amort_date,  '' as calc_RATE,substr(a.case_NO,1,instr(a.case_no,' ')-1) as old_cont,SUBSTR(a.CASE_NO,11,5) as old_sub_id
from $Business_line.LOAN_DETAIL a
left join repayments b on b.loan_no=a.loan_no and b.soc_Sec_no=a.soc_Sec_no
left join last_amort_date c on c.loan_no=a.loan_no and c.soc_Sec_no=a.soc_Sec_no
left join $Business_line.loan_history d on a.loan_no=d.loan_no and d.SEQ_N=0
LEFT JOIN (
					SELECT 
					LOAN_NO, TR_REF_NO, SUM(LOAN_DEF_A) DEFAULTED_AMT
					FROM PENSION.LOAN_DEF_SRC A
					JOIN PENSION.PLAN_PROV_GRP B ON A.ENRL_PROV_GRP_I = B.ENRL_PROV_GRP_I
						AND RELATED_GRP_TYP_C IN (361,12)
					GROUP BY LOAN_NO, TR_REF_NO
					) LD ON a.LOAN_NO = LD.LOAN_NO 
						AND a.WD_TR_REF_NO = LD.TR_REF_NO
						
where a.case_no like '$CASE%'
and substr(a.case_no,11,5) not in ($NOT_THESE_AFFILIATES)

and REFI_LOAN_NO is null
AND ((init_ln_amt-coalesce(paid_amt,0)>0 and LN_TR_STAT_CD NOT IN ('4', 'E','3','7','5','1')) or (init_ln_amt-coalesce(paid_amt,0)>.02 and LN_TR_STAT_CD ='1'))

order by 2
```

## Output / What to Look For

One row per active loan with new-case placeholder `case_no` / `sub_id` columns. Columns include NPER / pays_to_load / first_pay_dt / calc_RATE as blank placeholders — these are filled in later by the loan setup team.

## Related Queries

- [[takeover-loan-sources]] — complementary source-level breakdown for same loans
- [[highest-loan-balance]] — HOLB 12-month scan
- [[internal-conversion-base]] — section 11 has a simpler loan extract

## See Also

- [[internal-conversion]]
- [[loan-takeover]]
- [[loan]]
