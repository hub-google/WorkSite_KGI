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

const root=document.getElementById('newPerformance');
if(!root)return;
const el=(tag,cls,value)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(value!==undefined)x.textContent=String(value);return x;};
const $=id=>document.getElementById(id);
const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const dp=k=>parts.find(p=>p.type===k).value;
const today=dp('year')+'-'+dp('month')+'-'+dp('day'),todayMonth=dp('year')+dp('month');
const state={mode:'month',month:todayMonth,year:dp('year'),domain:'闔家安康',path:[],detail:null,page:0};
const regions=['北一區域','北二區域','桃竹區域','中嘉區域','台南區域','高屏區域'];

let orgReady=false,orgIssue=null,latestActualMonth=null;
const sourceInfo={agents:0,regions:0,areas:0,offices:0};
const allPeople=new Map();
const worksiteCategories={'闔家安康':['02'],'醫護職域':['01'],'台積電':['05'],'駐廠職域':['04','07']};
const categoryNames={'01':'醫護公會','02':'闔家安康','04':'駐廠職域','05':'台積電','07':'新安東京'};
let realSiteRecords=[];
function pad(n){return String(n).padStart(2,'0')}
function monthRange(start,end){
 const out=[];let y=Number(start.slice(0,4)),m=Number(start.slice(4));
 while((y*12+m)<=Number(end.slice(0,4))*12+Number(end.slice(4))&&out.length<24){
  out.push(y+pad(m));m++;if(m>12){y++;m=1;}
 }
 return out;
}
async function loadGzipJson(path){
 const response=await fetch(path,{cache:'no-cache'});
 if(!response.ok)throw new Error('業績資料讀取失敗：'+path+'（'+response.status+'）');
 if(typeof DecompressionStream!=='function')throw new Error('請使用新版 Chrome 或 Edge 讀取業績');
 const encoded=(await response.text()).trim();
 const bytes=Uint8Array.from(atob(encoded),x=>x.charCodeAt(0));
 const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
 return JSON.parse(await new Response(stream).text());
}
function confFromRawDomain(domain){
 if(domain==='醫護公會'||domain==='醫護職域')return '醫護職域';
 if(domain==='新安東京'||domain==='駐廠'||domain==='駐廠職域')return '駐廠職域';
 return domain;
}
async function loadOrganization(){
 try{
  const [mResponse,siteResponse]=await Promise.all([
   fetch('data/manifest.json',{cache:'no-cache'}),
   fetch('data/real-sites.json',{cache:'no-cache'})
  ]);
  if(!mResponse.ok||!siteResponse.ok)throw new Error('真實資料檔讀取失敗（組織：'+mResponse.status+'；據點：'+siteResponse.status+'）');
  const manifest=await mResponse.json(),siteData=await siteResponse.json();
  if(manifest.format!=='WorkSiteKGI-demo-real-v1'||!Array.isArray(manifest.agents)||manifest.agents.length<100)
   throw new Error('原績效管理組織索引格式不正確');
  if(siteData.format!=='worksite-real-sites-v1'||siteData.sites.length!==38970||siteData.active!==62293)
   throw new Error('真實據點來源資料驗證失敗');
  const seen=new Set(),paths=[];
  for(const raw of manifest.agents){
   if(!Array.isArray(raw)||raw.length!==4||raw.some(v=>typeof v!=='string'||!v.trim()))
    throw new Error('組織索引有不完整的 D/E/F/G 欄位');
   const key=JSON.stringify(raw);
   if(seen.has(key))continue;seen.add(key);paths.push(raw.slice());
  }
  realSiteRecords=siteData.sites;
  const byPerson=new Map();
  for(const row of siteData.groups){
   const key=JSON.stringify(row.slice(0,4));
   if(!byPerson.has(key))byPerson.set(key,new Map());
   const byCategory=byPerson.get(key);
   if(!byCategory.has(row[4]))byCategory.set(row[4],new Set());
   const ids=byCategory.get(row[4]);
   for(const id of row[5])ids.add(id);
  }
  sourceInfo.agents=paths.length;
  sourceInfo.regions=new Set(paths.map(x=>x[0])).size;
  sourceInfo.areas=new Set(paths.map(x=>x.slice(0,2).join('|'))).size;
  sourceInfo.offices=new Set(paths.map(x=>x.slice(0,3).join('|'))).size;
  allPeople.clear();
  const byConf=new Map();
  for(const conf of C){
   const index=new Map();
   const members=paths.map(path=>{
    const key=JSON.stringify(path),categories=byPerson.get(key);
    const ids=new Set();
    for(const code of worksiteCategories[conf.name]||[])
     for(const id of categories?.get(code)||[])ids.add(id);
    const member={path,config:conf.name,siteIds:[...ids],records:[]};
    index.set(key,member);return member;
   });
   allPeople.set(conf.name,members);byConf.set(conf.name,index);
  }
  latestActualMonth=manifest.shards.map(s=>s.month).sort().at(-1);
  if(state.month>latestActualMonth)state.month=latestActualMonth;
  const blocks=await Promise.all(manifest.shards.map(async shard=>{
   const records=await loadGzipJson('data/'+shard.file);
   if(records.length!==shard.rows)throw new Error('業績資料筆數不符：'+shard.month);
   return {month:shard.month,records};
  }));
  for(const block of blocks){
   for(const row of block.records){
    const path=manifest.agents[row[0]],confName=confFromRawDomain(manifest.domains[row[1]]);
    const member=path&&byConf.get(confName)?.get(JSON.stringify(path));
    if(member)member.records.push([block.month,Number(row[2])||0,Number(row[3])||0]);
   }
  }
  orgReady=true;orgIssue=null;render();
 }catch(err){
  orgReady=false;orgIssue=String(err.message||err);render();
 }
}
function memberSites(members){
 const map=new Map();
 for(const member of members){
  for(const id of member.siteIds){
   if(!map.has(id))map.set(id,{id,record:realSiteRecords[id],owners:new Set()});
   map.get(id).owners.add(member.path.join('|'));
  }
 }
 return [...map.values()].sort((a,b)=>a.record[2].localeCompare(b.record[2],'zh-Hant')||a.record[1].localeCompare(b.record[1]));
}
function groups(members,depth){
 const map=new Map();
 for(const person of members){
  const key=person.path[depth];
  if(key===undefined)continue;
  if(!map.has(key))map.set(key,[]);
  map.get(key).push(person);
 }
 return [...map].sort((a,b)=>{if(depth===0){const ai=regions.indexOf(a[0]),bi=regions.indexOf(b[0]);if(ai!==bi)return (ai<0?99:ai)-(bi<0?99:bi);}return a[0].localeCompare(b[0],'zh-Hant');});
}
function currentMembers(conf){
 return allPeople.get(conf.name).filter(p=>state.path.every((v,i)=>p.path[i]===v));
}

function period(){
 if(state.mode==='yesterday'||state.mode==='lastweek')
  return {label:state.mode==='yesterday'?'昨天':'上週',months:[],unsupported:true};
 if(state.mode==='year'){
  const end=state.year===dp('year')?latestActualMonth:state.year+'12';
  return {label:state.year+'01 ～ '+end,months:monthRange(state.year+'01',end)};
 }
 return {label:state.month,months:[state.month]};
}
function aggregate(members,conf,p){
 const people=members.filter(x=>x.siteIds.length||x.records.length).length;
 const siteCount=memberSites(members).length;
 const offices=new Set(members.filter(x=>x.siteIds.length||x.records.length).map(x=>x.path.slice(0,3).join('|'))).size;
 if(p.unsupported)return {sites:siteCount,offices,people,fyc:null,fyn:null,yoy:null,activePeople:null,activity:null};
 const selected=new Set(p.months),prior=new Set(p.months.map(m=>String(Number(m.slice(0,4))-1)+m.slice(4)));
 let fyc=0,fyn=0,oldFyc=0,priorHasData=false,activePeople=0;
 for(const person of members){
  let individualFyn=0;
  for(const record of person.records){
   if(selected.has(record[0])){fyc+=record[1];fyn+=record[2];individualFyn+=record[2]}
   if(prior.has(record[0])){oldFyc+=record[1];priorHasData=true}
  }
  if(individualFyn>0)activePeople++;
 }
 return {sites:siteCount,offices,people,fyc,fyn,
  yoy:priorHasData&&oldFyc!==0?(fyc-oldFyc)/Math.abs(oldFyc)*100:null,
  activePeople,activity:people?activePeople/people*100:null};
}
function metric(name,d){
 const vals={
  '總據點數':d.sites,'經營據點數':d.sites,'分派廠區數':d.sites,'駐廠職域數':d.sites,
  '經營通訊處數':d.offices,'經營人員數':d.people,'經營人數':d.people,
  'FYC':d.fyc,'FYN':d.fyn,'去年同期FYC成長率':d.yoy,
  '個險實動人數':d.activePeople,'個險實動率':d.activity,'經營人員實動率':d.activity
 };
 return Object.prototype.hasOwnProperty.call(vals,name)?vals[name]:null;
}
function fmt(name,v){
 if(v===null||v===undefined||v==='')return '—';
 if(typeof v==='string')return v;
 if(name.includes('率'))return (name.includes('成長')&&v>0?'+':'')+v.toFixed(1)+'%';
 if(name.includes('FYC')||name==='FYP'||name==='FYN'||name.includes('差額')){
  if(Math.abs(v)>=1e8)return (v/1e8).toFixed(2)+'億';
  if(Math.abs(v)>=1e4)return (v/1e4).toFixed(1)+'萬';
 }
 return v.toLocaleString('zh-TW',{maximumFractionDigits:1});
}
function linkable(conf,name,depth){
 if(depth<3||depth>4)return false;
 if(conf.name==='闔家安康')return name==='總據點數';
 if(conf.name==='醫護職域')return name==='總據點數';
 return false;
}
function openDetail(conf,members,depth,pathLabel){
 state.detail={confName:conf.name,members,depth,pathLabel};state.page=0;
 render();
 $('npSections').scrollIntoView({block:'start',behavior:'smooth'});
}

function siteValue(col,site){
 const source=site.record;
 if(!source)return '—';
 const [type,code,name,grade,zip,workers,otherWorkers]=source;
 switch(col){
  case '據點名稱':case '駐廠職域名稱':return name||'—';
  case '據點代碼':case '職域代碼':return code||'—';
  case '據點類型':return categoryNames[type]||'—';
  case '職域分級':return grade||'—';
  case '郵遞區號':return zip||'—';
  case '職域人數':case '據點人數':return workers===''?'—':Number(workers).toLocaleString('zh-TW');
  case '其他人員數':return otherWorkers===''?'—':Number(otherWorkers).toLocaleString('zh-TW');
  case '經營人員數':case '經營人數':return site.owners.size.toLocaleString('zh-TW');
  default:return '—';  // 原始名冊沒有這項據點指標，不能捏造
 }
}
function detailSection(conf,p){
 const data=state.detail;
 const sites=memberSites(data.members);
 const sec=el('section','np-domain');sec.style.setProperty('--np-accent',conf.color);
 const head=el('div','np-domain-head'),heading=el('div','np-domain-title');
 heading.append(el('h2','',conf.name+'｜'+data.depth+'.5 據點資訊'),
 el('p','',data.pathLabel+' · '+sites.length+' 筆據點'));
 const back=el('button','np-plain','← 返回第 '+data.depth+' 層');
 back.type='button';back.onclick=()=>{state.detail=null;render()};
 head.append(heading,back);sec.append(head);
 const cols=[...(data.depth===3?conf.sites3:conf.sites4)];
 const addressIndex=cols.indexOf('據點地址');
 if(addressIndex>=0)cols.splice(addressIndex,0,'職域分級','郵遞區號','職域人數','其他人員數');
 const wrap=el('div','np-table-wrap'),table=el('table','np-table'),thead=el('thead'),tr=el('tr');
 tr.append(el('th','','序號'));cols.forEach(x=>tr.append(el('th','',x)));
 thead.append(tr);table.append(thead);
 const tb=el('tbody'),pageSize=35,lastPage=Math.max(0,Math.ceil(sites.length/pageSize)-1);
 state.page=Math.min(state.page,lastPage);
 sites.slice(state.page*pageSize,(state.page+1)*pageSize).forEach((site,i)=>{
  const row=el('tr');row.append(el('td','',state.page*pageSize+i+1));
  cols.forEach(c=>row.append(el('td','',siteValue(c,site))));tb.append(row);
 });
 table.append(tb);wrap.append(table);sec.append(wrap);
 if(lastPage){
  const bar=el('div','np-pager');
  const prev=el('button','np-plain','上一頁'),next=el('button','np-plain','下一頁');
  prev.type='button';next.type='button';prev.disabled=state.page===0;next.disabled=state.page===lastPage;
  prev.onclick=()=>{state.page--;render()};next.onclick=()=>{state.page++;render()};
  bar.append(prev,el('span','','第 '+(state.page+1)+' / '+(lastPage+1)+' 頁（共 '+sites.length+' 筆）'),next);sec.append(bar);
 }
 return sec;
}
function section(conf,p){
 if(state.detail&&state.detail.confName===conf.name)return detailSection(conf,p);
 const members=currentMembers(conf),depth=Math.min(4,state.path.length+1);
 const sec=el('section','np-domain');sec.style.setProperty('--np-accent',conf.color);
 const head=el('div','np-domain-head'),title=el('div','np-domain-title');
 title.append(el('h2','',conf.name),el('p','',conf.desc));
 head.append(title,el('span','np-pill','第 '+depth+' 層｜'+['','區域中心','業務區','通訊處','業務員'][depth]));sec.append(head);
 const cols=conf.levels[depth];
 const h=el('div','np-table-head'),left=el('div');
 left.append(el('strong','',['區域中心','業務區','通訊處','業務員'][Math.min(3,state.path.length)]+'績效明細'));
 h.append(left);sec.append(h);
 const wrap=el('div','np-table-wrap'),table=el('table','np-table'),thead=el('thead'),tr=el('tr');
 tr.append(el('th','',['區域中心','業務區','通訊處','業務員'][Math.min(3,state.path.length)]));
 cols.forEach(col=>tr.append(el('th','',col)));
 thead.append(tr);table.append(thead);
 const tb=el('tbody');
 const parts=groups(members,state.path.length);
 for(const [label,group] of parts){
  const row=el('tr'),name=el('td','np-level-name');
  if(state.path.length<3){
   const btn=el('button','np-link',label+'　›');btn.type='button';
   btn.title='查看下一層績效';
   btn.onclick=()=>{state.path.push(label);state.detail=null;render();window.scrollTo(0,0)};
   name.append(btn);
  }else name.textContent=label;
  row.append(name);
  const stats=aggregate(group,conf,p);
  for(const col of cols){
   const cell=el('td'),number=fmt(col,metric(col,stats));
   if(linkable(conf,col,depth)){
    const btn=el('button','np-number-link',number);btn.type='button';
    btn.title='點擊進入 '+depth+'.5 層據點明細';
    btn.onclick=()=>openDetail(conf,group,depth,[...state.path,label].join(' / '));
    cell.append(btn);
   }else cell.textContent=number;
   row.append(cell);
  }
  tb.append(row);
 }
 if(state.path.length===0){
  const total=aggregate(members,conf,p);
  const row=el('tr','np-grand-total');
  row.append(el('td','np-level-name','通路總計'));
  for(const col of cols)row.append(el('td','',fmt(col,metric(col,total))));
  tb.append(row);
 }
 table.append(tb);wrap.append(table);sec.append(wrap);
 return sec;
}
function breadcrumb(){
 const nav=$('npBreadcrumb');nav.replaceChildren();
 const add=(label,i)=>{
  const btn=el('button','np-crumb',label);btn.type='button';
  btn.disabled=state.path.length===i&&!state.detail;
  btn.onclick=()=>{state.path=state.path.slice(0,i);state.detail=null;render()};
  nav.append(btn);
 };
 add('通路總計',0);
 state.path.forEach((name,i)=>{nav.append(el('span','np-crumb-divider','›'));add(name,i+1)});
 if(state.detail)nav.append(el('span','np-crumb-divider','›'),el('span','np-crumb-current',state.detail.confName+' '+state.detail.depth+'.5 據點明細'));
}

function render(){
 if(!root)return;
 document.querySelectorAll('[data-np-mode]').forEach(btn=>{
  const active=btn.dataset.npMode===state.mode;btn.classList.toggle('active',active);
  btn.setAttribute('aria-pressed',String(active));
 });
 $('npMonthBox').hidden=state.mode!=='month';$('npYearBox').hidden=state.mode!=='year';
 $('npMonth').value=state.month;$('npYear').value=state.year;
 $('npDomainSelect').value=state.domain;
 breadcrumb();
 const sections=$('npSections'),msg=$('npNotice');sections.replaceChildren();msg.hidden=true;
 if(!orgReady){
  $('npRange').textContent='組織資料尚未載入';
  msg.textContent=orgIssue?'讀取舊版組織資料失敗：'+orgIssue:'正在讀取原績效管理的區域中心、業務區、通訊處與業務員組織…';
  msg.hidden=false;return;
 }
 if(state.mode==='month'&&!/^[0-9]{4}(0[1-9]|1[0-2])$/.test(state.month)){
  $('npRange').textContent='請輸入 YYYYMM';msg.textContent='請輸入有效年月，例如 202611。';msg.hidden=false;return;
 }
 const p=period();$('npRange').textContent=p.label;
 if(p.unsupported){msg.textContent='原始業績只有工作月份，無法準確計算昨天或上週；據點名冊仍顯示真實現況。';msg.hidden=false;}
 else if(state.mode==='month'&&state.month>latestActualMonth){msg.textContent='目前業績來源截至 '+latestActualMonth+'，所選月份尚無業績資料；據點名冊為現況。';msg.hidden=false;}
 const config=C.find(x=>x.name===state.domain)||C[0];
 sections.append(section(config,p));
}

function init(){
 const select=$('npDomainSelect');
 select.value=state.domain;
 select.onchange=e=>{
  state.domain=e.target.value;
  state.path=[];state.detail=null;state.page=0;
  render();
 };
 document.querySelectorAll('[data-np-mode]').forEach(btn=>btn.onclick=()=>{
  state.mode=btn.dataset.npMode;state.path=[];state.detail=null;state.page=0;render();
 });
 $('npMonth').oninput=e=>{state.month=e.target.value.replace(/\D/g,'').slice(0,6);
  if(state.month.length===6){state.detail=null;render()}};
 $('npMonth').onchange=render;
 $('npYear').onchange=e=>{state.year=e.target.value;state.detail=null;state.path=[];render()};
 render();
 loadOrganization();
}
window.renderNewPerformance=render;
init();
})();
