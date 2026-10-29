import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';

const manifest=JSON.parse(readFileSync('data/manifest.json','utf8'));
if(manifest.format!=='WorkSiteKGI-demo-real-v1')throw Error('Unexpected manifest format');
const yearly=new Map();
for(const shard of manifest.shards){
 const gz=Buffer.from(readFileSync('data/'+shard.file,'utf8').trim(),'base64');
 const clear=gunzipSync(gz);
 const checksum=createHash('sha256').update(clear).digest('hex').slice(0,16);
 if(checksum!==shard.sha256)throw Error(shard.month+' checksum mismatch');
 const rows=JSON.parse(clear.toString('utf8'));
 if(rows.length!==shard.rows)throw Error(shard.month+' row count mismatch');
 const year=shard.month.slice(0,4);
 const result=yearly.get(year)||{rows:0,fyc:0,fyn:0,premium:0};
 for(const row of rows){
  if(row.length!==12)throw Error(shard.month+' record must contain 12 fields');
  if(!manifest.agents[row[0]]||!manifest.domains[row[1]])throw Error(shard.month+' invalid dimension index');
  if(String(row[9]).length>4)throw Error(shard.month+' policy suffix over 4 characters');
  result.fyc+=Number(row[2]);result.fyn+=Number(row[3]);result.premium+=Number(row[4]);result.rows++;
 }
 yearly.set(year,result);
}
for(const [year,total] of yearly){
 const expected=manifest.audit[year];
 if(!expected)throw Error('Unexpected year '+year);
 for(const field of ['rows','fyc','fyn','premium'])
  if(Math.abs(total[field]-expected[field])>0.001)throw Error(year+' '+field+' mismatch '+total[field]+' versus '+expected[field]);
 console.log(year+' 驗證通過｜列數 '+total.rows+'｜FYC '+total.fyc+'｜FYN '+total.fyn+'｜保費 '+total.premium);
}
console.log('All WorkSite_KGI source snapshots verified.');
