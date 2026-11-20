(function NewPerformanceDashboard(){
'use strict';
const C=[
 {name:'闔家安康',domains:['闔家安康'],color:'#d8903e',desc:'闔家安康據點、團險及個險績效',
 levels:{
  1:['總據點數','經營通訊處數','經營人員數','FYC','FYC累月成長率','個險實動人數','個險實動率','經營人員達標率','經營人員達考核標準人數','應檢視據點數','達標據點數','據點達標率','團險主被保險人數','FYP','FYN'],
  2:['總據點數','經營通訊處數','經營人員數','FYC','FYC累月成長率','個險實動人數','個險實動率','經營人員達標率','經營人員達考核標準人數','應檢視據點數','達標據點數','據點達標率','團險主被保險人數','FYP','FYN'],
  3:['總據點數','經營人員數','FYC','FYC累月成長率','個險實動人數','個險實動率','經營人員達標率','經營人員達考核標準人數','應檢視據點數','達標據點數','據點達標率','團險主被保險人數','FYP','FYN','預約顧問3天內回覆率','有團險客戶的據點數','據點開發率','新加保主被保險人數','新加保團險客戶數','團險客戶數(含眷屬)','團轉個客戶數'],
  4:['總據點數','經營是否滿2年','年度經營人員標準是否達標','FYC','團險主被保險人數','預約顧問3天內回覆率','新加保主被保險人數','新加保團險客戶數','團險客戶數(含眷屬)','有團險客戶的據點數','據點開發率','FYP','FYN']},
 sites3:['據點名稱','職域代碼','經營人員數','FYC','團險主被保險人數','團險客戶數(含眷屬)','新加保主被保險人數','今年個險保單數','據點類型','適用的據點評核標準','據點評核時間點','據點評核團單主被保人數目標','據點評核達標現況(1=達標、0=尚未達標)','據點地址'],
 sites4:['據點名稱','職域代碼','經營人員數','FYC','團險主被保險人數','團險客戶數(含眷屬)','新加保主被保險人數','今年個險保單數','據點評核達標現況(1=達標、0=尚未達標)','據點地址']},
 {name:'醫護職域',domains:['醫護公會','醫護職域'],color:'#13a092',desc:'醫師與護理師公會、醫保永逸團單',
 levels:{
  1:['總據點數','經營人員數','醫師公會FYC','護理師公會FYC','醫護職域FYC累月成長率','去年同期FYC成長率','醫師公會團單數','護理師公會團單數','醫保永逸團單數','經營人員實動率','據點團單開發率'],
  2:['總據點數','經營人員數','醫師公會FYC','護理師公會FYC','醫護職域FYC累月成長率','去年同期FYC成長率','醫師公會團單數','護理師公會團單數','醫保永逸團單數','經營人員實動率','據點團單開發率'],
  3:['總據點數','經營人數','醫師公會FYC','護理師公會FYC','醫護職域FYC累月成長率','去年同期FYC成長率','醫師公會團單數','護理師公會團單數','醫保永逸團單數','未達標經營人數','人員未達標率','經營據點數','未達標經營據點數'],
  4:['總據點數','醫師公會FYC','護理師公會FYC','醫師公會團單數','護理師公會團單數','醫保永逸團單數','三天內回覆率','個人是否達標']},
 sites3:['據點名稱','據點代碼','醫師公會FYC','護理師公會FYC','醫師公會團單數','護理師公會團單數','醫保永逸團單數','經營人數','據點地址','據點人數'],
 sites4:['據點名稱','據點代碼','醫師公會FYC','護理師公會FYC','醫師公會團單數','護理師公會團單數','醫保永逸團單數','據點地址','據點人數']},
 {name:'台積電',domains:['台積電'],color:'#c36a9b',desc:'廠區分派、年度業績目標與新客戶數',
 levels:{
  1:['分派廠區數','經營人員數','FYC','FYC累月差額','新客戶數','新客戶數累月差額','三天內回覆率','達標廠區數'],
  2:['分派廠區數','經營人員數','FYC','FYC累月差額','新客戶數','新客戶數累月差額','三天內回覆率','達標廠區數'],
  3:['分派廠區數','經營人員數','FYC','FYC累月差額','新客戶數','新客戶數累月差額','三天內回覆率','達標廠區數'],
  4:['FYC','新客戶數','三天內回覆率','廠區是否達標','出席率']}},
 {name:'駐廠職域',domains:['駐廠職域','駐廠','新安東京'],color:'#5180c6',desc:'駐廠服務、保費與理賠（含新安東京）',
 levels:{
  1:['駐廠職域數','經營人員數','FYC','FYC成長率','FYN','FYP','理賠件數'],
  2:['駐廠職域數','經營人員數','FYC','FYC成長率','FYN','FYP','理賠件數'],
  3:['駐廠職域數','經營人員數','FYC','FYC成長率','FYN','FYP','理賠件數','員工人數','LINE OA加入人數','出勤率'],
  4:['駐廠職域名稱','職域代碼','FYC','FYC成長率','FYN','FYP','理賠件數','員工人數','LINE OA加入人數','LINE OA預約數','LINE OA 未回覆預約數','三天內回覆預約率','出勤率']}}
];
const ROOT=document.getElementById('newPerformance');
if(!ROOT)return;
const $=id=>document.getElementById(id);
const ui=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;};
const nowParts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const part=k=>nowParts.find(p=>p.type===k).value;
const nowMonth=part('year')+part('month');
const state={mode:'month',month:nowMonth,year:part('year'),selected:new Set(C.map(x=>x.name)),path:[],sites:false};
const monthPattern=/^\d{4}(0[1-9]|1[0-2])$/;
const periods=()=>{if(state.mode==='month')return [state.month,state.month];if(state.mode==='year'){const from=state.year+'01';const to=actualManifest&&actualManifest.shards.map(x=>x.month).filter(x=>x.startsWith(state.year)).sort().at(-1);return [from,to||state.year+'12'];}return null;};
function labelRange(){
 const d=new Date(Date.UTC(Number(part('year')),Number(part('month'))-1,Number(part('day'))));
 const iso=x=>x.toISOString().slice(0,10);
 if(state.mode==='yesterday'){d.setUTCDate(d.getUTCDate()-1);return iso(d);}
 const dow=(d.getUTCDay()+6)%7;d.setUTCDate(d.getUTCDate()-dow-7);
 const last=new Date(d);last.setUTCDate(last.getUTCDate()+6);return iso(d)+' ～ '+iso(last);
}
function subset(config){return entries.filter(x=>config.domains.includes(x.domain)&&state.path.every((v,i)=>x.path[i]===v));}
function groupRows(items,depth){const m=new Map();for(const item of items){const key=item.path[depth];if(key==null)continue;if(!m.has(key))m.set(key,[]);m.get(key).push(item);}return [...m].sort((a,b)=>a[0].localeCompare(b[0],'zh-Hant'));}
function getStats(items,a,b){
 const persons=new Map(),sites=new Set(),offices=new Set();let fyc=0,fyn=0,premium=0,oldFyc=0;
 const lastA=shiftYear(a,-1),lastB=shiftYear(b,-1);
 for(const item of items){
  const person=JSON.stringify(item.path),st=persons.get(person)||0;
  let active=st;
  for(const row of item.rows){
   if(row.month>=a&&row.month<=b){fyc+=Number(row.v[2])||0;fyn+=Number(row.v[3])||0;premium+=Number(row.v[4])||0;active+=Number(row.v[3])||0;}
   if(row.month>=lastA&&row.month<=lastB)oldFyc+=Number(row.v[2])||0;
  }
  persons.set(person,active);
  if(item.path[2])offices.add(item.path.slice(0,3).join('|'));
  for(const site of item.siteIds||[])sites.add(site);
 }
 const activePeople=[...persons.values()].filter(n=>n>0).length;
 return {fyc,fyn,premium,oldFyc,people:persons.size,activePeople,activity:persons.size?activePeople/persons.size*100:null,sites:worksiteReady?sites.size:null,offices:offices.size, yoy:oldFyc?100*(fyc-oldFyc)/Math.abs(oldFyc):null};
}
function value(name,d,config,monthMode){
 if(name==='FYC')return d.fyc;
 if(name==='FYN')return d.fyn;
 if(['總據點數','經營據點數','分派廠區數','駐廠職域數'].includes(name))return d.sites;
 if(['經營人員數','經營人數'].includes(name))return d.people;
 if(name==='經營通訊處數')return d.offices;
 if(name==='個險實動人數')return d.activePeople;
 if(['個險實動率','經營人員實動率'].includes(name))return d.activity;
 if(['去年同期FYC成長率','FYC成長率'].includes(name))return d.yoy;
 // Cannot split source FYC into doctor/nurse guild nor infer claims, appointments, attendance or business targets.
 return null;
}
function fmt(name,n){
 if(n===null||n===undefined||!Number.isFinite(n))return '—';
 if(name.includes('率')||name==='FYC成長率')return (n>0&&name.includes('成長')?'+':'')+n.toFixed(1)+'%';
 if(name==='FYC'||name==='FYP'||name.includes('FYC')||name==='FYN'){if(Math.abs(n)>=100000000)return (n/100000000).toFixed(2)+'億';if(Math.abs(n)>=10000)return (n/10000).toFixed(1)+'萬';}
 return n.toLocaleString('zh-TW',{maximumFractionDigits:1});
}
function canShow(name){return ['FYC','FYN','總據點數','經營據點數','分派廠區數','駐廠職域數','經營人員數','經營人數','經營通訊處數','個險實動人數','個險實動率','經營人員實動率','去年同期FYC成長率','FYC成長率'].includes(name);}
function level(){return Math.min(state.path.length+1,4);}
function selectedColumns(config){return config.levels[level()];}
function makeSection(config,a,b){
 const items=subset(config),stat=getStats(items,a,b);
 const sec=ui('section','np-domain');sec.style.setProperty('--np-accent',config.color);
 const title=ui('div','np-domain-title');
 const h=ui('h2','',config.name),subtitle=ui('p','',config.desc);
 title.append(h,subtitle);
 const note=ui('span','np-pill','第 '+level()+' 階層｜'+['','區域中心','業務區','通訊處','業務員'][level()]);
 const head=ui('div','np-domain-head');head.append(title,note);sec.append(head);
 const cols=selectedColumns(config);
 const highlights=cols.filter(canShow).slice(0,4);
 const cards=ui('div','np-cards');
 for(const name of highlights){const card=ui('div','np-metric');card.append(ui('span','',name),ui('strong','',fmt(name,value(name,stat,config))));const foot=ui('small','',name.includes('據點')||name.includes('廠區')?'目前有效名冊快照':'匯入業績／可計算指標');card.append(foot);cards.append(card);}
 if(cards.childElementCount)sec.append(cards);
 const controls=ui('div','np-table-head');
 const lhs=ui('div');lhs.append(ui('strong','',state.path.length===4?'業務員績效明細':(['區域中心','業務區','通訊處','業務員'][state.path.length]+'績效明細')),ui('small','','依 Excel「'+config.name+'」第 '+level()+' 層欄位順序'));
 controls.append(lhs);
 if(state.path.length>=3&&config.sites3){
  const btn=ui('button','np-plain',state.sites?'返回績效':'據點資訊（'+(state.path.length===3?'3.5':'4.5')+'層）');
  btn.type='button';btn.addEventListener('click',()=>{state.sites=!state.sites;render()});controls.append(btn);
 }
 sec.append(controls);
 const wrap=ui('div','np-table-wrap'),table=ui('table','np-table'),thead=ui('thead'),hr=ui('tr');
 const details=state.sites&&state.path.length>=3&&config.sites3;
 const columns=details?(state.path.length===3?config.sites3:config.sites4):cols;
 hr.append(ui('th','',details?'據點資料':(['區域中心','業務區','通訊處','業務員'][Math.min(state.path.length,3)])));
 for(const col of columns)hr.append(ui('th','',col));
 thead.append(hr);table.append(thead);
 const tb=ui('tbody');
 if(details){
  const tr=ui('tr');const td=ui('td','np-empty');
  td.colSpan=columns.length+1;td.textContent='原始資料只有去識別化的據點索引，沒有據點名稱、職域代碼、地址及考核資料；待接入據點明細來源。';
  tr.append(td);tb.append(tr);
 }else{
  const groups=state.path.length===4?[[state.path[3],items]]:groupRows(items,state.path.length);
  if(!groups.length){const tr=ui('tr'),td=ui('td','np-empty','此層級尚無已匯入的資料');td.colSpan=columns.length+1;tr.append(td);tb.append(tr);}
  for(const [name,group] of groups){
   const row=ui('tr'),label=ui('td','np-level-name');
   if(state.path.length<4){
    const btn=ui('button','np-link',name+'　›');btn.type='button';
    btn.title='查看'+name+'下一層績效';btn.addEventListener('click',()=>{state.path.push(name);state.sites=false;render();window.scrollTo({top:0,behavior:'smooth'});});
    label.append(btn);
   }else label.textContent=name;
   row.append(label);
   const stats=getStats(group,a,b);
   for(const metric of columns){const computed=value(metric,stats,config);const cell=ui('td','',fmt(metric,computed));if(computed===null)cell.title='原始資料未提供此指標；不以推估值代替';else if((metric==='FYC'||metric==='FYN')&&computed!==null)cell.title=Number(computed).toLocaleString('zh-TW',{maximumFractionDigits:2});row.append(cell);}
   tb.append(row);
  }
 }
 table.append(tb);wrap.append(table);sec.append(wrap);
 const footer=ui('p','np-footnote','「—」為未取得對應來源，並非 0。FYC／FYN 取已匯入月度業績；據點數取目前名冊（非歷史月末值）。經營人數與實動率採已匯入資料中的人員去重計算，並非全員名冊。');
 sec.append(footer);return sec;
}
function renderBreadcrumb(){
 const root=$('npBreadcrumb');root.replaceChildren();
 const mk=(name,n)=>{const btn=ui('button','np-crumb',name);btn.type='button';btn.disabled=state.path.length===n;btn.addEventListener('click',()=>{state.path=state.path.slice(0,n);state.sites=false;render();});root.append(btn);};
 mk('通路總計',0);
 for(let i=0;i<state.path.length;i++){root.append(ui('span','np-crumb-divider','›'));mk(state.path[i],i+1);}
}
function render(){
 const current=$('newPerformance');if(!current)return;
 if(actualReady&&state.month===nowMonth&&latestSourceMonth&&latestSourceMonth<nowMonth)state.month=latestSourceMonth;
 const tabs=document.querySelectorAll('[data-np-mode]');
 tabs.forEach(btn=>{const active=btn.dataset.npMode===state.mode;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));});
 $('npMonthBox').hidden=state.mode!=='month';$('npYearBox').hidden=state.mode!=='year';
 $('npMonth').value=state.month;$('npYear').value=state.year;
 $('npCount').textContent=state.selected.size+'/4';
 renderBreadcrumb();
 const sections=$('npSections'),notice=$('npNotice');sections.replaceChildren();notice.hidden=true;
 $('npSource').textContent=actualReady?'最新已匯入：'+latestSourceMonth:loadingIssue?'來源載入失敗':'來源資料載入中';
 if(state.mode==='yesterday'||state.mode==='lastweek'){
  $('npRange').textContent=(state.mode==='yesterday'?'昨日':'上週')+'：'+labelRange();
  notice.textContent='目前原始資料只有 YYYYMM 工作月，缺少每日交易日期，無法準確呈現'+(state.mode==='yesterday'?'昨日':'上週')+'績效。已保留操作介面，待日別資料接入後提供實績；不以月累計假冒日／週資料。';
  notice.hidden=false;return;
 }
 if(!actualReady){$('npRange').textContent='讀取資料中';notice.textContent=loadingIssue?'讀取來源失敗：'+loadingIssue:'正在讀取已匯入的 2025／2026 年職域業績與名冊…';notice.hidden=false;return;}
 const [a,b]=periods();
 if(state.mode==='month'&&(!monthPattern.test(state.month)||!actualManifest.shards.some(x=>x.month===state.month))){
  $('npRange').textContent='請選擇有效月份';notice.textContent='該月份尚未匯入。請輸入已匯入的 YYYYMM，例如 '+latestSourceMonth+'。';notice.hidden=false;return;
 }
 if(state.mode==='year'&&!actualManifest.shards.some(x=>x.month.startsWith(state.year))){
  $('npRange').textContent='無年度資料';notice.textContent='選定年度尚未匯入資料。';notice.hidden=false;return;
 }
 $('npRange').textContent='統計期間：'+a+' ～ '+b;
 if(!state.selected.size){notice.textContent='請從右上角的篩選器選擇至少一種職域。';notice.hidden=false;return;}
 for(const cfg of C)if(state.selected.has(cfg.name))sections.append(makeSection(cfg,a,b));
}
function init(){
 const checks=$('npOptions');
 for(const config of C){
  const label=ui('label','np-check'),check=document.createElement('input');check.type='checkbox';check.checked=true;check.value=config.name;check.addEventListener('change',()=>{if(check.checked)state.selected.add(config.name);else state.selected.delete(config.name);render();});
  const dot=ui('i');dot.style.background=config.color;label.append(check,dot,document.createTextNode(config.name));checks.append(label);
 }
 const toggle=$('npTrigger'),popup=$('npPopup');
 const close=()=>{popup.hidden=true;toggle.setAttribute('aria-expanded','false');};
 toggle.addEventListener('click',()=>{popup.hidden=!popup.hidden;toggle.setAttribute('aria-expanded',String(!popup.hidden));});
 document.addEventListener('click',e=>{if(!$('npFilter').contains(e.target))close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
 for(const [id,yes] of [['npAll',true],['npNone',false]]){
  $(id).addEventListener('click',()=>{state.selected=new Set(yes?C.map(c=>c.name):[]);checks.querySelectorAll('input').forEach(x=>x.checked=yes);render();});
 }
 document.querySelectorAll('[data-np-mode]').forEach(btn=>btn.addEventListener('click',()=>{state.mode=btn.dataset.npMode;state.path=[];state.sites=false;render();}));
 $('npMonth').addEventListener('input',e=>{state.month=e.target.value.replace(/\D/g,'').slice(0,6);if(state.month.length===6)render();});
 $('npMonth').addEventListener('change',render);
 $('npYear').addEventListener('change',e=>{state.year=e.target.value;state.path=[];state.sites=false;render();});
 render();
}
window.renderNewPerformance=render;
init();
})();
