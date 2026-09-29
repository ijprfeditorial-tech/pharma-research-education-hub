const menu=document.querySelector('.menu');
const wrap=document.querySelector('.nav-wrap');
menu?.addEventListener('click',()=>wrap.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>wrap.classList.remove('open')));

const num=id=>Number.parseFloat(document.getElementById(id)?.value);
const fmt=(n,d=4)=>Number.isFinite(n)?n.toFixed(d).replace(/\.0+$/,'').replace(/(\.\d*?)0+$/,'$1'):'—';
const result=(id,html)=>{const el=document.getElementById(id);if(el)el.innerHTML=html;};
const values=id=>(document.getElementById(id)?.value||'').split(',').map(x=>Number.parseFloat(x.trim())).filter(Number.isFinite);

document.querySelectorAll('.tool-btn').forEach(btn=>btn.addEventListener('click',()=>{
 const tool=btn.dataset.tool;
 if(tool==='molarity'){const m=num('mol-moles'),v=num('mol-volume');result('result-molarity',m>=0&&v>0?`Molarity = <strong>${fmt(m/v)} M</strong>`:'Enter valid moles and volume.');}
 if(tool==='normality'){const e=num('norm-eq'),v=num('norm-volume');result('result-normality',e>=0&&v>0?`Normality = <strong>${fmt(e/v)} N</strong>`:'Enter valid equivalents and volume.');}
 if(tool==='dilution'){
  const c1=num('d-c1'),v1=num('d-v1'),c2=num('d-c2'),v2=num('d-v2'),t=document.getElementById('d-target')?.value;let out='';
  if(t==='v1'&&c1>0&&c2>=0&&v2>0)out=`V₁ = <strong>${fmt((c2*v2)/c1)}</strong>`;
  else if(t==='v2'&&c2>0&&c1>0&&v1>0)out=`V₂ = <strong>${fmt((c1*v1)/c2)}</strong>`;
  else if(t==='c1'&&v1>0&&c2>=0&&v2>0)out=`C₁ = <strong>${fmt((c2*v2)/v1)}</strong>`;
  else if(t==='c2'&&v2>0&&c1>0&&v1>0)out=`C₂ = <strong>${fmt((c1*v1)/v2)}</strong>`;
  else out='Enter the three known values and calculate the fourth.';result('result-dilution',out);
 }
 if(tool==='percentage'){const a=num('pct-amount'),t=num('pct-total'),type=document.getElementById('pct-type')?.value,label={wv:'% w/v',vv:'% v/v',ww:'% w/w'}[type];result('result-percentage',a>=0&&t>0?`${label} = <strong>${fmt((a/t)*100)}%</strong>`:'Enter an amount and final quantity.');}
 if(tool==='release'){
  const total=num('release-total'),vals=values('release-values'),times=values('release-times');
  if(!(total>0)||!vals.length){result('result-release','Enter total drug content and released amounts.');return;}
  if(times.length&&times.length!==vals.length){result('result-release','If time points are provided, their count must match the released amounts.');return;}
  const pct=vals.map(v=>100*v/total);const rows=pct.map((p,i)=>`${times.length?`t=${fmt(times[i],3)}: `:''}${fmt(p,2)}%`).join(' &nbsp;•&nbsp; ');result('result-release',`Cumulative % drug release: <strong>${rows}</strong>`);
 }
 if(tool==='stats'){
  const x=values('stats-values');if(!x.length){result('result-stats','Enter comma-separated numeric values.');return;}
  const n=x.length,mean=x.reduce((a,b)=>a+b,0)/n,ss=x.reduce((a,b)=>a+(b-mean)**2,0),sd=n>1?Math.sqrt(ss/(n-1)):0,sem=sd/Math.sqrt(n),rsd=mean!==0?(sd/Math.abs(mean))*100:NaN;
  result('result-stats',`n = <strong>${n}</strong><br>Mean = <strong>${fmt(mean,4)}</strong><br>Sample SD = <strong>${fmt(sd,4)}</strong><br>SEM = <strong>${fmt(sem,4)}</strong><br>%RSD = <strong>${fmt(rsd,2)}%</strong>`);
 }
}));
