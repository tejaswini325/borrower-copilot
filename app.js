const state = { answers: {}, step: 0 };

const must = [
  { id:'purpose', title:'What is the loan for?', help:'This decides which product route and price band make sense.', opts:[
    ['wedding','Wedding / personal expense'],['business','Business / stock / delivery vehicle'],['vehicle','Vehicle for personal use'],['home','Home purchase / improvement'],['education','Education'],['other','Other'] ]},
  { id:'type', title:'Which loan are you considering?', help:'You can change this later. We use it to compare the right product, not to predict approval.', opts:[
    ['personal','Personal loan'],['business','Business loan'],['lap','Loan against property (LAP)'],['gold','Gold loan'],['twowheeler','Two-wheeler loan'],['home','Home loan'] ]},
  { id:'amount', title:'How much do you want to borrow?', input:'money', placeholder:'e.g. 800000' },
  { id:'income', title:'What is your typical net monthly income?', input:'money', placeholder:'e.g. 110000' },
  { id:'incomeType', title:'How do you earn this income?', opts:[
    ['salaried','Salaried'],['self','Self-employed / business'],['informal','Informal / gig / mixed'],['other','Other'] ]},
  { id:'emis', title:'How much do you currently pay in EMIs each month?', input:'money', placeholder:'e.g. 14000' },
  { id:'expenses', title:'About how much does your household spend each month, excluding EMIs?', input:'money', placeholder:'e.g. 45000' },
  { id:'age', title:'Your age', input:'number', placeholder:'e.g. 29' },
  { id:'score', title:'Credit score, if you know it', help:'Unknown is genuinely unknown — it is never treated as a bad score.', opts:[
    ['780','750+'],['720','700–749'],['680','650–699'],['low','Below 650'],['unknown','I don’t know'] ]}
];

const extra = [
  { id:'stability', title:'How stable has your income been over the last 12 months?', opts:[['high','Very stable'],['med','Some ups and downs'],['low','Highly variable / uncertain']]},
  { id:'savings', title:'How many months of essential expenses could your savings cover?', opts:[['6','6+ months'],['3','3–5 months'],['1','1–2 months'],['0','Less than 1 month / none']]},
  { id:'bounces', title:'Any EMI / payment bounces in the last 6 months?', opts:[['no','No'],['yes','Yes'],['unknown','Not sure']]},
  { id:'collateral', title:'If using LAP, what property value could you reasonably document?', input:'money', placeholder:'e.g. 4500000', show:a=>a.type==='lap'},
  { id:'variableShare', title:'Roughly what share of your income changes month to month?', opts:[['low','0–20%'],['mid','21–50%'],['high','More than 50%']], show:a=>a.incomeType!=='salaried'},
  { id:'fee', title:'Processing fee on the offer, if already quoted', input:'percent', placeholder:'e.g. 2', show:a=>true},
  { id:'quoted', title:'Interest rate already offered, if any', input:'percent', placeholder:'e.g. 12.5', show:a=>true}
];

const $ = s => document.querySelector(s);
const INR = n => '₹' + Math.max(0,Math.round(n)).toLocaleString('en-IN');
const pct = n => Number(n).toFixed(1) + '%';

function activeQuestions(){
  return must.concat(extra).filter(q => !q.show || q.show(state.answers));
}
function currentQuestion(){ return activeQuestions()[state.step]; }
function inputFor(q){
  const value = state.answers[q.id] ?? '';
  const type = q.input === 'percent' ? 'number' : (q.input === 'number' ? 'number' : 'number');
  const step = q.input === 'percent' ? '0.01' : '1';
  return `<label>${q.input==='percent'?'Percent':q.input==='number'?'Years':'Amount'}</label><input id="inp" type="${type}" step="${step}" min="0" value="${value}" placeholder="${q.placeholder||''}">`;
}
function question(q){
  const total = activeQuestions().length;
  const progress = Math.round((state.step/total)*100);
  let body = `<div class="card"><span class="pill">${state.step < must.length ? 'Essential' : 'Tighten the range'}</span><h2 class="qtitle">${q.title}</h2>${q.help?`<p class="muted">${q.help}</p>`:''}`;
  if(q.opts) body += `<div class="options">${q.opts.map(([v,l])=>`<button class="opt ${state.answers[q.id]===v?'sel':''}" data-v="${v}">${l}</button>`).join('')}</div>`;
  else body += inputFor(q);
  body += `<div class="actions"><button class="btn secondary" onclick="back()">Back</button><button class="btn primary" onclick="next()">${state.step===total-1?'See my boundary':'Continue'}</button></div></div>`;
  return `<div class="progress"><i style="width:${progress}%"></i></div>${body}`;
}
function page(body){return `<div class="wrap"><nav class="nav"><div class="brand">Lokta <span>· Borrower Copilot</span></div><div class="tag">v1.0 · India · ₹</div></nav>${body}<div class="footer">Rule-based borrower self-assessment · No login · No bureau pull · Nothing sent to a server.</div></div>`;}
function render(){
  const qs=activeQuestions();
  if(state.step>=qs.length){$('#app').innerHTML=page(results());return;}
  const q=qs[state.step];
  $('#app').innerHTML=page(`<div class="card intro"><span class="eyebrow">Borrower-first loan self-assessment</span><h1>Know your boundary before the lender sets it.</h1><p class="muted">Answer the essentials first. Only relevant follow-ups appear, and each follow-up can change your affordability, price or confidence.</p><div class="toplinks"><button class="btn secondary" onclick="demo('priya')">Try Priya</button><button class="btn secondary" onclick="demo('ravi')">Try Ravi</button><button class="btn secondary" onclick="demo('anita')">Try Anita</button></div></div><div style="height:14px"></div>${question(q)}`);
}
function next(){
  const q=currentQuestion(); let v;
  if(q.opts) v=$('.opt.sel')?.dataset.v; else v=$('#inp')?.value;
  if(v===undefined || v===''){alert('Please answer this question. Choose “I don’t know” where available.');return;}
  state.answers[q.id]=(q.input==='number'||q.input==='money'||q.input==='percent')?Number(v):v;
  state.step++;
  render();
}
function back(){ if(state.step>0){state.step--;render();} }
function annuity(emi, annualRate, months){const r=annualRate/100/12; return r===0?emi*months:emi*(1-Math.pow(1+r,-months))/r;}
function emiFor(principal, annualRate, months){const r=annualRate/100/12; return r===0?principal/months:principal*r*Math.pow(1+r,months)/(Math.pow(1+r,months)-1);}

function calc(a){
  const income=Number(a.income)||0, existing=Number(a.emis)||0, expenses=Number(a.expenses)||0, amount=Number(a.amount)||0;
  let lenderFOIR = a.incomeType==='salaried'?0.45:a.incomeType==='self'?0.40:0.35;
  let safeFOIR = a.incomeType==='salaried'?0.35:a.incomeType==='self'?0.30:0.25;
  if(a.score==='780'){lenderFOIR+=0.05;} if(a.score==='low'){lenderFOIR-=0.08;}
  if(a.stability==='high') lenderFOIR+=0.03; if(a.stability==='low') lenderFOIR-=0.05;
  if(a.bounces==='yes'){lenderFOIR-=0.07; safeFOIR-=0.05;}
  if(a.savings==='6') safeFOIR*=1.08; if(a.savings==='3') safeFOIR*=1.02; if(a.savings==='1') safeFOIR*=0.90; if(a.savings==='0') safeFOIR*=0.80;
  if(a.variableShare==='high') safeFOIR*=0.90; if(a.variableShare==='mid') safeFOIR*=0.96;
  const secured=['lap','gold','home'].includes(a.type);
  // Household expenses matter: preserve a minimum of net income after all EMIs + stated expenses.
  // Floor is 20% for unsecured lending. It drops to 10% for secured routes with documented
  // collateral (gold/home have implicit collateral; LAP needs a stated collateral value) —
  // pledged collateral reduces the lender's reliance on the borrower's monthly cash cushion,
  // so the borrower-safety buffer can be smaller without being zero. My judgement.
  const collateralDocumented = a.type!=='lap' || Number(a.collateral)>0;
  const floorPct = (secured && collateralDocumented) ? 0.10 : 0.20;
  function available(foir){return Math.max(0, Math.min(income*foir-existing, income-expenses-existing-income*floorPct));}
  const lenderEMI=available(lenderFOIR);
  const safeEMI=available(safeFOIR);
  const productive=a.purpose==='business';
  let low=productive?10.5:(secured?9:(a.incomeType==='salaried'?10.5:a.incomeType==='self'?12:15));
  let high=productive?14:(secured?12.5:(a.incomeType==='salaried'?13:a.incomeType==='self'?17:22));
  if(a.score==='780'){low-=0.75;high-=0.75;} else if(a.score==='720'){low-=0.25;high-=0.25;} else if(a.score==='unknown'){low+=0.5;high+=1.5;} else if(a.score==='low'){low+=3;high+=5;}
  if(a.bounces==='yes'){low+=2;high+=4;} if(a.stability==='low'){low+=1;high+=2;} if(a.variableShare==='high'){low+=1;high+=2;}
  const defaultFee=a.type==='personal'?2:(secured?1.5:2); const fee=a.fee!==undefined?a.fee:defaultFee;
  const aprLow=low+fee/3, aprHigh=high+fee/3;
  const term=productive?60:(secured?84:48);
  let lenderAmount=annuity(lenderEMI,high,term);
  let safeAmount=annuity(safeEMI,high,term);
  if(a.type==='lap' && Number(a.collateral)>0){
    const collateralCap=Number(a.collateral)*0.50;
    safeAmount=Math.min(safeAmount,collateralCap);
    lenderAmount=Math.min(lenderAmount,collateralCap);
  }
  const requestedEMI=emiFor(amount,high,term);
  let verdict='Borrow', reason;
  if(safeEMI<=0){verdict='Don’t borrow';reason='Your current EMIs and household outflows leave no safe headroom for another loan.';}
  else if(amount>safeAmount*1.15){verdict='Borrow less';reason=`Your requested ${INR(amount)} is above the safer carrying range of about ${INR(safeAmount)}.`;}
  else {reason=`Your requested ${INR(amount)} fits inside the safer carrying range of about ${INR(safeAmount)} at the assumed high-end rate.`;}
  if(a.bounces==='yes') reason+=' A recent payment bounce makes the profile less resilient.';
  if(a.savings==='0') reason+=' With less than one month of buffer, the safe ceiling is deliberately conservative.';
  if(a.type==='lap' || (productive && Number(a.collateral)>0)) reason+=' A secured/business route can be cheaper than unsecured borrowing, subject to lender valuation and cash-flow checks.';
  const confidenceInputs=must.filter(q=>a[q.id]!==undefined && a[q.id]!=='').length;
  const confidence=Math.max(2,Math.min(9,Math.round(4+confidenceInputs*0.5 + (a.stability?0.5:0) + (a.savings?0.5:0) + (a.bounces?0.5:0))));
  const stressIncomeEMI=Math.max(0,available(safeFOIR*0.90));
  const stressRequestedEMI=emiFor(amount,high+2,term);
  const quote=a.quoted!==undefined?a.quoted:null;
  return {income,existing,expenses,amount,lenderFOIR,safeFOIR,lenderEMI,safeEMI,lenderAmount,safeAmount,low,high,fee,aprLow,aprHigh,term,verdict,reason,confidence,stressIncomeEMI,stressRequestedEMI,quote,requestedEMI};
}

function results(){
  const a=state.answers,r=calc(a); const quote=r.quote;
  const quoteText=quote===null?'No lender quote entered. Use the fair band as your negotiation anchor.':`Lender quote: ${pct(quote)} · ${quote<=r.high?'within/near':'above'} the fair band.`;
  return `<div class="card"><div class="result-head"><div><span class="pill ${r.verdict==='Don’t borrow'?'bad':r.verdict==='Borrow less'?'warn':''}">O1 · Recommendation</span><div class="verdict">${r.verdict}</div><p class="muted">${r.reason}</p></div><div class="pill">Confidence ${r.confidence}/10</div></div><div class="note"><b>Why this confidence?</b> Higher when key facts are known; missing credit score, stability or savings keep the answer wider. This is not a lender approval.</div></div>
  <div class="grid" style="margin-top:16px"><div class="card"><span class="pill">O2 · Likely lender sanction</span><div class="big">${INR(r.lenderAmount)}</div><div class="why">Uses a lender-like ${Math.round(r.lenderFOIR*100)}% FOIR ceiling after existing EMI, over ${r.term} months. It is an estimate, not a promise.</div></div><div class="card"><span class="pill">O2 · Safe borrower carry</span><div class="big">${INR(r.safeAmount)}</div><div class="why">Uses a lower ${Math.round(r.safeFOIR*100)}% affordability ceiling and preserves a 20% income floor after stated household expenses. <b>Use this number.</b></div></div></div>
  <div class="grid" style="margin-top:16px"><div class="card"><span class="pill">O3 · Fair price</span><div class="verdict" style="font-size:38px">${pct(r.low)} – ${pct(r.high)}</div><p class="muted">Expected range for this profile and product route. ${quoteText}</p><div class="metric"><b>Estimated all-in APR: ${pct(r.aprLow)} – ${pct(r.aprHigh)}</b><div class="why">Adds the stated/assumed processing fee to illustrate why headline rate alone is not enough. Production APR should use actual lender cash flows.</div></div></div><div class="card"><span class="pill">O4 · EMI to agree to</span><div class="verdict" style="font-size:38px">${INR(r.safeEMI)} / month</div><p class="muted">Treat this as your ceiling, not the lender's maximum.</p><table class="table"><tr><th>Scenario</th><th>Monthly headroom</th></tr><tr><td>Base</td><td>${INR(r.safeEMI)}</td></tr><tr><td>Income −10%</td><td>${INR(r.stressIncomeEMI)}</td></tr><tr><td>Rate +2 pts on requested amount</td><td>${INR(r.stressRequestedEMI)}</td></tr></table><div class="why">Tenure: ${r.term} months. Longer tenure lowers EMI but increases total interest.</div></div></div>
  <div class="card" style="margin-top:16px"><div class="result-head"><div><span class="pill">Negotiation Card</span><h2>Take this to the lender</h2></div><button class="btn secondary" onclick="window.print()">Print / Save PDF</button></div><div class="cardprint"><div class="small muted">BORROWER COPILOT · ${new Date().toLocaleDateString('en-IN')}</div><h2>My borrowing boundary</h2><p class="quote">“I’m targeting <b>${pct(r.low)}–${pct(r.high)}</b>, will compare the <b>all-in APR</b>, and will keep my EMI at or below <b>${INR(r.safeEMI)}</b>. My safer borrowing ceiling is about <b>${INR(r.safeAmount)}</b>.”</p><div class="grid"><div><b>Requested</b><br>${INR(r.amount)}</div><div><b>Likely lender range</b><br>${INR(r.lenderAmount)}</div><div><b>Fair APR</b><br>${pct(r.aprLow)}–${pct(r.aprHigh)}</div><div><b>Tenure used</b><br>${r.term} months</div></div><hr><p class="small"><b>Ask:</b> “Please show me the KFS, APR calculation, processing and third-party fees, total repayment, foreclosure/other charges and the impact if the rate rises.”</p></div></div><div class="actions"><button class="btn primary" onclick="location.reload()">Start another assessment</button></div><div class="footer">Self-assessment only. Product pricing, underwriting, collateral valuation and eligibility vary by lender. Do not treat this as financial advice or a sanction.</div>`;
}

function demo(who){
  state.answers={
    priya:{purpose:'wedding',type:'personal',amount:800000,income:110000,incomeType:'salaried',emis:14000,expenses:45000,age:29,score:'780',stability:'high',savings:'3',bounces:'no',fee:2,quoted:12},
    ravi:{purpose:'business',type:'lap',amount:1500000,income:35000,incomeType:'self',emis:0,expenses:28000,age:42,score:'unknown',stability:'med',savings:'3',bounces:'no',collateral:4500000,variableShare:'mid',fee:1.5,quoted:13},
    anita:{purpose:'vehicle',type:'twowheeler',amount:150000,income:28000,incomeType:'informal',emis:9000,expenses:18000,age:35,score:'unknown',stability:'med',savings:'0',bounces:'yes',variableShare:'high',fee:2.5,quoted:30}
  }[who];
  state.step=activeQuestions().length; render();
}

document.addEventListener('click',e=>{if(e.target.matches('.opt')){e.target.parentElement.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel'));e.target.classList.add('sel');}});
render();
