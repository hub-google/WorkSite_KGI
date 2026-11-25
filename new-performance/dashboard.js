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
  1:['總據點數','經營人員數','醫師公會FYC','護理師公會FYC','FYC同期成長率','醫師公會團單數','護理師公會團單數','醫保永逸團單數','個險實動率','團險實動率','據點團單開發率'],
  2:['總據點數','經營人員數','醫師公會FYC','護理師公會FYC','FYC同期成長率','醫師公會團單數','護理師公會團單數','醫保永逸團單數','個險實動率','團險實動率','據點團單開發率'],
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

const parkingColumns=['駐廠職域名稱','職域代碼','駐廠人員','駐廠人員通訊處','駐廠頻率(1周駐廠次數)','駐廠時數(一周駐廠時數)','FYC','FYC累月成長率','FYN','FYP','理賠件數','員工人數','LINE OA加入人數','LINE OA預約數','LINE OA 未回覆預約數','三天內回覆預約率','出勤率'];
const parkingSummaryColumns=['駐廠職域名稱','職域代碼','員工人數','駐廠通訊處數','駐廠人數','駐廠頻率(1周駐廠次數)','FYC','FYN','FYP','理賠件數','理賠後購買個險FYN'];
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
 let activePeople=0,groupActivePeople=0,qualifiedPeople=0;
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
  // Independent demo activity flags at person/period grain; aggregate by people, not by rates.
  const groupThreshold=p.unsupported?(p.factor<0.1?15:35):Math.min(95,45+Math.max(1,p.months.length)*4);
  if(estimate(key+'|group-active',1,100)<=groupThreshold)groupActivePeople++;
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
  doctorFyc,nurseFyc,yoy,activePeople,activity:rate(activePeople,people),groupActivePeople,groupActivity:rate(groupActivePeople,people),
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
  '團險實動率':d.groupActivity,
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
 return conf.levels[depth].filter(col=>state.mode==='year'||(!col.includes('同期成長率')&&!(conf.name==='駐廠職域'&&col.includes('成長率'))&&!(conf.name==='闔家安康'&&col==='FYC累月成長率'))).map(col=>{
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
function filterNumber(value){
 if(value===null||value===undefined||value==='')return null;
 const n=normalizedValue(value);
 return typeof n==='number'&&Number.isFinite(n)?n:null;
}
function filterDisplay(col,value){
 return value===null||value===undefined||value===''?'—':String(value);
}
function passesFilter(value,filter,display){
 if(!filter)return true;
 if(filter.mode==='values')return filter.selected.has(display);
 if(filter.mode==='range'){
  const n=filterNumber(value);
  return n!==null&&(filter.min===null||n>=filter.min)&&(filter.max===null||n<=filter.max);
 }
 return true;
}
function columnOptions(col,entries,valueOf,displayOf){
 const options=new Map();
 let hasNumeric=false;
 for(const entry of entries){
  const raw=valueOf(entry,col),label=filterDisplay(col,displayOf(entry,col));
  const number=filterNumber(raw);
  if(number!==null)hasNumeric=true;
  if(!options.has(label))options.set(label,{label,number,count:0});
  options.get(label).count++;
 }
 const values=[...options.values()].sort((a,b)=>a.number!==null&&b.number!==null?a.number-b.number:a.label.localeCompare(b.label,'zh-Hant',{numeric:true}));
 // Identifiers such as a numeric-looking company code or postal code are text, not quantities.
 const numeric=hasNumeric&&!/名稱|代碼|郵遞區號|地址|類型|分級|標準$|時間點|是否|^組織$|^駐廠人員$|^駐廠人員通訊處$/.test(col);
 return {values,numeric};
}
function orderedRows(entries,valueOf,displayOf=valueOf){
 const out=entries.filter(entry=>Object.entries(state.filters).every(([col,q])=>passesFilter(valueOf(entry,col),q,filterDisplay(col,displayOf(entry,col)))));
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
function openFilterPopover(trigger,col,entries,valueOf,displayOf){
 if(activeFilterTrigger===trigger){closeFilterPopover();return}
 closeFilterPopover();closeDefinition();
 const {values,numeric}=columnOptions(col,entries,valueOf,displayOf);
 const previous=state.filters[col];
 let mode=previous?.mode==='range'&&numeric?'range':'values';
 const selected=new Set(previous?.mode==='values'?previous.selected:values.map(v=>v.label));
 const panel=el('div','np-filter-popover');panel.setAttribute('role','dialog');
 panel.setAttribute('aria-label','篩選 '+col);
 const title=el('div','np-filter-title','篩選｜'+col);
 const tabs=el('div','np-excel-tabs');
 const valueTab=el('button','','勾選篩選'),rangeTab=el('button','','數值區間');
 for(const tab of [valueTab,rangeTab])tab.type='button';
 rangeTab.disabled=!numeric;
 if(!numeric)rangeTab.title='此欄位為文字，請使用勾選篩選';
 tabs.append(valueTab,rangeTab);
 const valuePane=el('div','np-excel-pane'),rangePane=el('div','np-excel-pane');
 const search=el('input','np-filter-value');search.type='search';search.placeholder='搜尋數值或文字';search.setAttribute('aria-label','搜尋欄位值');
 const count=el('div','np-excel-count');
 const selectAllLabel=el('label','np-excel-all');
 const selectAll=el('input');selectAll.type='checkbox';
 selectAllLabel.append(selectAll,el('span','','全選（目前清單）'));
 const list=el('div','np-excel-list');
 let shown=values;
 function refreshCount(){
  count.textContent='已勾選 '+values.filter(v=>selected.has(v.label)).length+' / '+values.length+' 種值';
  const checked=shown.filter(v=>selected.has(v.label)).length;
  selectAll.checked=shown.length>0&&checked===shown.length;
  selectAll.indeterminate=checked>0&&checked<shown.length;
  selectAll.disabled=shown.length===0;
 }
 function refreshList(){
  const q=search.value.trim().toLocaleLowerCase('zh-TW');
  shown=values.filter(v=>v.label.toLocaleLowerCase('zh-TW').includes(q));
  list.replaceChildren();
  if(!shown.length)list.append(el('div','np-excel-empty','沒有符合的欄位值'));
  for(const v of shown){
   const label=el('label','np-excel-option'),check=el('input');check.type='checkbox';check.checked=selected.has(v.label);
   check.onchange=()=>{if(check.checked)selected.add(v.label);else selected.delete(v.label);refreshCount()};
   label.append(check,el('span','np-excel-option-text',v.label),el('span','np-excel-option-count',v.count));
   list.append(label);
  }
  refreshCount();
 }
 search.oninput=refreshList;
 selectAll.onchange=()=>{for(const v of shown){if(selectAll.checked)selected.add(v.label);else selected.delete(v.label)}refreshList()};
 valuePane.append(search,selectAllLabel,list,count);
 const minLabel=el('label','np-excel-bound'),maxLabel=el('label','np-excel-bound');
 const min=el('input','np-filter-value'),max=el('input','np-filter-value');
 for(const input of [min,max]){input.type='number';input.step='any';input.inputMode='decimal';input.placeholder='不限'}
 min.value=previous?.mode==='range'&&previous.min!==null?String(previous.min):'';
 max.value=previous?.mode==='range'&&previous.max!==null?String(previous.max):'';
 minLabel.append(el('span','','最小值（含）'),min);maxLabel.append(el('span','','最大值（含）'),max);
 const hint=el('div','np-filter-hint',col.includes('率')?'百分比請輸入數字，例如 80 代表 80%。':'依原始數值篩選；金額以元為單位，留空表示不限。');
 const error=el('div','np-excel-error');error.setAttribute('role','alert');
 rangePane.append(minLabel,maxLabel,hint,error);
 function switchMode(next){
  mode=next;valuePane.hidden=next!=='values';rangePane.hidden=next!=='range';
  valueTab.classList.toggle('is-active',next==='values');rangeTab.classList.toggle('is-active',next==='range');
  valueTab.setAttribute('aria-pressed',String(next==='values'));rangeTab.setAttribute('aria-pressed',String(next==='range'));
 }
 valueTab.onclick=()=>switchMode('values');rangeTab.onclick=()=>{if(numeric)switchMode('range')};
 const actions=el('div','np-filter-actions');
 const clear=el('button','np-filter-clear','清除篩選'),cancel=el('button','np-filter-cancel','取消'),apply=el('button','np-filter-apply','套用');
 for(const button of [clear,cancel,apply])button.type='button';
 const commit=()=>{state.page=0;closeFilterPopover();render()};
 clear.onclick=()=>{delete state.filters[col];commit()};
 cancel.onclick=closeFilterPopover;
 apply.onclick=()=>{
  if(mode==='values'){
   if(values.every(v=>selected.has(v.label)))delete state.filters[col];
   else state.filters[col]={mode:'values',selected:new Set(selected)};
  }else{
   const lo=min.value.trim()===''?null:Number(min.value),hi=max.value.trim()===''?null:Number(max.value);
   if(min.validity.badInput||max.validity.badInput||(lo!==null&&!Number.isFinite(lo))||(hi!==null&&!Number.isFinite(hi))){error.textContent='請輸入有效數字';return}
   if(lo!==null&&hi!==null&&lo>hi){error.textContent='最小值不能大於最大值';return}
   if(lo===null&&hi===null)delete state.filters[col];
   else state.filters[col]={mode:'range',min:lo,max:hi};
  }
  commit();
 };
 for(const input of [search,min,max])input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();apply.onclick()}else if(e.key==='Escape'){e.preventDefault();closeFilterPopover();trigger.focus()}};
 actions.append(clear,cancel,apply);panel.append(title,tabs,valuePane,rangePane,actions);
 document.body.append(panel);
 activeFilterPopover=panel;activeFilterTrigger=trigger;trigger.setAttribute('aria-expanded','true');
 refreshList();switchMode(mode);
 const rect=trigger.getBoundingClientRect(),viewportWidth=document.documentElement.clientWidth;
 const panelWidth=Math.min(320,viewportWidth-24);
 panel.style.width=panelWidth+'px';
 panel.style.left=Math.max(12,Math.min(viewportWidth-panelWidth-12,rect.right-panelWidth))+'px';
 const height=panel.offsetHeight,below=rect.bottom+8;
 panel.style.top=Math.max(12,Math.min(window.innerHeight-height-12,below+height>window.innerHeight&&rect.top-height-8>=12?rect.top-height-8:below))+'px';
 // Do not auto-open the mobile keyboard when the user is selecting checkboxes.
}
document.addEventListener('pointerdown',e=>{
 if(activeFilterPopover&&!activeFilterPopover.contains(e.target)&&!activeFilterTrigger?.contains(e.target))closeFilterPopover();
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeFilterPopover()});
window.addEventListener('resize',closeFilterPopover);
document.addEventListener('scroll',e=>{if(activeFilterPopover&&!activeFilterPopover.contains(e.target))closeFilterPopover()},true);
// A shared temporary definition tooltip, placed outside the scrollable table.
let definitionTip=null,definitionTrigger=null,definitionPinned=false;
const metricDefinitions=Object.create(null);
metricDefinitions['團險實動率']='模擬資料：選定期間團險實動人數 ÷ 經營人員數 × 100%。依人員及統計期間固定模擬，非實際團險業績。';
metricDefinitions['理賠後購買個險FYN']='模擬資料：理賠後購買個險之FYN，依職域及統計期間固定模擬。';
metricDefinitions['FYC累月成長率']='選定年度累月FYC與去年相同月份累計FYC比較；若無可用比較基期，採固定模擬成長率。';
metricDefinitions['三天內回覆預約率']='三天內回覆數 ÷ 已回覆預約數 × 100%；無已回覆預約時以0%顯示。';
function closeDefinition(){
 if(definitionTip)definitionTip.remove();
 if(definitionTrigger)definitionTrigger.removeAttribute('aria-describedby');
 definitionTip=null;definitionTrigger=null;definitionPinned=false;
}
function showDefinition(trigger,col,pinned=false){
 if(definitionTrigger===trigger&&definitionTip){
  definitionPinned=pinned||definitionPinned;return;
 }
 closeDefinition();
 const tip=el('div','np-definition-tooltip',metricDefinitions[col]||'定義待補');
 tip.id='npMetricDefinition';tip.setAttribute('role','tooltip');
 document.body.append(tip);
 definitionTip=tip;definitionTrigger=trigger;definitionPinned=pinned;
 trigger.setAttribute('aria-describedby',tip.id);
 const rect=trigger.getBoundingClientRect(),viewport=document.documentElement.clientWidth;
 const width=tip.offsetWidth,height=tip.offsetHeight;
 const left=Math.max(8,Math.min(viewport-width-8,rect.left+(rect.width-width)/2));
 const above=rect.top-height-8;
 tip.style.left=left+'px';
 tip.style.top=(above>=8?above:Math.min(window.innerHeight-height-8,rect.bottom+8))+'px';
}
document.addEventListener('pointerdown',e=>{
 if(definitionTrigger&&!definitionTrigger.contains(e.target))closeDefinition();
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDefinition()});
window.addEventListener('resize',closeDefinition);
document.addEventListener('scroll',closeDefinition,true);
function headerCell(tr,col,entries,valueOf,displayOf){
 const th=el('th','np-th'),box=el('div','np-col-head');
 const label=el('button','np-col-label',col);
 label.type='button';label.setAttribute('aria-label',col+'，查看指標定義');
 // Mouse hover and keyboard focus are temporary; a touch/click toggles the box.
 label.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'||e.pointerType==='pen')showDefinition(label,col)});
 label.addEventListener('pointerleave',()=>{if(definitionTrigger===label&&!definitionPinned)closeDefinition()});
 label.addEventListener('focus',()=>{if(label.matches(':focus-visible'))showDefinition(label,col)});
 label.addEventListener('blur',()=>{if(definitionTrigger===label)closeDefinition()});
 label.onclick=()=>{
  if(definitionTrigger===label&&definitionPinned)closeDefinition();
  else showDefinition(label,col,true);
 };
 const sorted=state.sort.col===col,direction=sorted?state.sort.dir:1;
 const sort=el('button','np-sort-btn'+(sorted?' is-active':''));
 sort.textContent=direction===1?'▲':'▼';sort.type='button';
 th.setAttribute('aria-sort',sorted?(direction===1?'ascending':'descending'):'none');
 sort.title=col+'：'+(sorted?(direction===1?'正序（點擊改為反序）':'反序（點擊改為正序）'):'點擊正序排列');
 sort.setAttribute('aria-label',sort.title);
 sort.onclick=()=>{state.sort=state.sort.col===col?{col,dir:-state.sort.dir}:{col,dir:1};state.page=0;render()};
 const filter=el('button','np-filter-btn'+(state.filters[col]?' is-active':''));filter.type='button';
 filter.append(filterIcon());filter.title='篩選 '+col+(state.filters[col]?'（已套用）':'');
 filter.setAttribute('aria-label','篩選 '+col);
 filter.setAttribute('aria-haspopup','dialog');filter.setAttribute('aria-expanded','false');
 filter.onclick=()=>openFilterPopover(filter,col,entries,valueOf,displayOf);
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
function isMetricDanger(conf,name,value){
 const numeric=normalizedValue(value);
 return (name.includes('成長率')&&typeof numeric==='number'&&Number.isFinite(numeric)&&numeric<0)||
  (conf.name==='台積電'&&isDanger(name,numeric));
}
function appendMetricCell(row,conf,col,stats,members,depth,pathLabel){
 const cell=el('td'),value=metric(col,stats),display=fmt(col,value);
 if(isMetricDanger(conf,col,value))cell.classList.add('np-cell-danger');
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
   rows.push({site:info.site,member:a.member,ordinal:rows.length+1,values:{
    '駐廠職域名稱':name||'未提供名稱','職域代碼':code||'未提供代碼',
    '駐廠人員':a.member.path[3],'駐廠人員通訊處':a.member.path[2],
    '駐廠頻率(1周駐廠次數)':a.frequency===6?'不定期':a.frequency,
    '駐廠時數(一周駐廠時數)':hours,
    'FYC':Math.round(info.fyc*100)/100,'FYC累月成長率':info.prior!==0?(info.fyc-info.prior)/Math.abs(info.prior)*100:estimate(key+'|'+p.label+'|no-prior-yoy',-80,180)/10,
    'FYN':Math.round(info.fyn*100)/100,'FYP':Math.round(info.fyp*100)/100,
    '理賠件數':info.claims,'理賠後購買個險FYN':Math.round(info.claims*estimate(key+'|'+p.label+'|claims-conversion',10,60)/100),'員工人數':employees,'LINE OA加入人數':joined,
    'LINE OA預約數':info.appointments,'LINE OA 未回覆預約數':info.unreplied,
    '三天內回覆預約率':completed?info.timely/completed*100:0,'出勤率':a.attendance
   }});
  }
 }
 return rows;
}
// Each site is represented once; the existing detail rows retain person assignments.
function parkingSummaryRows(assignments){
 const sites=new Map();
 for(const entry of assignments){
  const id=entry.site.id;
  if(!sites.has(id))sites.set(id,{site:entry.site,ordinal:sites.size+1,assignments:[],values:{...entry.values}});
  sites.get(id).assignments.push(entry);
 }
 for(const entry of sites.values()){
  const rows=entry.assignments,people=new Set(),offices=new Set();
  let frequency=0,irregular=0;
  for(const row of rows){
   const member=row.member;
   people.add(JSON.stringify(member.path));
   offices.add(JSON.stringify(member.path.slice(0,3)));
   const f=row.values['駐廠頻率(1周駐廠次數)'];
   if(typeof f==='number')frequency+=f;else irregular++;
  }
  Object.assign(entry.values,{
   '駐廠通訊處數':offices.size,'駐廠人數':people.size,
   '駐廠頻率(1周駐廠次數)':irregular?(frequency?frequency+' + 不定期':'不定期'):frequency
  });
 }
 return [...sites.values()];
}
function returnToParkingSummary(){
 const data=state.detail;
 delete data.siteId;delete data.siteLabel;
 const previous=data.summaryTable;
 delete data.summaryTable;
 resetTable();
 if(previous)Object.assign(state,previous);
 render();
}
function openParkingPersonDetail(entry){
 const data=state.detail;
 data.summaryTable={sort:state.sort,filters:state.filters,page:state.page};
 data.siteId=entry.site.id;
 data.siteLabel=entry.values['駐廠職域名稱'];
 resetTable();render();
 $('npSections').scrollIntoView({block:'start',behavior:'smooth'});
}
function detailSection(conf,p){
 const data=state.detail,allSites=memberSites(data.members);
 const sec=el('section','np-domain');sec.style.setProperty('--np-accent',conf.color);
 const fallback=conf.name==='台積電'
  ?['據點名稱','職域代碼','經營人員數','FYC','今年個險保單數','據點地址']
  :['據點名稱','職域代碼','經營人員數','FYC','FYN','FYP','理賠件數','據點地址'];
 const parking=conf.name==='駐廠職域';
 const summary=parking&&data.siteId===undefined;
 const cols=summary?parkingSummaryColumns.slice():parking?parkingColumns.filter(c=>state.mode==='year'||!c.includes('成長率')):[...(data.depth===4?(conf.sites4||fallback):(conf.sites3||fallback))];
 const addressIndex=cols.indexOf('據點地址');
 if(addressIndex>=0)cols.splice(addressIndex,0,'職域分級','郵遞區號','職域人數','其他人員數');
 const assignments=parking?parkingRows(data.members,conf,p):[];
 const allRows=summary?parkingSummaryRows(assignments):parking?assignments.filter(entry=>entry.site.id===data.siteId).map((entry,i)=>({...entry,ordinal:i+1})):allSites.map((site,i)=>({site,ordinal:i+1}));
 const valueOf=(entry,col)=>col==='序號'?entry.ordinal:parking?entry.values[col]:siteValue(col,entry.site,p);
 const displayOf=(entry,col)=>{const value=valueOf(entry,col);return col==='序號'?value:parking?(col.startsWith('駐廠頻率')?String(value):fmt(col,value)):value};
 const rows=orderedRows(allRows,valueOf,displayOf);
 const count=rows.length+(rows.length!==allRows.length?' / '+allRows.length:'')+(summary?' 個職域':parking?' 筆駐廠分派':' 筆據點');
 $('npBreadcrumb').append(el('span','np-crumb-count','（'+count+'）'));
 sec.setAttribute('aria-label',conf.name+(summary?'職域統計':parking?'駐廠人員明細':'據點明細'));
 const wrap=el('div','np-table-wrap'),table=el('table','np-table'),thead=el('thead'),tr=el('tr');
 if(!summary)headerCell(tr,'序號',allRows,valueOf,displayOf);
 cols.forEach(x=>headerCell(tr,x,allRows,valueOf,displayOf));
 thead.append(tr);table.append(thead);
 const tb=el('tbody'),pageSize=35,lastPage=Math.max(0,Math.ceil(rows.length/pageSize)-1);
 state.page=Math.min(state.page,lastPage);
 rows.slice(state.page*pageSize,(state.page+1)*pageSize).forEach(entry=>{
  const row=el('tr');if(!summary)row.append(el('td','',entry.ordinal));
  cols.forEach(c=>{
   const value=valueOf(entry,c),cell=el('td','',displayOf(entry,c));
   if(summary&&c==='駐廠人數'){
    const btn=el('button','np-number-link',displayOf(entry,c));btn.type='button';btn.title='查看 '+entry.values['駐廠職域名稱']+' 駐廠人員明細';btn.onclick=()=>openParkingPersonDetail(entry);cell.replaceChildren(btn);
   }
   if(isMetricDanger(conf,c,value))cell.classList.add('np-cell-danger');
   row.append(cell);
  });
  tb.append(row);
 });
 if(!rows.length){
  const empty=el('tr'),cell=el('td','np-empty','沒有符合條件的職域');
  cell.colSpan=cols.length+(summary?0:1);empty.append(cell);tb.append(empty);
 }
 table.append(tb);wrap.append(table);sec.append(wrap);
 if(summary)sec.append(el('p','np-footnote','職域業績依現有分攤口徑；駐廠頻率為固定分派每週次數加總，不定期另列。理賠件數及理賠後購買個險FYN等缺乏原始來源的指標採固定模擬值。'));
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
 const entries=groups(members,state.path.length).map(([label,group],ordinal)=>({
  label,group,stats:aggregate(group,conf,p),ordinal
 })).filter(entry=>entry.stats.sites>0);
 const valueOf=(entry,col)=>col==='組織'?entry.label:metric(col,entry.stats);
 const displayOf=(entry,col)=>col==='組織'?entry.label:fmt(col,valueOf(entry,col));
 headerCell(tr,'組織',entries,valueOf,displayOf);cols.forEach(col=>headerCell(tr,col,entries,valueOf,displayOf));
 thead.append(tr);table.append(thead);
 const tb=el('tbody');
 const visible=orderedRows(entries,valueOf,displayOf);
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
 const divider=()=>nav.append(el('span','np-crumb-divider','›'));
 const current=label=>nav.append(el('span','np-crumb-current',label));
 const add=(label,i)=>{
  const btn=el('button','np-crumb',label);btn.type='button';
  btn.disabled=state.path.length===i&&!state.detail;
  btn.onclick=()=>{state.path=state.path.slice(0,i);state.detail=null;resetTable();render()};
  nav.append(btn);
 };
 add('通路總計',0);
 state.path.forEach((name,i)=>{divider();add(name,i+1)});
 if(!state.detail)return;
 const data=state.detail;
 // The selected row is one level deeper than state.path; show it once.
 const prefix=state.path.length?state.path.join(' / ')+' / ':'';
 const scope=prefix&&data.pathLabel.startsWith(prefix)?data.pathLabel.slice(prefix.length):data.pathLabel;
 if(scope!=='通路總計'&&scope!==state.path.at(-1)){divider();current(scope)}
 divider();
 if(data.confName==='駐廠職域'){
  if(data.siteId!==undefined){
   const summary=el('button','np-crumb','職域統計');summary.type='button';summary.onclick=returnToParkingSummary;
   nav.append(summary);divider();current(data.siteLabel+' 人員明細');
  }else current('職域統計');
 }else current('據點明細');
}

function render(){
 closeDefinition();
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
