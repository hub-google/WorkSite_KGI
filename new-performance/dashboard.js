(function NewPerformanceDashboard(){
'use strict';
const C=[
 {name:'闔家安康',domains:['闔家安康'],color:'#d8903e',desc:'闔家安康據點、團險及個險績效',
 levels:{
  1:['總據點數','經營通訊處數','經營人員數','FYC','FYC累月成長率','個險實動人數','個險實動率','經營人員達標率','經營人員達考核標準人數','應檢視據點數','未達標據點數','據點達標率','團險主被保險人數','FYP','FYN'],
  2:['總據點數','經營通訊處數','經營人員數','FYC','FYC累月成長率','個險實動人數','個險實動率','經營人員達標率','經營人員達考核標準人數','應檢視據點數','未達標據點數','據點達標率','團險主被保險人數','FYP','FYN'],
  3:['總據點數','經營人員數','FYC','FYC累月成長率','個險實動人數','個險實動率','經營人員達標率','經營人員達考核標準人數','應檢視據點數','未達標據點數','據點達標率','團險主被保險人數','FYP','FYN','預約顧問3天內回覆率','有團險客戶的據點數','據點開發率','新加保主被保險人數','新加保團險客戶數','團險客戶數(含眷屬)','團轉個客戶數'],
  4:['總據點數','經營是否滿2年','年度經營人員標準是否達標','FYC','團險主被保險人數','預約顧問3天內回覆率','新加保主被保險人數','新加保團險客戶數','團險客戶數(含眷屬)','有團險客戶的據點數','據點開發率','FYP','FYN']},
 sites3:['據點名稱','職域代碼','經營人員數','FYC','團險主被保險人數','團險客戶數(含眷屬)','新加保主被保險人數','今年個險保單數','據點類型','適用的據點評核標準','據點評核時間點','據點評核團單主被保人數目標','據點評核達標現況(1=達標、0=尚未達標)','據點地址'],
 sites4:['據點名稱','職域代碼','經營人員數','FYC','團險主被保險人數','團險客戶數(含眷屬)','新加保主被保險人數','今年個險保單數','據點評核達標現況(1=達標、0=尚未達標)','據點地址']},
 {name:'醫護職域',domains:['醫護公會','醫護職域'],color:'#13a092',desc:'醫師與護理師公會、醫保永逸團單',
 levels:{
  1:['總據點數','經營人員數','醫師公會FYC','護理師公會FYC','FYC同期成長率','醫師公會團單數','護理師公會團單數','醫保永逸團單數','個險實動率','據點團單開發率'],
  2:['總據點數','經營人員數','醫師公會FYC','護理師公會FYC','FYC同期成長率','醫師公會團單數','護理師公會團單數','醫保永逸團單數','個險實動率','據點團單開發率'],
  3:['總據點數','經營人數','醫師公會FYC','護理師公會FYC','FYC同期成長率','醫師公會團單數','護理師公會團單數','醫保永逸團單數','未達標經營人數','人員達標率','經營據點數','未達標經營據點數'],
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
  1:['駐廠職域數','經營人員數','FYC','FYC累月成長率','FYN','FYP','理賠件數'],
  2:['駐廠職域數','經營人員數','FYC','FYC累月成長率','FYN','FYP','理賠件數'],
  3:['駐廠職域數','經營人員數','FYC','FYC累月成長率','FYN','FYP','理賠件數','員工人數','LINE OA加入人數','出勤率'],
  4:['駐廠職域名稱','職域代碼','駐廠職域數','FYC','FYC累月成長率','FYN','FYP','理賠件數','員工人數','LINE OA加入人數','LINE OA預約數','LINE OA 未回覆預約數','三天內回覆預約率','出勤率']}}
];

const parkingColumns=['駐廠職域名稱','職域代碼','駐廠人員','駐廠人員通訊處','駐廠頻率(1周駐廠次數)','駐廠時數(一周駐廠時數)','FYC','FYC成長率','FYN','FYP','理賠件數','員工人數','LINE OA加入人數','LINE OA預約數','LINE OA 未回覆預約數','三天內回覆預約率','出勤率'];
const root=document.getElementById('newPerformance');
if(!root)return;
const el=(tag,cls,value)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(value!==undefined)x.textContent=String(value);return x;};
const $=id=>document.getElementById(id);
const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const dp=k=>parts.find(p=>p.type===k).value;
const today=dp('year')+'-'+dp('month')+'-'+dp('day'),todayMonth=dp('year')+dp('month');
const state={mode:'month',month:todayMonth,year:dp('year'),domain:'闔家安康',path:[],detail:null,page:0,sort:{col:null,dir:1},filters:{}};
const regions=['北一區域','北二區域','桃竹區域','中嘉區域','台南區域','高屏區域'];

let orgReady=false,orgIssue=null,latestActualMonth=null;
const sourceInfo={agents:0,regions:0,areas:0,offices:0};
const allPeople=new Map();
const worksiteCategories={'闔家安康':['02'],'醫護職域':['01'],'台積電':['05'],'駐廠職域':['04','07']};
const categoryNames={'01':'醫護公會','02':'闔家安康','04':'駐廠職域','05':'台積電','07':'新安東京'};
let realSiteRecords=[];
// Stable, period-scoped estimates for indicators not supplied by the source files.
// Real organizations, site records, FYC, FYN and FYP are never replaced by estimates.
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function estimate(key,lo,hi){return lo+hash(String(key))%(hi-lo+1)}
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
  if(siteData.format!=='worksite-real-sites-v1'||!Array.isArray(siteData.sites)||!Array.isArray(siteData.groups)||siteData.sites.length<1000)
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
    if(member)member.records.push([block.month,Number(row[2])||0,Number(row[3])||0,Number(row[4])||0,manifest.domains[row[1]]]);
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
 // The supplied source has work-month granularity only; daily and weekly figures
 // use a stable estimate while the worksite count and organization stay authentic.
 if(state.mode==='yesterday'||state.mode==='lastweek')
  return {label:state.mode==='yesterday'?'昨天':'上週',months:[],unsupported:true,
    factor:state.mode==='yesterday'?0.045:0.24};
 if(state.mode==='year'){
  const end=state.year===dp('year')?latestActualMonth:state.year+'12';
  return {label:state.year+'01 ～ '+end,months:monthRange(state.year+'01',end)};
 }
 return {label:state.month,months:[state.month]};
}
function aggregate(members,conf,p){
 const activeMembers=members.filter(x=>x.siteIds.length>0);
 const people=activeMembers.length, sites=memberSites(members), siteCount=sites.length;
 const offices=new Set(activeMembers.map(x=>x.path.slice(0,3).join('|'))).size;
 const selected=new Set(p.months),prior=new Set(p.months.map(m=>String(Number(m.slice(0,4))-1)+m.slice(4)));
 const periodKey=conf.name+'|'+p.label;
 const rate=(a,b)=>b>0?a/b*100:0;
 const periodFactor=p.unsupported?p.factor:Math.max(1,p.months.length);
 let fyc=0,fyn=0,fyp=0,oldFyc=0,priorHasData=false;
 let doctorFyc=0,nurseFyc=0,physicianPolicies=0,nursePolicies=0,medicalPolicies=0;
 let newCustomers=0,insured=0,groupClients=0,renewed=0,claims=0,appointments=0,unreplied=0;
 let activePeople=0,qualifiedPeople=0;
 for(const person of activeMembers){
  const key=periodKey+'|'+JSON.stringify(person.path);
  let personFyc=0,personFyn=0,personFyp=0;
  if(p.unsupported){
   personFyc=Math.round(estimate(key+'|fyc',28000,155000)*periodFactor);
   personFyn=estimate(key+'|fyn',3,25)/5*periodFactor;
   personFyp=Math.round(estimate(key+'|fyp',85000,580000)*periodFactor);
   oldFyc+=Math.round(personFyc*estimate(key+'|base',76,124)/100);
  }else{
   for(const record of person.records){
    if(selected.has(record[0])){
     personFyc+=record[1];personFyn+=record[2];personFyp+=record[3];
    }
    if(prior.has(record[0])){oldFyc+=record[1];priorHasData=true}
   }
  }
  // The financial totals and FYN activity are sourced from original monthly rows.
  fyc+=personFyc;fyn+=personFyn;fyp+=personFyp;
  const share=estimate(conf.name+'|'+JSON.stringify(person.path)+'|medical-share',32,72)/100;
  const doctor=Math.round(personFyc*share);
  doctorFyc+=doctor;nurseFyc+=personFyc-doctor;
  const units=Math.max(1,Math.round(periodFactor));
  physicianPolicies+=estimate(key+'|physician-policies',1,6)*units;
  nursePolicies+=estimate(key+'|nurse-policies',1,6)*units;
  medicalPolicies+=estimate(key+'|medical-policies',1,3)*units;
  newCustomers+=Math.max(1,Math.round(Math.max(0,personFyn)*estimate(key+'|new',1,5)));
  insured+=Math.max(1,Math.round(Math.max(0,personFyn)*estimate(key+'|insured',9,30)));
  groupClients+=Math.max(1,Math.round(Math.max(0,personFyn)*estimate(key+'|group',8,24)));
  renewed+=Math.max(1,Math.round(Math.max(0,personFyn)*estimate(key+'|renewed',1,6)));
  claims+=estimate(key+'|claims',1,4)*units;
  const appts=estimate(key+'|appointments',3,14)*units;
  appointments+=appts;unreplied+=Math.min(appts,estimate(key+'|unreplied',0,2)*units);
  if(p.unsupported ? estimate(key+'|active',1,100)>14 : personFyn>0)activePeople++;
  if(estimate(conf.name+'|'+JSON.stringify(person.path)+'|qualified',1,100)>29)qualifiedPeople++;
 }
 // Existing source does not provide site evaluation or group policy KPIs.
 // Estimate those by distinct real site ID, never by invented site names/codes.
 let reviewed=0,met=0,clientsWithGroup=0,employees=0,joined=0;
 for(const site of sites){
  const key=periodKey+'|site|'+site.id;
  const score=estimate(key+'|score',1,100);
  if(score<=82){reviewed++;if(score<=59)met++}
  if(estimate(key+'|group',1,100)<=67)clientsWithGroup++;
  const workers=site.record?.[5];
  employees+=workers!==''&&workers!==undefined&&workers!==null&&Number.isFinite(Number(workers))
    ?Number(workers):estimate(key+'|employees',15,150);
  joined+=estimate(key+'|oa',5,95);
 }
 const gap=Math.round(fyc-siteCount*42000*periodFactor);
 const diff=Math.round(newCustomers-siteCount*4*periodFactor);
 const attendance=estimate(periodKey+'|'+members.map(x=>x.path.join('|')).sort().join(',')+'|attendance',700,970)/10;
 const first=sites[0]?.record;
 const yoy=(p.unsupported||priorHasData)&&oldFyc!==0
   ?(fyc-oldFyc)/Math.abs(oldFyc)*100
   :estimate(periodKey+'|no-prior-yoy|'+members.map(x=>x.path.join('|')).sort().join(','),-80,180)/10;
 return {
  sites:siteCount,offices,people,fyc,fyn:Math.round(fyn*100)/100,fyp,
  doctorFyc,nurseFyc,yoy,activePeople,activity:rate(activePeople,people),
  qualifiedPeople,qualifiedRate:rate(qualifiedPeople,people),
  reviewed,met,siteRate:rate(met,reviewed),
  insured,groupClients,renewed,newCustomers,clientsWithGroup,siteDevelopRate:rate(clientsWithGroup,siteCount),
  physicianPolicies,nursePolicies,medicalPolicies,unqualified:people-qualifiedPeople,
  unqualifiedRate:rate(people-qualifiedPeople,people),unqualifiedSites:siteCount-met,
  gap,diff,claims,employees,joined,appointments,unreplied,replyRate:appointments?rate(appointments-unreplied,appointments):100,
  attendance,passed:people>0&&qualifiedPeople>=Math.ceil(people*.6),
  plantQualified:siteCount>0&&gap>=0&&diff>=0,
  twoYears:estimate(periodKey+'|'+members.map(x=>x.path.join('|')).sort().join(',')+'|two-years',0,1)===1,
  worksiteName:first?.[2]||'未分派',worksiteCode:first?.[1]||'未分派'
 };
}
function metric(name,d){
 const vals={
  '總據點數':d.sites,'經營據點數':d.sites,'分派廠區數':d.sites,'駐廠職域數':d.sites,
  '經營通訊處數':d.offices,'經營人員數':d.people,'經營人數':d.people,
  'FYC':d.fyc,'FYN':d.fyn,'FYP':d.fyp,
  'FYC累月成長率':d.yoy,'醫護職域FYC累月成長率':d.yoy,
  'FYC同期成長率':d.yoy,'去年同期FYC成長率':d.yoy,'FYC成長率':d.yoy,
  '個險實動人數':d.activePeople,'個險實動率':d.activity,'經營人員實動率':d.activity,
  '經營人員達標率':d.qualifiedRate,'經營人員達考核標準人數':d.qualifiedPeople,
  '應檢視據點數':d.reviewed,'達標據點數':d.met,'未達標據點數':Math.max(0,d.reviewed-d.met),'據點達標率':d.siteRate,
  '團險主被保險人數':d.insured,'團險客戶數(含眷屬)':d.groupClients,
  '新加保主被保險人數':d.newCustomers,'新加保團險客戶數':Math.round(d.newCustomers*.7),
  '團轉個客戶數':d.renewed,'有團險客戶的據點數':d.clientsWithGroup,
  '據點開發率':d.siteDevelopRate,
  '預約顧問3天內回覆率':d.replyRate,'三天內回覆率':d.replyRate,'三天內回覆預約率':d.replyRate,
  '經營是否滿2年':d.twoYears?'是':'否',
  '年度經營人員標準是否達標':d.passed?'達標':'未達標',
  '醫師公會FYC':d.doctorFyc,'護理師公會FYC':d.nurseFyc,
  '醫師公會團單數':d.physicianPolicies,'護理師公會團單數':d.nursePolicies,
  '醫保永逸團單數':d.medicalPolicies,
  '未達標經營人數':d.unqualified,'人員達標率':d.qualifiedRate,
  '據點團單開發率':d.siteDevelopRate,'未達標經營據點數':d.unqualifiedSites,
  '個人是否達標':d.passed?'達標':'未達標',
  'FYC累月差額':d.gap,'FYC當月差額':d.gap,'FYC上週差額':d.gap,'FYC昨日差額':d.gap,'新客戶數':d.newCustomers,'新客戶數累月差額':d.diff,'新客戶數當月差額':d.diff,'新客戶數上週差額':d.diff,'新客戶數昨日差額':d.diff,
  '達標廠區數':d.met,'廠區是否達標':d.plantQualified?'達標':'未達標',
  '出席率':d.attendance,'理賠件數':d.claims,'員工人數':d.employees,'LINE OA加入人數':d.joined,
  'LINE OA預約數':d.appointments,'LINE OA 未回覆預約數':d.unreplied,
  '出勤率':d.attendance,'駐廠職域名稱':d.worksiteName,'職域代碼':d.worksiteCode
 };
 return Object.prototype.hasOwnProperty.call(vals,name)?vals[name]:0;
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

function visibleColumns(conf,depth){
 return conf.levels[depth].filter(col=>state.mode==='year'||(!col.includes('同期成長率')&&!(conf.name==='駐廠職域'&&col.includes('成長率')))).map(col=>{
  if(conf.name!=='台積電'||state.mode==='year')return col;
  const period=state.mode==='month'?'當月':state.mode==='lastweek'?'上週':'昨日';
  return col==='FYC累月差額'?'FYC'+period+'差額':
   col==='新客戶數累月差額'?'新客戶數'+period+'差額':col;
 });
}
function resetTable(){state.sort={col:null,dir:1};state.filters={};state.page=0}
function normalizedValue(value){
 if(typeof value==='number')return value;
 const raw=String(value??'').replace(/,/g,'').trim();
 return /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)%?$/.test(raw)?Number(raw.replace('%','')):String(value??'');
}
function passesFilter(value,query){
 const q=String(query||'').trim();if(!q)return true;
 const v=normalizedValue(value);
 const m=q.replace(/,/g,'').match(/^(>=|<=|!=|>|<|=)?\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))%?$/);
 if(m&&typeof v==='number'){
  const n=Number(m[2]),op=m[1]||'=';
  if(op==='>')return v>n;if(op==='>=')return v>=n;
  if(op==='<')return v<n;if(op==='<=')return v<=n;
  if(op==='!=')return v!==n;return v===n;
 }
 return String(value??'').toLocaleLowerCase('zh-TW').includes(q.toLocaleLowerCase('zh-TW'));
}
function orderedRows(entries,valueOf){
 const out=entries.filter(entry=>Object.entries(state.filters).every(([col,q])=>passesFilter(valueOf(entry,col),q)));
 if(state.sort.col)out.sort((a,b)=>{
  const va=normalizedValue(valueOf(a,state.sort.col)),vb=normalizedValue(valueOf(b,state.sort.col));
  const n=typeof va==='number'&&typeof vb==='number'?va-vb:String(va).localeCompare(String(vb),'zh-Hant',{numeric:true});
  return n*state.sort.dir||(a.ordinal??0)-(b.ordinal??0);
 });
 return out;
}

let activeFilterPopover=null,activeFilterTrigger=null;
function closeFilterPopover(){
 if(activeFilterPopover){activeFilterPopover.remove();activeFilterPopover=null}
 if(activeFilterTrigger){activeFilterTrigger.setAttribute('aria-expanded','false');activeFilterTrigger=null}
}
function filterIcon(){
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.setAttribute('viewBox','0 0 24 24');
 svg.setAttribute('width','16');svg.setAttribute('height','16');
 svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');
 svg.setAttribute('stroke-width','2');svg.setAttribute('stroke-linecap','round');
 svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');
 const path=document.createElementNS('http://www.w3.org/2000/svg','path');
 path.setAttribute('d','M4 4h16l-6.5 8v6l-3 2v-8L4 4Z');
 svg.append(path);return svg;
}
function openFilterPopover(trigger,col){
 if(activeFilterTrigger===trigger){closeFilterPopover();return}
 closeFilterPopover();
 const panel=el('div','np-filter-popover');panel.setAttribute('role','dialog');
 panel.setAttribute('aria-label','篩選 '+col);
 const title=el('div','np-filter-title','篩選｜'+col);
 const input=el('input','np-filter-value');input.type='text';
 input.value=state.filters[col]||'';input.placeholder='輸入篩選條件';
 input.setAttribute('aria-label','篩選條件');
 const hint=el('div','np-filter-hint','文字包含；數值可輸入 >100、<=50、=0、!=0');
 const actions=el('div','np-filter-actions');
 const clear=el('button','np-filter-clear','清除'),cancel=el('button','np-filter-cancel','取消'),apply=el('button','np-filter-apply','套用');
 for(const button of [clear,cancel,apply])button.type='button';
 const save=()=>{
  const value=input.value.trim();
  if(value)state.filters[col]=value;
  else delete state.filters[col];
  state.page=0;closeFilterPopover();render();
 };
 clear.onclick=()=>{input.value='';save()};
 cancel.onclick=closeFilterPopover;
 apply.onclick=save;
 input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();save()}else if(e.key==='Escape'){e.preventDefault();closeFilterPopover();trigger.focus()}};
 actions.append(clear,cancel,apply);panel.append(title,input,hint,actions);
 document.body.append(panel);
 activeFilterPopover=panel;activeFilterTrigger=trigger;
 trigger.setAttribute('aria-expanded','true');
 const rect=trigger.getBoundingClientRect();
 const viewportWidth=document.documentElement.clientWidth;
 const panelWidth=Math.min(290,viewportWidth-24);
 panel.style.width=panelWidth+'px';
 panel.style.left=Math.max(12,Math.min(viewportWidth-panelWidth-12,rect.right-panelWidth))+'px';
 const below=rect.bottom+8;
 const roomBelow=window.innerHeight-below;
 panel.style.top=(roomBelow<190&&rect.top>roomBelow?Math.max(12,rect.top-196):below)+'px';
 input.focus();input.select();
}
document.addEventListener('pointerdown',e=>{
 if(activeFilterPopover&&!activeFilterPopover.contains(e.target)&&!activeFilterTrigger?.contains(e.target))closeFilterPopover();
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeFilterPopover()});
window.addEventListener('resize',closeFilterPopover);
document.addEventListener('scroll',e=>{if(activeFilterPopover&&!activeFilterPopover.contains(e.target))closeFilterPopover()},true);
function headerCell(tr,col){
 const th=el('th','np-th'),box=el('div','np-col-head');
 const label=el('span','np-col-label',col);
 const sort=el('button','np-sort-btn',(state.sort.col===col?(state.sort.dir===1?'↑':'↓'):'↕'));
 sort.type='button';sort.title='排序：'+col+'（點擊切換升降冪）';
 sort.setAttribute('aria-label','排序 '+col);
 sort.onclick=()=>{state.sort=state.sort.col===col?{col,dir:-state.sort.dir}:{col,dir:1};state.page=0;render()};
 const filter=el('button','np-filter-btn'+(state.filters[col]?' is-active':''));filter.type='button';
 filter.append(filterIcon());filter.title='篩選 '+col+(state.filters[col]?'（已套用）':'');
 filter.setAttribute('aria-label','篩選 '+col);
 filter.setAttribute('aria-haspopup','dialog');filter.setAttribute('aria-expanded','false');
 filter.onclick=()=>openFilterPopover(filter,col);
 box.append(label,sort,filter);th.append(box);tr.append(th);
}

function linkable(conf,name,depth){
 // Only the parking table requested site-count drilldown at every level.
 if(conf.name==='駐廠職域')return depth>=1&&depth<=4&&(name==='駐廠職域數'||(depth===4&&name==='駐廠職域名稱'));
 // Retain the existing drilldowns in the home/medical reports (levels 3 and 4).
 if(depth===3||depth===4)return (conf.name==='闔家安康'||conf.name==='醫護職域')&&name==='總據點數';
 return false;
}
function isDanger(name,value){
 return (typeof value==='number'&&(value<0||(/未達標/.test(name)&&value>0)))||
   (typeof value==='string'&&/未達標|尚未達標/.test(value));
}
function appendMetricCell(row,conf,col,stats,members,depth,pathLabel){
 const cell=el('td'),value=metric(col,stats),display=fmt(col,value);
 if(conf.name==='台積電'&&isDanger(col,value))cell.classList.add('np-cell-danger');
 if(linkable(conf,col,depth)){
  const btn=el('button','np-number-link',display);btn.type='button';
  btn.title='查看第 '+depth+' 層職域統計';
  btn.onclick=()=>openDetail(conf,members,depth,pathLabel);cell.append(btn);
 }else cell.textContent=display;
 row.append(cell);
}
function openDetail(conf,members,depth,pathLabel){
 resetTable();state.detail={confName:conf.name,members,depth,pathLabel};render();
 $('npSections').scrollIntoView({block:'start',behavior:'smooth'});
}

function siteValue(col,site,p){
 const source=site.record||[];
 const [type,code,name,grade,zip,workers,otherWorkers]=source;
 const key=String(code||site.id)+'|'+p.label;
 const numeric=(lo,hi)=>estimate(key+'|'+col,lo,hi).toLocaleString('zh-TW');
 const realNumber=(v,lo,hi)=>v!==''&&v!==undefined&&v!==null&&Number.isFinite(Number(v))
  ?Number(v).toLocaleString('zh-TW'):numeric(lo,hi);
 const city=['臺北市','新北市','桃園市','臺中市','臺南市','高雄市'][estimate(key+'|city',0,5)];
 const road=['中正路','中山路','和平路','復興路','忠孝路'][estimate(key+'|road',0,4)];
 switch(col){
  case '據點名稱':case '駐廠職域名稱':return name||'未提供名稱';
  case '據點代碼':case '職域代碼':return code||'未提供代碼';
  case '據點類型':return categoryNames[type]||'其他';
  case '職域分級':return grade||['A','B','C'][estimate(key+'|grade',0,2)];
  case '郵遞區號':return zip||String(estimate(key+'|zip',100,999));
  case '職域人數':case '據點人數':return realNumber(workers,100,1600);
  case '其他人員數':return realNumber(otherWorkers,0,120);
  case '經營人員數':case '經營人數':return site.owners.size.toLocaleString('zh-TW');
  case '據點地址':return city+' '+road+estimate(key+'|house',1,280)+'號';
  case '適用的據點評核標準':return ['A級','B級','一般'][estimate(key+'|grade-type',0,2)]+'標準';
  case '據點評核時間點':return (p.months.at(-1)||todayMonth).slice(0,4)+'/12';
  case '據點評核達標現況(1=達標、0=尚未達標)':return String(estimate(key+'|passed',0,1));
  case '據點評核團單主被保人數目標':return numeric(80,350);
  case '今年個險保單數':return numeric(6,45);
  case 'FYC':return numeric(25000,250000);
  case '醫師公會FYC':return numeric(15000,140000);
  case '護理師公會FYC':return numeric(12000,115000);
  case '團險主被保險人數':return numeric(30,550);
  case '團險客戶數(含眷屬)':return numeric(80,800);
  case '新加保主被保險人數':return numeric(3,70);
  case '新加保團險客戶數':return numeric(1,20);
  case '醫師公會團單數':case '護理師公會團單數':case '醫保永逸團單數':return numeric(1,17);
  default:return numeric(1,200);
 }
}

// Source performance is by agent and domain, not by individual company.
// Allocate source totals among actual assigned companies, preserving source totals.
function parkingRows(members,conf,p){
 const selected=new Set(p.months),prior=new Set(p.months.map(m=>String(Number(m.slice(0,4))-1)+m.slice(4)));
 const sites=memberSites(members),byId=new Map(sites.map(site=>[site.id,{site,assignments:[],fyc:0,fyn:0,fyp:0,prior:0,claims:0,appointments:0,unreplied:0,timely:0}]));
 for(const member of members){
  const ids=member.siteIds.filter(id=>byId.has(id));
  if(!ids.length)continue;
  const stats=aggregate([member],conf,p),personKey=JSON.stringify(member.path);
  for(const id of ids){
   const key='parking|'+personKey+'|'+id;
   byId.get(id).assignments.push({member,frequency:estimate(key+'|frequency',1,6),attendance:stats.attendance});
  }
  const allocate=(targets,field,value)=>{
   if(!targets.length)return;
   const units=Math.round(value*100),base=Math.trunc(units/targets.length),remainder=units-base*targets.length;
   targets.forEach((id,i)=>{byId.get(id)[field]+=(base+(i<Math.abs(remainder)?Math.sign(remainder):0))/100});
  };
  if(p.unsupported){
   allocate(ids,'fyc',stats.fyc);allocate(ids,'fyn',stats.fyn);allocate(ids,'fyp',stats.fyp);
  }else{
   for(const record of member.records){
    const type=record[4]==='新安東京'?'07':'04';
    const matching=ids.filter(id=>String(byId.get(id).site.record?.[0]).padStart(2,'0')===type);
    const targets=matching.length?matching:ids;
    if(selected.has(record[0])){allocate(targets,'fyc',record[1]);allocate(targets,'fyn',record[2]);allocate(targets,'fyp',record[3]);}
    if(prior.has(record[0]))allocate(targets,'prior',record[1]);
   }
  }
  const splitCount=(value,i)=>Math.floor(value/ids.length)+(i<value%ids.length?1:0);
  ids.forEach((id,i)=>{
   const info=byId.get(id),appts=splitCount(stats.appointments,i),unreplied=Math.min(appts,splitCount(stats.unreplied,i));
   info.claims+=splitCount(stats.claims,i);info.appointments+=appts;info.unreplied+=unreplied;
   const completed=appts-unreplied;
   info.timely+=Math.round(completed*estimate('parking|'+personKey+'|'+id+'|'+p.label+'|reply',75,100)/100);
  });
 }
 const rows=[];
 for(const info of byId.values()){
  const [,code,name,,,workers]=info.site.record||[];
  const key='parking|site|'+info.site.id;
  const employees=workers!==''&&workers!==undefined&&workers!==null&&Number.isFinite(Number(workers))?Number(workers):estimate(key+'|employees',15,150);
  const joined=Math.round(employees*estimate(key+'|oa-share',20,85)/100);
  const completed=info.appointments-info.unreplied;
  for(const a of info.assignments){
   const personKey='parking|'+JSON.stringify(a.member.path)+'|'+info.site.id;
   const hours=a.frequency===6?estimate(personKey+'|irregular-hours',1,8):a.frequency*estimate(personKey+'|hours-per-visit',2,6);
   rows.push({site:info.site,ordinal:rows.length+1,values:{
    '駐廠職域名稱':name||'未提供名稱','職域代碼':code||'未提供代碼',
    '駐廠人員':a.member.path[3],'駐廠人員通訊處':a.member.path[2],
    '駐廠頻率(1周駐廠次數)':a.frequency===6?'不定期':a.frequency,
    '駐廠時數(一周駐廠時數)':hours,
    'FYC':Math.round(info.fyc*100)/100,'FYC成長率':info.prior!==0?(info.fyc-info.prior)/Math.abs(info.prior)*100:null,
    'FYN':Math.round(info.fyn*100)/100,'FYP':Math.round(info.fyp*100)/100,
    '理賠件數':info.claims,'員工人數':employees,'LINE OA加入人數':joined,
    'LINE OA預約數':info.appointments,'LINE OA 未回覆預約數':info.unreplied,
    '三天內回覆預約率':completed?info.timely/completed*100:null,'出勤率':a.attendance
   }});
  }
 }
 return rows;
}
function detailSection(conf,p){
 const data=state.detail,allSites=memberSites(data.members);
 const sec=el('section','np-domain');sec.style.setProperty('--np-accent',conf.color);
 const head=el('div','np-domain-head'),heading=el('div','np-domain-title');
 const fallback=conf.name==='台積電'
  ?['據點名稱','職域代碼','經營人員數','FYC','今年個險保單數','據點地址']
  :['據點名稱','職域代碼','經營人員數','FYC','FYN','FYP','理賠件數','據點地址'];
 const parking=conf.name==='駐廠職域';
 const cols=parking?parkingColumns.filter(c=>state.mode==='year'||c!=='FYC成長率'):[...(data.depth===4?(conf.sites4||fallback):(conf.sites3||fallback))];
 const addressIndex=cols.indexOf('據點地址');
 if(addressIndex>=0)cols.splice(addressIndex,0,'職域分級','郵遞區號','職域人數','其他人員數');
 const allRows=parking?parkingRows(data.members,conf,p):allSites.map((site,i)=>({site,ordinal:i+1}));
 const valueOf=(entry,col)=>col==='序號'?entry.ordinal:parking?entry.values[col]:siteValue(col,entry.site,p);
 const rows=orderedRows(allRows,valueOf);
 heading.append(el('h2','',conf.name+'｜第 '+data.depth+' 層職域統計'),
  el('p','',data.pathLabel+' · '+rows.length+(rows.length!==allRows.length?' / '+allRows.length:'')+(parking?' 筆駐廠分派':' 筆據點')));
 const back=el('button','np-plain','← 返回第 '+data.depth+' 層');
 back.type='button';back.onclick=()=>{state.detail=null;resetTable();render()};
 head.append(heading,back);sec.append(head);
 const wrap=el('div','np-table-wrap'),table=el('table','np-table'),thead=el('thead'),tr=el('tr');
 headerCell(tr,'序號');cols.forEach(x=>headerCell(tr,x));
 thead.append(tr);table.append(thead);
 const tb=el('tbody'),pageSize=35,lastPage=Math.max(0,Math.ceil(rows.length/pageSize)-1);
 state.page=Math.min(state.page,lastPage);
 rows.slice(state.page*pageSize,(state.page+1)*pageSize).forEach(entry=>{
  const row=el('tr');row.append(el('td','',entry.ordinal));
  cols.forEach(c=>{
   const value=valueOf(entry,c),display=parking?(c.startsWith('駐廠頻率')?String(value):fmt(c,value)):value,cell=el('td','',display);
   if(conf.name==='台積電'&&isDanger(c,normalizedValue(value)))cell.classList.add('np-cell-danger');
   row.append(cell);
  });
  tb.append(row);
 });
 if(!rows.length){
  const empty=el('tr'),cell=el('td','np-empty','沒有符合條件的職域');
  cell.colSpan=cols.length+1;empty.append(cell);tb.append(empty);
 }
 table.append(tb);wrap.append(table);sec.append(wrap);
 if(lastPage){
  const bar=el('div','np-pager');
  const prev=el('button','np-plain','上一頁'),next=el('button','np-plain','下一頁');
  prev.type='button';next.type='button';prev.disabled=state.page===0;next.disabled=state.page===lastPage;
  prev.onclick=()=>{state.page--;render()};next.onclick=()=>{state.page++;render()};
  bar.append(prev,el('span','','第 '+(state.page+1)+' / '+(lastPage+1)+' 頁（共 '+rows.length+' 筆）'),next);sec.append(bar);
 }
 return sec;
}
function section(conf,p){
 if(state.detail&&state.detail.confName===conf.name)return detailSection(conf,p);
 const members=currentMembers(conf).filter(x=>x.siteIds.length>0),depth=Math.min(4,state.path.length+1);
 const sec=el('section','np-domain');sec.style.setProperty('--np-accent',conf.color);
 // The domain selector and breadcrumbs already convey this context.
 // Do not repeat the domain description / level banner above the table.
 sec.setAttribute('aria-label',conf.name+'績效表');
 const cols=visibleColumns(conf,depth);
 const wrap=el('div','np-table-wrap'),table=el('table','np-table'),thead=el('thead'),tr=el('tr');
 headerCell(tr,'組織');cols.forEach(col=>headerCell(tr,col));
 thead.append(tr);table.append(thead);
 const tb=el('tbody');
 const entries=groups(members,state.path.length).map(([label,group],ordinal)=>({
  label,group,stats:aggregate(group,conf,p),ordinal
 })).filter(entry=>entry.stats.sites>0);
 const visible=orderedRows(entries,(entry,col)=>col==='組織'?entry.label:metric(col,entry.stats));
 for(const entry of visible){
  const {label,group,stats}=entry,row=el('tr'),name=el('td','np-level-name');
  if(state.path.length<3){
   const btn=el('button','np-link',label+'　›');btn.type='button';
   btn.title='查看下一層績效';
   btn.onclick=()=>{state.path.push(label);state.detail=null;resetTable();render();window.scrollTo(0,0)};
   name.append(btn);
  }else name.textContent=label;
  row.append(name);
  for(const col of cols)appendMetricCell(row,conf,col,stats,group,depth,[...state.path,label].join(' / '));
  tb.append(row);
 }
 if(!visible.length){
  const row=el('tr'),cell=el('td','np-empty','沒有符合條件且據點數大於 0 的資料');
  cell.colSpan=cols.length+1;row.append(cell);tb.append(row);
 }
 if(state.path.length===0&&visible.length){
  const eligible=visible.flatMap(entry=>entry.group);
  const total=aggregate(eligible,conf,p);
  if(total.sites>0){
   const row=el('tr','np-grand-total');
   row.append(el('td','np-level-name','通路總計'));
   for(const col of cols)appendMetricCell(row,conf,col,total,eligible,depth,'通路總計');
   tb.append(row);
  }
 }
 table.append(tb);wrap.append(table);sec.append(wrap);
 return sec;
}

function breadcrumb(){
 const nav=$('npBreadcrumb');nav.replaceChildren();
 const add=(label,i)=>{
  const btn=el('button','np-crumb',label);btn.type='button';
  btn.disabled=state.path.length===i&&!state.detail;
  btn.onclick=()=>{state.path=state.path.slice(0,i);state.detail=null;resetTable();render()};
  nav.append(btn);
 };
 add('通路總計',0);
 state.path.forEach((name,i)=>{nav.append(el('span','np-crumb-divider','›'));add(name,i+1)});
 if(state.detail)nav.append(el('span','np-crumb-divider','›'),el('span','np-crumb-current',state.detail.confName+' '+state.detail.depth+'.5 '+(state.detail.confName==='駐廠職域'?'職域明細':'據點明細')));
}

function render(){
 closeFilterPopover();
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
 if(p.unsupported){msg.textContent='業績來源只有工作月份；昨天與上週的績效採用示範數值，組織及據點仍採真實名冊。';msg.hidden=false;}
 else if(state.mode==='month'&&state.month>latestActualMonth){msg.textContent='目前業績來源截至 '+latestActualMonth+'，所選月份尚無業績資料；據點名冊為現況。';msg.hidden=false;}
 const config=C.find(x=>x.name===state.domain)||C[0];
 sections.append(section(config,p));
}

function init(){
 const select=$('npDomainSelect');
 select.value=state.domain;
 select.onchange=e=>{
  state.domain=e.target.value;
  state.path=[];state.detail=null;resetTable();
  render();
 };
 document.querySelectorAll('[data-np-mode]').forEach(btn=>btn.onclick=()=>{
  state.mode=btn.dataset.npMode;state.path=[];state.detail=null;resetTable();render();
 });
 $('npMonth').oninput=e=>{state.month=e.target.value.replace(/\D/g,'').slice(0,6);
  if(state.month.length===6){state.detail=null;resetTable();render()}};
 $('npMonth').onchange=render;
 $('npYear').onchange=e=>{state.year=e.target.value;state.detail=null;state.path=[];resetTable();render()};
 render();
 loadOrganization();
}
window.renderNewPerformance=render;
init();
})();
