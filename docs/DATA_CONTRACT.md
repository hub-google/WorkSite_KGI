# DATA_CONTRACT｜WorkSite_KGI 資料契約與計算規格

**版本**：1.0｜**基準日**：2026-10-30  
**優先順序**：現行可執行程式（[index.html](../index.html)）與實際資料檔、本文、PRD。新框架要先保證輸入輸出等價。

## 一、資料流

原始 2025／2026 業績 Excel → AQ=1 篩選、組織／商品索引化 → data/manifest.json ＋ data/shards/YYYYMM.txt → 前端讀取／解壓／驗證 → 職域業績 leaf entries → 業績加總／圖表／表格。

組數／新人數另由 data/organization-metrics.json 提供，按 `manifest.agents` 的組織路徑建模，**不依職域**。

原始「所有職域資料.xlsx」＋「職域類別代碼對照.xlsx」→ U=Y、B 職域代碼有效、I/J/K/R 組織完整 → data/worksite-sites.txt → 前端補 siteIds，依選取範圍做 COUNT DISTINCT。

這是**靜態公開資料檔**；沒有 API、資料庫、定時後端計算或身分驗證。

## 二、manifest 與 shard 實際契約

- manifest 路徑：data/manifest.json，version=1，format=WorkSiteKGI-demo-real-v1。
- 含有：visibility、rules、sources、audit、domains、agents、productTypes、payments、products、statuses、rowSchema、shards、notes。
- agents 為四段組織字串陣列：[區域中心, 業務區, 通訊處, 遮罩業務員姓名]；現有 1,728 筆。
- domains 來源順序：[駐廠, 闔家安康, 醫護公會, 新安東京, 台積電]；在 UI 將駐廠正規化為「駐廠職域」。
- 目前 productTypes 5 類、payments 5 類、products 133 類、statuses 2 類（核實、受理）。
- shards 現有 22 個月：202501–202512、202601–202610；每筆 {month, file, rows, sha256}，file 例：shards/202501.txt（5116 列）。
- 每個 .txt 的檔案內容為 UTF-8 Base64 字串，解碼後為 GZIP(JSON 二維陣列)，不是普通 JSON。
- 載入流程：fetch → response.ok → atob((await response.text()).trim()) → Uint8Array → Blob().stream().pipeThrough(new DecompressionStream('gzip')) → new Response(stream).text() → JSON.parse。
- 原程式逐月驗證 rows.length === shards.rows，逐年驗證列數總計 === audit[year].rows；**目前沒有**逐分片重新運算 sha256 來比對 manifest.sha256。

### 2.1 rowSchema：索引不可更動

| index | JSON row 欄位 | 原 Excel／來源 | 資料型別及作用 |
|---:|---|---|---|
| 0 | agentIndex | D～G | 整數索引至 manifest.agents |
| 1 | domainIndex | 職域分類 | 整數索引至 manifest.domains |
| 2 | fyc | K | number，可含沖銷 |
| 3 | fyn | L | number，可為小數／負值 |
| 4 | premium | N | number |
| 5 | productTypeIndex | S | 索引至 productTypes |
| 6 | paymentIndex | AR | 索引至 payments |
| 7 | productIndex | V | 索引至 products |
| 8 | termIndex | R | 年期；可能空值 |
| 9 | policyLast4 | J 最後四碼 | 字串，須保留前導零 |
| 10 | policyHash | J 衍生雜湊 | 隱私識別用途，不顯示完整號碼 |
| 11 | statusIndex | AN | 索引至 statuses |

**工作月不在每筆 row 裡**，而是外層 shard.month（YYYYMM）。載入後每個 leaf entry 以 {month, v: row} 存放。每筆來源只保留符合 AQ=1 的資料。

現有 manifest 年度稽核（列數及數值，不等於去重保單件數）：

| 年度 | 列數 | FYC | FYN | 保費 |
|---|---:|---:|---:|---:|
| 2025 | 76,768 | 190,811,472 | 11,255.5 | 1,863,711,934 |
| 2026 | 66,594 | 162,054,895 | 11,994 | 2,499,199,412 |

分片可能只有部分年份月份（2026 已匯入到十月），不能把尚未匯入月份說成已經有業績。

### 2.2 loadActualData 的處理順序

1. 取 manifest，確認 format。
2. 以 Promise.all 讀入所有列出的月 shard，核對分片及年度筆數。
3. 對每個 row 建 leaf key = String(row[0]) + '|' + String(row[1])；建立 entry = {path: agents[row[0]], domain: normalizeDomain(domains[row[1]]), rows: [], seed: key}。
4. 對 leaf push {month:block.month, v:row}，同人同職域不同月份合在同 entry。
5. 設 actualReady=true；正規化類別和顏色。
6. 再 loadWorksiteData；依完整組織路徑＋職域名稱聯合鍵追加 siteIds:Set。名冊有、業績沒有的組織也可加入 rows:[] 的 leaf。
7. 更新畫面，業績來源失敗時顯示明確的「真實資料讀取失敗」，不能變成 0。

## 三、名冊契約

來源「所有職域資料.xlsx」：A 類別代碼，B 職域代碼，I/J/K/R 四段組織路徑，U 是否在職。類別名稱來自「職域類別代碼對照.xlsx」。篩選 U=Y，I/J/K/R 不空，B 有效；未對照類別 08 從公開統計排除。

data/worksite-sites.txt 為 Base64(GZIP(JSON))，JSON 預期含：v=2、rows=70587、activeRows=62315、sites=38992、categoryMap、groups。每個 groups 元素是固定六欄陣列：

    [orgI, orgJ, orgK, orgR, categoryName, [globalNumericSiteId...]]。

原始總 70,587 列；中繼合條件 62,315 列；匯出 v2 的 38,992 是**前端排除 08 類別前**的基準 DISTINCT B，不是顯示數。現有畫面總計約 38,970 個，必須以當前有效集合重算，**不可把名冊總數硬寫死到表格**。

同一 B 代碼可能出現在不同組織。使用 Set/Map 去重，跨組織 DISTINCT 的合計**不保證**等於所有區域 DISTINCT 小計相加。名冊為現況快照，切換業績月份**不會**得到歷史版的職域數。

## 四、固定雜湊與 DEMO 數據

不得換成 Math.random，所有使用者刷新／切換層級的模擬結果須能重現。現行 32-bit FNV-1a 類型：

    function hash(s) {
      let h=2166136261;
      for(let i=0;i<s.length;i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h,16777619);
      }
      return h >>> 0;
    }

    function count(key,min,max) {
      return min + (hash(key) % (max-min+1));
    }

### 4.1 職域來源業績

對選定 leaf 集合，取符合開始與結束月份的每個 {month,v}：

    result.fyc += Number(v[2]) || 0;
    result.fyn += Number(v[3]) || 0;
    result.premium += Number(v[4]) || 0;

開始與結束是六碼 YYYYMM；去年同期 offset=-1 只減年份，不減月份。不可拿舊版 YYYY-MM-DD 格式和 YYYYMM 比較。

### 4.2 整體通路數據（模擬）

每筆真實職域 FYC 單獨套一個固定倍率：

    const seed='overall-fyc-v2|'+item.seed+'|'+month+'|'
              +String(row[9]??'')+'|'+String(row[7]??'');
    const multiplier=3+(hash(seed)%30001)/10000;
    result.totalFyc += Math.round((Number(row[2])||0)*multiplier);

範圍 3.0000～6.0000；**每筆先 round，然後 sum**，不是「先 sum 再乘」。負值必須遵守 JS Math.round 語義。其餘：

    totalFyn = Math.round(fyn*5*10000)/10000;
    totalPremium = Math.round(premium*5*10000)/10000;

三項整體指標都是模擬，**不是**完整真實通路資料。

### 4.3 組數／新人數：獨立的組織資料（必須上下層可加總）

**2026-10-30 規格異動**：舊版按「業務員＋職域」葉節點產生的 demo-team-v1／demo-newcomer-v1 算法**已廢除**。新值完全獨立於職域類別、績效日期，不能再按職域分攤或顯示，不能沿用舊版 167 組／263 位新人。

正式資料來源位置：**data/organization-metrics.json**，簡化結構如下：

    {
      "format":"WorkSiteKGI-organization-demo-v1",
      "version":1,
      "agentCount":1728,
      "uniqueAgentCount":1724,
      "officeCount":127,
      "teamLeaders":[3,24,31,...],
      "newcomers":[...]
    }

這兩個清單都存 `manifest.agents` 中的 **0-based 人員索引**，而不是職域資料列索引。人員主鍵是 `JSON.stringify([區域中心,業務區,通訊處,業務員])`；原 manifest 有 1728 筆人員索引，但**完整路徑去重後是 1724 人**，同名同路徑必須去重。組數／新人數各自的清單中同一完整路徑最多出現一次。

目前的示範資料產生算法（如需重新生成資料）：

1. 依 manifest.agents 的完整路徑去重（保留首次出現索引），按前三級路徑分出 **127 個通訊處**。
2. 每個通訊處將人員依 `hash('org-team-v3|'+JSON.stringify(fullPath))` 由小到大排序，hash 同值時按 source index；選最前 **1 位**模擬組長，若該處去重人員 ≥20，則選前 **2 位**。各被選中者代表 1 組。
3. 對每名去重人員，以 `hash('org-newcomer-v3|'+JSON.stringify(fullPath))%100<13` 模擬是否為新人。
4. 產生 `teamLeaders: number[]` 及 `newcomers: number[]`（索引升冪），寫成 JSON 供網站載入。此檔案是**固定資料快照**，頁面刷新不重新抽樣。
5. 載入時將兩種人員清單依索引轉回路徑，對每個「路徑前綴」建立加總快取：
   - `[]`（全通路）
   - `[區域中心]`
   - `[區域中心, 業務區]`
   - `[區域中心, 業務區, 通訊處]`
   - `[區域中心, 業務區, 通訊處, 業務員]`
6. 查詢只用 `organizationMetrics(prefix)` 讀取該路徑的單一組織 KPI；類別篩選、職域數、月份切換不會改變這兩項數據。由父層累加的是**組織子路徑**，不是各職域列。

**當前 DEMO 來源快照總計：組數 156、新人數 211**。各中心：北一 29／45、北二 27／25、桃竹 22／34、中嘉 33／49、台南 19／24、高屏 26／34。上層與下層加總須一致。因為是模擬值，正式資料串接後應由組織人事／編制資料表替換，不應和 K/L/N 業績表相混。

**表格渲染契約**：欄位順序為「區域中心（或當層名稱）→ 組數 → 新人數 → 職域 → 職域 KPI」。組數／新人數各僅一個數字，和組織名稱同樣以 `rowSpan=職域分類數+1` 跨列，通路總計亦只顯示一次。這兩欄仍由指標顯示／隱藏的 `VISIBLE` Set 控制；隱藏後不能留下空白占位格。

### 4.4 經營人員數、達標人員數、實動率

對某個 scope 的來源列，取 id = item.path.join('|')；Map(id, sumFYN)，同一人在多職域只算一次。

- operators = Map.size。
- achievedOperators = 每位 id 固定雜湊結果，若 hash('agent-achievement-outcome-v2|'+id)%10000 < (50+hash('agent-achievement-rate-v2|'+id)%41)*100 則計 1；機率 50%～90%。
- activityRate = round(1000 * COUNT(ids where sumFYN>0) / COUNT(ids)) / 10，單位 %。
- 這些是去重集合：子職域加總可能大於組織去重人數；但固定結果要保證**父集合達標數 >= 任一子集合達標數**。
- 用完整遮罩姓名＋組織當 id 是 DEMO 權宜作法，正式版應改後端真實唯一員工 ID，避免同名。

### 4.5 職域數與達標職域數

    const distinct=new Map();
    for (const item of items)
      for (const siteId of item.siteIds||[])
        distinct.set(siteId,item.domain);
    worksites=distinct.size;

    active=0;
    for(const [siteId,domain] of distinct) {
      const rate=30+hash('worksite:target:rate:'+domain)%61;
      if(hash('worksite:target:status:'+siteId)%10000<rate*100)
        active++;
    }

達標職域數**模擬**，按 site ID 固定判斷、按類別 30%～90% 機率；如果同一 ID 對應多類別，現行 Map.set 會採後掃描的 domain，若要讓不同平台 100% 一樣，迭代順序也必須保留或在資料清洗先統一分類。

### 4.6 職域百分比：兩種不同分母

**表格占比**：

- fycShare = row.fyc / parentOrganizationTotal.fyc × 100%；
- fynShare = row.fyn / parentOrganizationTotal.fyn × 100%；
- premiumShare = row.premium / parentOrganizationTotal.premium × 100%。
- 同組織總計列在分母非 0 時為 100.0%；通路層各職域以通路該 KPI 總額作分母。
- 中嘉區域闔家安康：19,556,075 / 38,324,797 = **51.0%**（一位小數）。
- **禁止**以模擬整體 KPI 作為上述三個占比的分母。

**圓環中央的「職域佔整體」**：

    workplaceRatio = 100 * sum(realWorksiteKPI) / simulatedWholeKPI;
    otherValue = simulatedWholeKPI - sum(realWorksiteKPI);

**去年同期**：

    growth = 100 * (current - previousSameMonths) / previousSameMonths;

分母 0、null 或來源無值時顯示「—」，不能除以 0；百分比顯示小數一位。

## 五、詳細分類與明細

商品彈窗維度：

- 商品別：manifest.productTypes[row[5]]。
- 繳別：manifest.payments[row[6]]。
- 商品名稱：manifest.products[row[7]]。
- 年期：row[8] 空值→未分類，否則 String(row[8])+'年'。
- 被點擊 KPI 對應原始索引 fyc=2、fyn=3、premium=4，按分類 sum，再依金額降冪排序。
- 商品彈窗只支援**真實職域** KPI；對 totalFyc/totalFyn/totalPremium 的模擬全通路 KPI，現行沒有正式商品明細來源。

業務員層「保單資料列」顯示職域、工作月份 YYYY/MM、String(row[9]).slice(-4)；資料列數非去重保單件數。完整 J 欄不得暴露。

## 六、類別預設排序（尤其重要）

全通路 2026-01～當下台灣月份（來源 FYC 總額）作職域類別排序，並於每個中心、業務區、通訊處、業務員沿用同一順序；2026-10-30 類別為：

    闔家安康 → 台積電 → 醫護公會 → 駐廠職域 → 新安東京。

實作使用 forEachActualRow(entries,taipeiYear+'01',currentMonth,callback)，**不可用 yyyy+'-01-01' 舊格式**。同比三卡依「本卡今年該指標」降冪；圓環依該期間該指標降冪，**其他**固定最後。組織中心仍依指定六區域順序。

## 七、來源稽核與品質門檻

需驗證：分片數和稽核列數、相同日期的來源 KPI 與 audit、負數和小數保留、年末／跨年日期、同人跨職域去重、同職域跨區域去重、模擬指標穩定性、父子區域加總、百分比分母、202610↔202510 同期。參見 [驗收清單](ACCEPTANCE_TESTS.md)。

**風險**：目前 GitHub Pages 和 data 皆公開；靜態資料不等於正式授權；來源已遮罩也不構成完整個資保護。正式版上線前必須另做 SSO、後端行級授權、完整資料安全設計。
