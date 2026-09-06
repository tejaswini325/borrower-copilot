# Borrower Copilot — RULES.md

> Version 1.0 · 2 Sep 2026 challenge implementation. Transparent self-assessment, not lender underwriting.

| What | Value | Why | Source / judgement |
|---|---:|---|---|
| Lender-like FOIR, salaried | 45% | Indicative upper affordability boundary | My judgement; prototype assumption |
| Lender-like FOIR, self-employed | 40% | Allows for higher income variability | My judgement |
| Lender-like FOIR, informal/gig | 35% | Wider income uncertainty | My judgement |
| Safe FOIR, salaried | 35% | Borrower-first buffer | My judgement |
| Safe FOIR, self-employed | 30% | More headroom for variability | My judgement |
| Safe FOIR, informal/gig | 25% | Stronger buffer for volatile income | My judgement |
| Minimum post-outflow income floor, unsecured | 20% of net income | Avoids treating all residual cash as safely disposable | My judgement |
| Minimum post-outflow income floor, secured with documented collateral | 10% of net income | Pledged/implicit collateral (LAP with a stated value, or gold/home) reduces reliance on monthly cash cushion, so the safety buffer can be smaller without collapsing affordability to zero for otherwise-solvent borrowers | My judgement |
| Credit score 750+ | +5 pp lender-like FOIR; −0.75 pp rate | Known strong score reduces uncertainty | My judgement |
| Unknown score | No score penalty; +0.5–1.5 pp rate | Unknown is not a bad score | Brief requirement + judgement |
| Score <650 | −8 pp lender-like FOIR; +3–5 pp rate | Higher-risk proxy | My judgement |
| Recent bounce | −7 pp lender-like FOIR; −5 pp safe FOIR; +2–4 pp rate | Signals repayment stress | My judgement |
| Savings 6+ months | +8% safe FOIR | More shock resilience | My judgement |
| Savings 1–2 months | −10% safe FOIR | Smaller buffer | My judgement |
| Savings <1 month | −20% safe FOIR | Strongest affordability caution | My judgement |
| Highly variable income | −5 pp lender-like FOIR; +1–2 pp rate; −10% safe FOIR | Wider uncertainty | My judgement |
| Personal salaried fair rate | 10.5–13% before profile adjustments | Illustrative unsecured band | My judgement; not live pricing |
| Personal self-employed fair rate | 12–17% | Illustrative band | My judgement |
| Informal/gig unsecured | 15–22% | Higher uncertainty | My judgement |
| Secured/LAP/gold/home | 9–12.5% | Secured route generally lower-risk than unsecured | My judgement; not lender quote |
| Business/productive route | 10.5–14% | Product purpose can affect pricing | My judgement |
| Processing fee default | 2% personal; 1.5% secured/business | Needed to expose all-in cost | My judgement |
| Estimated APR display | headline rate + fee/3 | Simple prototype comparison proxy | My judgement; production must calculate from actual cash flows |
| Unsecured term | 48 months | Comparable capacity horizon | My judgement |
| Business term | 60 months | Comparable capacity horizon | My judgement |
| Secured term | 84 months | Comparable capacity horizon | My judgement |
| LAP collateral cap in prototype | 50% of stated collateral value, applied to both the lender-like and safe amounts | Prevents property value alone from determining borrowing power, on either number | My judgement; not an LTV claim |
| Stress rate | fair high + 2 pp | Simple rate-rise scenario | My judgement |
| Stress income | income −10% | Simple income-shock scenario | My judgement |
| Confidence | Falls when must inputs are missing | Silence should widen uncertainty | My judgement + brief |
| Unknown values | Never converted to zero | Avoids false precision | Brief requirement |
| Additional variable-income question | Only non-salaried | Can change rate/safe capacity | Product judgement |
| Additional collateral question | Only LAP | Can cap secured borrowing estimate | Product judgement |
| Quote question | All paths | Changes quote-vs-fair comparison on results | Product judgement |
| Fee question | All paths | Changes estimated all-in APR | Product judgement |
| APR/KFS disclosure | Compare all-in APR, fees and repayment | Borrower can compare offers honestly | RBI guidance; see official references below |

## Calculation notes

1. **Safe EMI** is the lower of (a) income × safe FOIR − existing EMI and (b) income − stated household expenses − existing EMI − 20% of income. This makes the expense answer materially affect the ceiling.
2. **Lender-like amount** uses the lender-like EMI capacity amortised at the high end of the fair-rate band over the product horizon.
3. **Safe amount** uses the safe EMI capacity amortised at the same conservative rate. For LAP, it is additionally capped at 50% of stated collateral value.
4. **Verdict:** no safe EMI → Don’t borrow; requested amount > 115% of safe amount → Borrow less; otherwise Borrow.
5. **Rate:** product/income band is adjusted for known score, unknown score, bounces, stability and variable-income share.
6. **APR:** the UI labels the result an estimate. Actual APR should be calculated from the lender's actual cash-flow schedule and applicable charges.
7. **Ravi:** business/LAP is a route recommendation, not an assumption that ₹45L property guarantees a ₹15L sanction.
8. **Anita:** expensive existing debt, a recent bounce and no emergency buffer can legitimately lead to Borrow less/Don't borrow.

## Limits

No bureau data, verified income, bank statements, ITR validation, lender policy, live market pricing, collateral valuation or actual KFS is available. This prototype therefore makes its assumptions visible and should not be used to make a real credit decision.

## RBI references

- RBI Digital Lending Guidelines: https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12527
- RBI KFS / transparency material: https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=9862

RBI materials describe APR as an all-inclusive annualised cost in applicable lending contexts and require relevant KFS/APR disclosures.
