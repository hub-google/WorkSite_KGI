// 新績效管理：以正式 GitHub Pages 的真實 DOM 驗收四職域。
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const target=process.env.NEW_PERFORMANCE_URL || 'https://hub-google.github.io/WorkSite_KGI/new-performance/';
await mkdir('ui-evidence',{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});
const result=[];
async function check(name,fn){
  try{await fn();result.push({name,ok:true});console.log('PASS '+name);}
  catch(e){result.push({name,ok:false});console.error('FAIL '+name+': '+e.message);}
}
async function columns(){return page.locator('#npSections thead th .np-col-label').allTextContents();}
async function rows(){return page.locator('#npSections tbody tr:not(.np-grand-total)').count();}
async function chooseDomain(name){await page.selectOption('#npDomainSelect',name);await page.waitForFunction(v=>document.getElementById('npDomainSelect')?.value===v,name);}
async function drill(n){for(let i=0;i<n;i++){await page.locator('#npSections tbody .np-link').first().click();await page.waitForTimeout(100);}}
async function valuesIn(col){
  const heads=await columns(),index=heads.indexOf(col);
  assert.ok(index>=0,'找不到指標 '+col);
  return page.locator('#npSections tbody tr:not(.np-grand-total) td:nth-child('+(index+1)+')').allTextContents();
}
try{
  const response=await page.goto(target,{waitUntil:'domcontentloaded',timeout:75000});
  assert.ok(response?.ok(),'頁面 HTTP 狀態 '+response?.status());
  await page.waitForSelector('#npDomainSelect',{timeout:75000});
  await page.waitForFunction(()=>document.querySelector('#npSections tbody tr td') && !document.getElementById('npNotice')?.textContent?.includes('失敗'),{timeout:75000});
  await check('年度切換',async()=>{
    await page.locator('[data-np-mode="year"]').click();
    assert.equal(await page.locator('[data-np-mode="year"]').getAttribute('aria-pressed'),'true');
  });
  await check('FYC 全額千分位、非萬單位',async()=>{
    const data=await valuesIn('FYC');
    assert.ok(data.some(v=>/\d{1,3},\d{3}/.test(v)),'沒有千分位的 FYC 資料');
    assert.ok(data.every(v=>!v.includes('萬')),'出現萬單位');
  });
  await check('闔家安康業務員未達標標紅',async()=>{
    await chooseDomain('闔家安康');await drill(3);
    assert.ok((await columns()).includes('年度經營人員標準是否達標'));
    const marked=await page.locator('#npSections tbody td.np-cell-danger').count();
    const red=await page.locator('#npSections tbody td').evaluateAll(cells=>cells.filter(x=>x.textContent.trim()==='未達標').every(x=>x.classList.contains('np-cell-danger')));
    assert.ok(red,'存在未達標但沒有紅字的欄位');
    console.log('闔家未達標紅字欄位：'+marked);
    await page.screenshot({path:'ui-evidence/01-family-agent.png',fullPage:true});
  });
  await check('醫護通訊處實動人數與業務員紅字',async()=>{
    await chooseDomain('醫護職域');await drill(2);
    assert.ok((await columns()).includes('個險實動人數'),'通訊處層缺少實動人數');
    await drill(1);
    assert.ok((await columns()).includes('個人是否達標'),'業務員層缺少達標');
    const red=await page.locator('#npSections tbody td').evaluateAll(cells=>cells.filter(x=>x.textContent.trim()==='未達標').every(x=>x.classList.contains('np-cell-danger')));
    assert.ok(red,'醫護未達標沒有紅字');
    await page.screenshot({path:'ui-evidence/02-medical-agent.png',fullPage:true});
  });
  await check('駐廠預設 FYC 降冪、正成長不加號',async()=>{
    await chooseDomain('駐廠職域');
    assert.ok((await columns()).includes('FYC'));
    const heads=await columns(),index=heads.indexOf('FYC')+1;
    const v=(await page.locator('#npSections tbody tr:not(.np-grand-total) td:nth-child('+index+')').allTextContents()).map(t=>Number(t.replaceAll(',',''))).filter(Number.isFinite);
    assert.ok(v.length>1,'不足兩筆 FYC 資料');
    assert.deepEqual(v,[...v].sort((a,b)=>b-a),'FYC 未依降冪排列');
    const yoy=await valuesIn('FYC累月成長率');
    assert.ok(yoy.every(x=>!x.trim().startsWith('+')),'成長率出現 + 正號');
  });
  await check('駐廠業務員層與其他職域同樣統計',async()=>{
    await drill(3);
    const head=await columns();
    assert.ok(head.includes('FYC')&&head.includes('駐廠職域數'));
    assert.ok(!head.includes('駐廠職域名稱')&&!head.includes('職域代碼'),'業務員層誤放單一職域名稱/代碼');
    await page.screenshot({path:'ui-evidence/03-parking-agent.png',fullPage:true});
  });
  await check('駐廠據點明細：代碼末欄且可複製',async()=>{
    await page.locator('#npSections tbody .np-number-link').first().click();
    const head=await columns();
    assert.equal(head.at(-1),'職域代碼');
    assert.ok(await page.locator('#npSections tbody .np-code-copy').count()>0,'職域代碼缺少複製按鈕');
    const rows=await page.locator('#npSections tbody tr').count();
    assert.ok(rows>0,'沒有據點明細');
    await page.screenshot({path:'ui-evidence/04-parking-site-copy.png',fullPage:true});
  });
  await check('回歸：台積電基本表格',async()=>{
    await chooseDomain('台積電');
    assert.ok((await columns()).includes('FYC'));
    assert.ok(await rows()>0,'台積電沒有列');
  });
}catch(e){result.push({name:'頁面載入或初始化',ok:false});console.error(e.stack||e.message);}
finally{await browser.close();}
console.log(JSON.stringify(result,null,2));
if(result.some(r=>!r.ok))process.exitCode=1;
