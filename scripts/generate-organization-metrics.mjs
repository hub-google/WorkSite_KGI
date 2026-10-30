#!/usr/bin/env node
// Rebuild data/organization-metrics.json from manifest.agents.
// Binary at the unique-salesperson level: an agent contributes at most
// one team (0/1) and one newcomer (0/1). Values never originate from
// workplace-domain or performance rows. Run from repo root:
//     node scripts/generate-organization-metrics.mjs
import fs from 'node:fs';
const manifest=JSON.parse(fs.readFileSync('data/manifest.json','utf8'));
const old=JSON.parse(fs.readFileSync('data/organization-metrics.json','utf8'));
const targetTeams=old.targets?.teamCount ?? old.teamLeaders.length*10;
const targetNewcomers=old.targets?.newcomers ?? old.newcomers.length*5;
if(manifest.agents.length!==old.agentCount)throw Error('Manifest agent index mismatch');
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
const byPerson=new Map();
manifest.agents.forEach((path,i)=>{
 const key=JSON.stringify(path);
 if(!byPerson.has(key))byPerson.set(key,{path,key,i});
});
const centers=new Map();
for(const p of byPerson.values()){
 const region=p.path[0];
 if(!centers.has(region))centers.set(region,{region,people:[],existingTeams:[],existingNewcomers:[]});
 centers.get(region).people.push(p);
}
for(const [field,slot] of [['teamLeaders','existingTeams'],['newcomers','existingNewcomers']]){
 const seen=new Set();
 for(const id of old[field]){
  if(!Number.isInteger(id)||id<0||id>=manifest.agents.length)throw Error('Invalid person ID '+id);
  const key=JSON.stringify(manifest.agents[id]);
  if(seen.has(key))throw Error('Duplicate personnel identity in '+field);
  seen.add(key);
  centers.get(manifest.agents[id][0])[slot].push(id);
 }
}
const list=[...centers.values()].sort((a,b)=>a.region.localeCompare(b.region,'zh-TW'));
if(byPerson.size<Math.max(targetTeams,targetNewcomers))throw Error('More slots requested than distinct people');
for(const center of list){
 const previous=old.generation?.regionTargets?.[center.region];
 const oldTeamCount=previous?.oldTeam ?? center.existingTeams.length;
 const oldNewcomerCount=previous?.oldNewcomers ?? center.existingNewcomers.length;
 center.teamTarget=Math.min(center.people.length,oldTeamCount*10);
 center.newcomerTarget=oldNewcomerCount*5;
 if(center.newcomerTarget>center.people.length)throw Error('Newcomer count exceeds capacity: '+center.region);
}
const remaining=targetTeams-list.reduce((n,g)=>n+g.teamTarget,0);
if(remaining<0)throw Error('Initial team targets exceed grand total');
const spare=list.map(g=>({g,spare:g.people.length-g.teamTarget})).filter(x=>x.spare>0);
const spareTotal=spare.reduce((n,x)=>n+x.spare,0);
if(remaining>spareTotal)throw Error('Insufficient eligible people for requested groups');
const allocation=spare.map(x=>({...x,share:remaining*x.spare/spareTotal}));
for(const x of allocation){x.extra=Math.floor(x.share);x.g.teamTarget+=x.extra}
const leftovers=targetTeams-list.reduce((n,g)=>n+g.teamTarget,0);
allocation.sort((a,b)=>(b.share-b.extra)-(a.share-a.extra)||a.g.region.localeCompare(b.g.region,'zh-TW'));
for(let i=0;i<leftovers;i++)allocation[i].g.teamTarget++;
function grow(g,current,goal,prefix){
 const already=new Set(current.map(i=>JSON.stringify(manifest.agents[i])));
 const available=g.people.filter(p=>!already.has(p.key));
 available.sort((a,b)=>hash(prefix+a.key)-hash(prefix+b.key)||a.i-b.i);
 const add=goal-current.length;
 if(add<0||add>available.length)throw Error('Target smaller than existing or exceeds capacity: '+g.region);
 const chosen=[...current,...available.slice(0,add).map(p=>p.i)].sort((a,b)=>a-b);
 if(new Set(chosen.map(i=>JSON.stringify(manifest.agents[i]))).size!==chosen.length)
  throw Error('One person assigned twice: '+g.region);
 return chosen;
}
for(const g of list){
 g.teams=grow(g,g.existingTeams,g.teamTarget,'org-team-grow-10x-v1|');
 g.newcomers=grow(g,g.existingNewcomers,g.newcomerTarget,'org-newcomer-grow-5x-v1|');
}
const result={
 ...old,
 teamLeaders:list.flatMap(g=>g.teams).sort((a,b)=>a-b),
 newcomers:list.flatMap(g=>g.newcomers).sort((a,b)=>a-b)
};
if(result.teamLeaders.length!==targetTeams||result.newcomers.length!==targetNewcomers)
 throw Error('Grand total mismatch');
fs.writeFileSync('data/organization-metrics.json',JSON.stringify(result));
for(const g of list)console.log(g.region,'人員',g.people.length,'組數',g.teams.length,'新人',g.newcomers.length);
console.log('通路總計','組數',result.teamLeaders.length,'新人',result.newcomers.length);
