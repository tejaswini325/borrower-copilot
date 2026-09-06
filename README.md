# Lokta · Borrower Copilot — Submission

A borrower-first Indian loan self-assessment for the Lokta take-home challenge (v1.0, 2 Sep 2026).

## Run in under 5 minutes

1. Unzip this folder.
2. Open `index.html` in Chrome/Edge.
3. No npm, backend, API key, login or database is required.

Optional: `python -m http.server 8000` and open `http://localhost:8000`.

## Deliverables

- `index.html` — working mobile-friendly app shell.
- `app.js` — rules, adaptive question flow, calculations and demo profiles.
- `style.css` — responsive UI and printable Negotiation Card.
- `RULES.md` — every important threshold, band and assumption with rationale/source.
- `RUN_THROUGHS.md` — Priya, Ravi and Anita run-throughs.
- `WALKTHROUGH.md` — five-minute product/engineering walkthrough.

## What the prototype does

1. Gives **Borrow / Borrow less / Don’t borrow**.
2. Separates **likely lender sanction** from **safe borrower carry** and explicitly recommends the safer number.
3. Gives a **rate band**, estimated **all-in APR**, and fee-aware negotiation guidance.
4. Gives a monthly **EMI ceiling**, tenure trade-off and income/rate stress case.
5. Generates a one-screen **Negotiation Card** that can be printed/saved as PDF.
6. Adapts follow-up questions: collateral appears for LAP; variable-income share appears for non-salaried borrowers.
7. Treats unknown credit score as unknown, not 300.

## Important honesty

This is a transparent self-assessment, not lender underwriting. Rate bands and FOIR thresholds are prototype judgements, not live lender quotes. APR is an estimate until actual lender cash flows and KFS fields are available. See `RULES.md`.

## Demo profiles

The app includes one-click Priya, Ravi and Anita demos so reviewers can inspect the reasoning quickly.
