# Lokta · Borrower Copilot

> **A borrower-first Indian loan self-assessment that helps people walk into a lender's office knowing what they can safely afford, what rate is reasonable, and what to negotiate.**

Built for the **Lokta Borrower Copilot Take-Home Challenge · v1.0 · September 2026**

---

## The problem

A lender knows how much they are willing to lend.

The borrower usually doesn't know:

* **Should I borrow at all?**
* **How much can I safely carry?**
* **What interest rate is reasonable for my profile?**
* **What EMI should I refuse to cross?**

Borrower Copilot is designed to give the borrower that boundary **before** they negotiate with a lender.

This is deliberately **not a credit-scoring or loan-approval model**.

It is a transparent self-assessment that turns the borrower's own information into a practical negotiation position.

---

## What Borrower Copilot does

The app produces four decisions:

| Output              | What the borrower gets                                   |
| ------------------- | -------------------------------------------------------- |
| **Borrow decision** | `Borrow` · `Borrow less` · `Don't borrow`                |
| **Maximum amount**  | Likely lender sanction vs **safe borrower capacity**     |
| **Fair rate**       | A profile-based rate band + estimated all-in APR         |
| **EMI ceiling**     | Maximum monthly outflow + tenure trade-off + stress case |

It then converts the result into a **Negotiation Card** that the borrower can show to a lender.

### Example

Instead of walking into a branch asking:

> "Can I get ₹8 lakh?"

the borrower can walk in saying:

> **"My safe EMI ceiling is ₹X. I am targeting ₹Y. Please show me the KFS, all-in APR, processing fees and total repayment. My fair rate range is approximately A–B% for this profile."**

That changes the conversation from **"what will you give me?"** to **"is your offer reasonable for me?"**

---

# Key product decisions

### 1. Lender capacity ≠ borrower capacity

The app intentionally shows two different numbers:

**Likely lender sanction**

What a lender *might* support using an indicative affordability boundary.

**Safe borrower capacity**

What the borrower should actually use as their negotiation ceiling after leaving additional repayment headroom.

The app explicitly recommends the **safe number**, not the maximum possible sanction.

---

### 2. "Don't borrow" is a valid outcome

The product does not assume that every user should receive a loan.

Recent repayment stress, expensive existing debt, weak emergency savings and insufficient EMI headroom can result in:

* **Borrow less**
* or **Don't borrow**

This is especially important for borrowers who are technically able to obtain credit but cannot safely carry another obligation.

---

### 3. Unknown is not zero

If a borrower doesn't know their credit score, the app does **not** assume a score of 300.

Instead:

* the score remains unknown;
* the rate range becomes wider;
* confidence decreases;
* the borrower is told what information would improve the estimate.

The same principle applies to other unknown inputs.

---

### 4. Every additional question must earn its place

The questionnaire starts with a small mandatory set.

Follow-up questions appear only when relevant.

Examples:

* **Self-employed borrower →** income stability / variable-income questions
* **LAP route →** collateral questions
* **Existing debt →** current EMI/balance questions
* **Savings →** emergency-buffer question
* **Existing lender offer →** fee/rate/APR comparison

If an answer does not change an output, it should not become another question.

---

# Adaptive question flow

The initial questions establish the minimum information required to produce a useful, but deliberately wider, result.

Typical must-have information:

1. Loan purpose
2. Loan type / suggested route
3. Amount wanted
4. Net monthly income
5. Income type
6. Existing EMI burden
7. Household expenses
8. Age
9. Credit score, if known

Then the app adapts.

### Salaried borrower

Focuses on:

* income stability
* emergency savings
* existing debt
* credit profile
* lender offer

### Self-employed borrower

Adds:

* income variability
* conservative income estimate
* business purpose
* collateral where relevant
* secured/business financing route

### Informal / gig borrower

Adds stronger attention to:

* income variability
* recent repayment problems
* existing high-cost debt
* emergency buffer
* realistic EMI headroom

---

# The three challenge borrowers

The app contains one-click demo profiles for the three borrowers specified in the challenge.

## Priya · 29 · Salaried

**Profile**

* Bengaluru
* Software engineer at a large MNC
* 5 years of employment
* Net income: ₹1,10,000/month
* Existing car EMI: ₹14,000
* Credit score: 780
* Wants: ₹8,00,000
* Purpose: wedding

**Product reasoning**

Priya has stable salaried income, a strong known credit score and an existing EMI that must be accounted for.

The app therefore:

* keeps her rate toward the stronger end of the unsecured personal-loan range;
* deducts her existing EMI before calculating new safe EMI capacity;
* separates lender-like capacity from safe capacity;
* stress-tests income and rate changes;
* recommends negotiating using the **all-in APR**, not just headline interest.

---

## Ravi · 42 · Self-employed

**Profile**

* Mysuru
* Kirana store for 14 years
* Cash income: ₹40,000–80,000/month
* ITR income: ₹4,20,000/year
* Existing formal EMI: none
* Credit score: unknown
* Unencumbered shop premises: approximately ₹45 lakh
* Wants: ₹15,00,000
* Purpose: second stock line + delivery vehicle

**Product reasoning**

Ravi should not automatically be treated like a salaried borrower seeking a personal loan.

His productive business purpose and unencumbered property make a **business / secured / LAP route** worth exploring.

However, the app does not treat ₹45 lakh of property as automatic borrowing capacity.

The calculation remains constrained by declared cash flow.

The borrower is told to ask the lender to show:

* product type;
* interest rate;
* APR;
* processing and other charges;
* total repayment;
* collateral/LTV assumptions.

---

## Anita · 35 · Informal / gig income

**Profile**

* Hubballi
* Delivery-platform rider + home tailoring
* Income: ₹26,000–30,000/month
* Two children
* Husband currently unemployed
* Existing app loans: ₹35,000 outstanding at 30%+
* One recent EMI bounce
* Wants: ₹1,50,000
* Purpose: electric scooter

**Product reasoning**

The scooter could potentially improve Anita's earning capacity.

But the immediate repayment picture matters more.

The app therefore gives significant weight to:

* current high-cost debt;
* recent repayment stress;
* volatile income;
* lack of emergency savings;
* available EMI headroom.

Depending on the exact existing EMI and expense inputs, the result can become:

**Borrow less** or **Don't borrow**.

The product intentionally does not equate "potentially productive asset" with "safe to borrow today."

---

# Rate and APR approach

The app displays a **range**, not a false-precision rate.

Indicative product bands are documented in [`RULES.md`](./RULES.md).

The prototype considers factors such as:

* income type;
* income stability;
* known credit score;
* recent repayment problems;
* product type;
* secured vs unsecured borrowing;
* borrower resilience.

### Why APR matters

A borrower should not compare:

> **12%**

against another:

> **12.5%**

without considering fees and the actual repayment schedule.

The app therefore surfaces an **estimated all-in APR** and tells the borrower to request the lender's official KFS and compare the complete cost.

RBI materials describe APR as an all-inclusive annualised cost in applicable lending contexts and require relevant loan-cost information to be disclosed through standardised Key Facts Statements.

**Important:** the prototype's APR is an estimate. It is not a substitute for the lender's official APR calculated from the actual loan cash flows.

---

# Affordability model

The prototype uses a transparent **FOIR-style affordability approach**.

Conceptually:

```text
income
  ↓
indicative maximum repayment ratio
  ↓
minus existing EMIs
  ↓
new EMI headroom
  ↓
safe EMI ceiling
  ↓
maximum safe loan amount
```

The model deliberately uses more conservative safe limits than the lender-like limits.

For example, a borrower may have enough income for a lender-like EMI but still receive a lower **safe borrower ceiling**.

All thresholds and adjustments are documented in:

**[`RULES.md`](./RULES.md)**

Every rule contains:

* what it changes;
* the value;
* why it exists;
* source or judgement;
* limitations where applicable.

---

# Stress testing

The result is not based only on today's situation.

The app shows a stress scenario involving:

* **income reduction**
* and/or **interest-rate increase**

This answers:

> "If things get slightly worse, can I still carry this EMI?"

A loan that looks affordable only under today's best-case income should not be presented as comfortably affordable.

---

# Negotiation Card

The final screen produces a one-screen card containing the borrower's key boundaries.

It includes:

* requested amount;
* safe amount;
* lender-like amount;
* safe EMI ceiling;
* fair rate band;
* estimated APR;
* stress case;
* key reasons;
* lender negotiation prompts.

The borrower can **print/save the card as PDF**.

The intended use is simple:

> **Take this screen into the branch.**

---

# Technical implementation

## Stack

* HTML
* CSS
* Vanilla JavaScript
* No backend
* No database
* No external API
* No login
* No personal data storage

The rules and calculations are intentionally kept close to the application logic so they can be inspected and changed during the follow-up session.

### Architecture

```text
index.html
    │
    ├── Application shell
    │
    ├── app.js
    │     ├── question definitions
    │     ├── adaptive routing
    │     ├── affordability rules
    │     ├── rate rules
    │     ├── APR estimate
    │     ├── stress calculations
    │     └── demo profiles
    │
    └── style.css
          ├── responsive UI
          └── printable Negotiation Card
```

There is deliberately no opaque ML model.

The goal of v1 is **explainable lending judgement**, not prediction.

---

# Run locally

The project is intentionally zero-setup.

### Option 1 — simplest

```bash
git clone https://github.com/tejaswini325/borrower-copilot.git
cd borrower-copilot
```

Open:

```text
index.html
```

in Chrome or Edge.

### Option 2 — local server

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

No npm installation, API key, database or backend is required.

---

# Repository structure

```text
borrower-copilot/
│
├── index.html
├── app.js
├── style.css
│
├── README.md
├── RULES.md
├── RUN_THROUGHS.md
└── WALKTHROUGH.md
```

### Deliverables

| File              | Purpose                                          |
| ----------------- | ------------------------------------------------ |
| `index.html`      | Working application shell                        |
| `app.js`          | Questions, adaptive flow, rules and calculations |
| `style.css`       | Responsive interface + printable card            |
| `RULES.md`        | Rules, thresholds, bands and assumptions         |
| `RUN_THROUGHS.md` | Priya, Ravi and Anita walkthroughs               |
| `WALKTHROUGH.md`  | Five-minute product/engineering walkthrough      |
| `README.md`       | Project overview and run instructions            |

---

# What is intentionally not modeled

This is a self-assessment, not a lender underwriting engine.

The prototype does **not** have access to:

* credit-bureau data;
* bank statements;
* verified salary;
* verified ITR/GST records;
* lender-specific underwriting policies;
* live lender rates;
* live product eligibility;
* actual collateral valuation;
* lender-specific LTV rules;
* complete contractual loan cash flows.

Therefore:

> **The numbers are decision-support ranges, not approval guarantees or financial advice.**

Rate bands are explicitly treated as prototype assumptions and are documented in `RULES.md`.

---

# Product limitations

### APR

The prototype uses an estimated fee-aware APR proxy.

A production system should calculate APR from the lender's actual:

* disbursement;
* interest schedule;
* processing fees;
* applicable charges;
* repayment schedule;
* other included costs.

### Income

Self-reported income can be inaccurate.

A production version should allow verified income sources only with explicit borrower consent.

### Credit score

The prototype intentionally handles "unknown" as unknown.

A production product could optionally integrate bureau data with appropriate consent and regulatory controls.

### Market rates

The rate ranges are illustrative prototype assumptions rather than live market quotes.

They should eventually come from a maintained, versioned lender/product dataset.

---

# What I would build next

### 1. Offer comparison

Allow a borrower to enter multiple sanction letters and compare:

```text
headline rate
vs
APR
vs
processing fee
vs
total repayment
vs
foreclosure / other charges
```

This is probably the highest-value next feature.

### 2. Versioned market data

Replace judgement-based rate bands with maintained lender/product data.

### 3. True APR engine

Calculate APR from actual lender cash flows rather than the prototype approximation.

### 4. Scenario explorer

Let borrowers change:

* loan amount;
* tenure;
* rate;
* income;
* down payment;

and immediately see how the safe boundary changes.

### 5. Verified financial inputs

With explicit consent:

* salary slips;
* bank statements;
* ITR;
* business records.

The system should use these to reduce uncertainty rather than silently assuming missing information.

---

# What I would cut

For v1, I would **not** add:

* login/accounts;
* social features;
* a black-box credit score;
* a 30-question form;
* unnecessary financial education before the decision;
* a backend merely for storing questionnaire responses.

The core product is the **borrower's decision boundary + negotiation card**.

---

# Design principles

### Borrower-first

The objective is not:

> "How much can we sell?"

It is:

> "What can this borrower safely agree to?"

### Explainability over complexity

A borrower should be able to understand why a number changed.

### Ranges over false precision

Uncertainty should be visible.

### Silence should widen confidence bands

Missing information should never magically make the estimate more precise.

### Safer number over maximum number

The lender-like number is informative.

The safe number is the recommendation.

---

# Challenge deliverables

This repository contains all four requested deliverables:

* [x] Working app
* [x] `RULES.md`
* [x] Three borrower run-throughs
* [x] Five-minute walkthrough

---

## Built for the Lokta challenge

**Borrower Copilot · v1.0**

A small prototype built around one idea:

> **A borrower should walk into a lending conversation knowing their boundary before the lender tells them theirs.**
