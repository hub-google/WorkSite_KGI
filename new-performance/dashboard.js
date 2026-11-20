/* New Performance Dashboard - real month data, no invented day/week results */
(function () {
'use strict';
const configs=[
 {name:'闔家安康',color:'#df8b2e',intro:'家庭保障職域經營',kpis:['fyc','sites','people','fyn','premium','activity'],columns:['sites','people','activity','fyc','fyn','premium']},
 {name:'台積電',color:'#e0717b',intro:'台積電廠區與考評績效',kpis:['fyc','prevFyc','growth','sites','fyn','premium'],columns:['sites','offices','fyc','prevFyc','growth','fyn','premium']},
 {name:'醫護公會',color:'#139c8e',intro:'醫護專業職域經營',kpis:['fyn','people','activity','fyc','premium','sites'],columns:['people','fyn','fyc','premium','sites','activity']},
 {name:'駐廠職域',color:'#4178c3',intro:'駐廠服務與業績（含新安東京）',kpis:['fyc','premium','fyn','offices','sites','activity'],columns:['offices','sites','people','fyc','fyn','premium']}
];
const names={fyc:'職域 FYC',fyn:'職域 FYN',premium:'職域保費',sites:'經營職域數',people:'經營人員數',offices:'經營通訊處',activity:'實動率',prevFyc:'去年同期 FYC',growth:'同期 FYC 成長率'};
const state={mode:'month',month:'',year:'2026',selected:new Set(configs.map(c=>c.name))};
const by=id=>document.getElementById(id);
const el=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=String(text);return x};
function display(v,k){
 if(v===null||v===undefined||!Number.isFinite(v))return '—';
 if(k==='activity'||k==='growth')return (k==='growth'&&v>0?'+':'')+v.toFixed(1)+'%';
 if(k==='fyc'||k==='premium'||k==='prevFyc'){
  const abs=Math.abs(v);
  if(abs>=1e8)return (v/1e8).toLocaleString('zh-TW',{maximumFractionDigits:2})+'億';
  if(abs>=1e4)return (v/1e4).toLocaleString('zh-TW',{maximumFractionDigits:1})+'萬';
 }
 return v.toLocaleString('zh-TW',{maximumFractionDigits:1});
}
function dataRange(){
 if(state.mode==='month')return [state.month,state.month];
 if(state.mode==='year'){
  const year=state.year;
  return [year+'01',latestSourceMonth?.startsWith(year)?latestSourceMonth:year+'12'];
 }
 return null;
}
function stats(items,a,b){
 if(!actualReady)return null;
 const result={fyc:0,fyn:0,premium:0,people:0,sites:worksiteReady?0:null,offices:0,activity:0,prevFyc:null,growth:null};
 const people=new Map(),sites=new Set(),offices=new Set();
 for(const item of items){
  if(worksiteReady)for(const id of item.siteIds||[])sites.add(id);
  if(item.path.length>=3)offices.add(item.path.slice(0,3).join('|'));
  for(const obj of item.rows){
   if(obj.month<a||obj.month>b)continue;
   const r=obj.v,key=item.path.join('|');
   people.set(key,(people.get(key)||0)+(Number(r[3])||0));
   result.fyc+=Number(r[2])||0;
   result.fyn+=Number(r[3])||0;
   result.premium+=Number(r[4])||0;
  }
 }
 result.people=people.size;result.sites=worksiteReady?sites.size:null;
 result.offices=offices.size;
 result.activity=people.size?[...people.values()].filter(v=>v>0).length/people.size*100:0;
 const lastA=shiftYear(a,-1),lastB=shiftYear(b,-1);
 if(actualManifest.audit[lastA.slice(0,4)]){
  let prior=0;
  for(const item of items)for(const obj of item.rows)if(obj.month>=lastA&&obj.month<=lastB)prior+=Number(obj.v[2])||0;
  result.prevFyc=prior;
  result.growth=prior?100*(result.fyc-prior)/prior:null;
 }
 return result;
}
function snapshotLabel(){
 const dateParts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
 const get=t=>Number(dateParts.find(x=>x.type===t)?.value);
 const d=new Date(Date.UTC(get('year'),get('month')-1,get('day')));
 const fmt=v=>v.toISOString().slice(0,10).replace(/-/g,'/');
 if(state.mode==='yesterday'){d.setUTCDate(d.getUTCDate()-1);return fmt(d)}
 const dow=(d.getUTCDay()+6)%7;
 d.setUTCDate(d.getUTCDate()-dow-7);
 const end=new Date(d);end.setUTCDate(end.getUTCDate()+6);
 return fmt(d)+' ～ '+fmt(end);
}
function makeCard(data,key){
 const box=el('div','np-card'),value=el('strong','',display(data[key],key));
 box.append(el('span','',names[key]),value);
 if((key==='fyc'||key==='premium'||key==='prevFyc')&&data[key]!==null)value.title=Math.round(data[key]).toLocaleString('zh-TW')+' 元';
 const foot=key==='sites'?'最新名冊快照，非歷史月末數':
  key==='activity'?'期間 FYN > 0 人員／經營人員':
  key==='offices'?'現有分派通訊處':
  key==='prevFyc'||key==='growth'?'去年相同月份區間':'已匯入月度業績';
 box.append(el('small','',foot));
 return box;
}
function makeTable(config,items,from,to){
 const wrap=el('div','np-table-scroll'),table=el('table','np-table');
 const head=el('tr');
 for(const key of ['區域中心',...config.columns.map(k=>names[k])])head.append(el('th','',key));
 const thead=el('thead');thead.append(head);table.append(thead);
 const tbody=el('tbody');
 const order=['北一區域','北二區域','桃竹區域','中嘉區域','台南區域','高屏區域'];
 const regions=[...new Set(items.map(x=>x.path[0]))].sort((x,y)=>{
  const a=order.indexOf(x),b=order.indexOf(y);
  return (a<0?99:a)-(b<0?99:b)||x.localeCompare(y,'zh-TW');
 });
 for(const region of regions){
  const row=el('tr'),s=stats(items.filter(x=>x.path[0]===region),from,to);
  row.append(el('td','',region));
  for(const key of config.columns){
   const td=el('td','',display(s[key],key));
   if(['fyc','premium','prevFyc'].includes(key)&&s[key]!==null)td.title=Math.round(s[key]).toLocaleString('zh-TW')+' 元';
   row.append(td);
  }
  tbody.append(row);
 }
 table.append(tbody);wrap.append(table);
 return wrap;
}
function section(config,from,to){
 const items=entries.filter(x=>x.domain===config.name);
 const d=stats(items,from,to),part=el('section','np-domain');
 part.style.setProperty('--domain-color',config.color);
 const top=el('div','np-domain-top'),left=el('div','np-domain-heading');
 left.append(el('i','np-accent'));
 const title=el('div');title.append(el('h2','',config.name),el('p','',config.intro));
 left.append(title);top.append(left,el('span','np-small-tag','專屬績效指標'));
 part.append(top);
 const cards=el('div','np-cards');for(const key of config.kpis)cards.append(makeCard(d,key));
 part.append(cards,makeTable(config,items,from,to));
 part.append(el('p','np-footnote','業績依月資料彙總；經營職域數取最新有效名冊快照，非歷史月末職域數。實動率為本期間 FYN > 0 的去重經營人員占比。'));
 if(config.name==='台積電'){
  const base=el('div','np-targets');
  base.append(el('strong','', '台積電專屬考評標準｜參考戰報.xlsm'));
  const grid=el('div','np-target-grid');
  for(const [label,number] of [['每廠年度 FYC 目標','72C（72萬元）'],['每廠年度新個險客戶','20 位'],['出勤率標準','70%'],['三天內 LINE 回覆率','90%']]){
   const box=el('div','np-target');
   box.append(el('span','',label),el('b','',number),el('small','','實績待接考評資料'));
   grid.append(box);
  }
  base.append(grid);part.append(base);
 }
 return part;
}
function render(){
 if(!by('newPerformance'))return;
 if(!state.month&&actualReady)state.month=latestSourceMonth||currentMonth;
 by('npMonth').value=state.month;by('npYear').value=state.year;
 by('npMonthGroup').hidden=state.mode!=='month';
 by('npYearGroup').hidden=state.mode!=='year';
 by('npCount').textContent=state.selected.size+'/4';
 for(const btn of document.querySelectorAll('[data-np-mode]')){
  const active=btn.dataset.npMode===state.mode;
  btn.classList.toggle('active',active);
  btn.setAttribute('aria-pressed',String(active));
 }
 const msg=by('npMessage'),sections=by('npSections');
 msg.hidden=true;sections.replaceChildren();
 by('npSource').textContent='最新業績月份：'+(latestSourceMonth||'讀取中');
 if(state.mode==='yesterday'||state.mode==='lastweek'){
  by('npRange').textContent=(state.mode==='yesterday'?'昨日':'上週')+'：'+snapshotLabel();
  msg.textContent='目前只有 YYYYMM 月度業績，沒有日別交易日期，無法精確計算'+(state.mode==='yesterday'?'昨日':'上週')+'績效。待串接每日明細後才會顯示數字；不會以月累計假裝單日或單週實績。';
  msg.hidden=false;return;
 }
 if(!actualReady){
  by('npRange').textContent='正在讀取來源資料…';
  msg.textContent=loadingIssue?'資料來源載入失敗：'+loadingIssue:'讀取 2025／2026 月度職域業績中…';
  msg.hidden=false;return;
 }
 const range=dataRange(),months=new Set(actualManifest.shards.map(s=>s.month));
 if(state.mode==='month'&&(!/^[0-9]{4}(0[1-9]|1[0-2])$/.test(state.month)||!months.has(state.month))){
  by('npRange').textContent='請選擇已匯入月份';
  msg.textContent=/^[0-9]{6}$/.test(state.month)?'該月尚未匯入資料，最新可查 '+latestSourceMonth+'。':'請輸入有效月份，例如 202610（YYYYMM）。';
  msg.hidden=false;return;
 }
 by('npRange').textContent='統計期間：'+range[0]+' ～ '+range[1];
 if(!state.selected.size){msg.textContent='請在右上角篩選器勾選至少一個職域類別。';msg.hidden=false;return;}
 for(const config of configs)if(state.selected.has(config.name))sections.append(section(config,...range));
}
function init(){
 const options=by('npOptions');
 for(const config of configs){
  const label=el('label','np-check'),checkbox=document.createElement('input');
  checkbox.type='checkbox';checkbox.value=config.name;checkbox.checked=true;
  checkbox.addEventListener('change',()=>{checkbox.checked?state.selected.add(config.name):state.selected.delete(config.name);render()});
  const marker=el('i');marker.style.background=config.color;
  label.append(checkbox,marker,document.createTextNode(config.name));
  options.append(label);
 }
 const popup=by('npPopup'),trigger=by('npTrigger');
 function close(){popup.hidden=true;trigger.setAttribute('aria-expanded','false')}
 trigger.addEventListener('click',()=>{popup.hidden=!popup.hidden;trigger.setAttribute('aria-expanded',String(!popup.hidden))});
 document.addEventListener('click',e=>{if(!by('npFilter').contains(e.target))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 for(const [id,checked] of [['npAll',true],['npNone',false]])by(id).addEventListener('click',()=>{
  state.selected=new Set(checked?configs.map(x=>x.name):[]);
  options.querySelectorAll('input').forEach(x=>x.checked=checked);render();
 });
 document.querySelectorAll('[data-np-mode]').forEach(btn=>btn.addEventListener('click',()=>{
  state.mode=btn.dataset.npMode;render();
 }));
 by('npMonth').addEventListener('input',e=>{
  state.month=e.target.value.replace(/[^0-9]/g,'').slice(0,6);
  if(state.month.length===6)render();
 });
 by('npMonth').addEventListener('change',render);
 for(const year of ['2026','2025']){const opt=el('option','',year+' 年');opt.value=year;by('npYear').append(opt);}
 by('npYear').addEventListener('change',e=>{state.year=e.target.value;render()});
 render();
}
window.renderNewPerformance=render;
init();
})();