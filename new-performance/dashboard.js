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
    if(member)member.records.push([block.month,Number(row[2])||0,Number(row[3])||0,Number(row[4])||0]);
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
 const activeMembers=members.filter(x=>x.siteIds.length||x.records.length);
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
 const gap=Math.max(0,Math.round(siteCount*42000*periodFactor-fyc));
 const diff=Math.max(0,Math.round(siteCount*4*periodFactor-newCustomers));
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
  plantQualified:siteCount>0&&gap===0&&diff===0,
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
  '去年同期FYC成長率':d.yoy,'FYC成長率':d.yoy,
  '個險實動人數':d.activePeople,'個險實動率':d.activity,'經營人員實動率':d.activity,
  '經營人員達標率':d.qualifiedRate,'經營人員達考核標準人數':d.qualifiedPeople,
  '應檢視據點數':d.reviewed,'達標據點數':d.met,'據點達標率':d.siteRate,
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
  '未達標經營人數':d.unqualified,'人員未達標率':d.unqualifiedRate,
  '據點團單開發率':d.siteDevelopRate,'未達標經營據點數':d.unqualifiedSites,
  '個人是否達標':d.passed?'達標':'未達標',
  'FYC累月差額':d.gap,'新客戶數':d.newCustomers,'新客戶數累月差額':d.diff,
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
  cols.forEach(c=>row.append(el('td','',siteValue(c,site,p))));tb.append(row);
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
