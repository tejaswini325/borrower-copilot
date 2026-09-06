# Five-minute walkthrough

**0:00–0:45 — Product thesis**

Borrower Copilot does not pretend to predict lender approval. It gives the borrower a boundary: whether to borrow, how much is safe, what price to target, and what EMI not to cross.

**0:45–1:45 — Adaptive questions**

Nine essential questions create a wide result. Follow-ups only appear when relevant: variable-income share for non-salaried borrowers, collateral for LAP, and offer fee/rate for everyone. The additional questions affect rate, capacity, APR or offer comparison.

**1:45–3:15 — Results**

The app separates lender-like sanction from safe borrower carry. The safe amount is explicitly the recommended number. Every major number has a short reason. The rate is a band, APR includes a fee proxy, and the stress section shows a 10% income shock and +2-point rate shock.

**3:15–4:15 — Negotiation Card**

The borrower gets a single printable card with the fair rate, estimated APR, safe EMI, safe amount, lender-like range and a script requesting KFS/APR/fees/total repayment.

**4:15–5:00 — Three borrowers + next step**

Priya shows a strong salaried profile. Ravi demonstrates routing toward secured/business borrowing while still using cash flow. Anita demonstrates that “Borrow less/Don’t borrow” is reachable under existing debt stress.

## Build next

1. Replace judgemental rate bands with a versioned lender/product market dataset.
2. Calculate true APR from actual lender cash flows and KFS fields.
3. Add offer comparison for multiple sanction letters.
4. Add consent-based verified income inputs and scenario sliders.

## Cut

No login, black-box ML credit score, bureau pull, or 30-question generic form in v1.
