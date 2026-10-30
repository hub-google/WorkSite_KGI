# IMPLEMENTATION_SPEC｜WorkSite_KGI 100% 復刻工程規格

**文件版本**：1.0｜**基準日**：2026-10-30｜**不可替代的可執行參考**：[index.html](../index.html)  
**產品需求**：[PRD.md](../PRD.md)｜**資料契約**：[DATA_CONTRACT.md](DATA_CONTRACT.md)｜**QA**：[ACCEPTANCE_TESTS.md](ACCEPTANCE_TESTS.md)。

## 0. 先決條件：何謂「100% 復刻」

復刻驗收的基準不是讓設計師「大概畫得像」，而是對**固定版本**的現有主分支源碼、資料及瀏覽器可觀察行為做 parity：

1. **路由**：五頁網址與根目錄導轉完全一致，能直接開、重整、回上一頁／下一頁。
2. **視覺**：桌機和手機同斷點下，比對 side bar、表頭、字體、格線、間距、圓環 SVG、圖表與彈窗；CSS 原樣為 golden source。
3. **DOM／可存取性**：元素、按鈕、dialog、details、aria-label、aria-current 等互動角色與可操作性一致。
4. **數據**：相同來源快照、日期、選取範圍，數值原始精度與畫面格式一致，所有 DEMO 隨機值使用相同 deterministic seed。
5. **操作**：欄位鏡像、篩選與排序、下鑽、彈窗、回報表單、手機導覽與歷史狀態。
6. **邊界**：來源無資料、分母為零、未來月份、API 不存在、未儲存表單的行為也須一致。
7. **安全狀態**：現有公開 DEMO 不等於可部署正式真實營運資料。正式版若新增驗證與後端，需隔離規格變更，不得默默改算式。

**唯一精確程式基準**：2026-10-30 組織欄改版後的來源提交 SHA **7f826c6d870fe74728d8854cf35a3162446c1405**；主應用當時的 blob SHA **32a0c94c67d7276cc478ead932189b01cceecf75**。本文件及擷取的 CSS/DOM 均基於該版本。其後若來源變更，須一併更新本文、靜態快照和驗收畫面。

## 1. 可用的參考資產：不要另造 UI

| 文件／資產 | 用途 | 是否可直接作基準 |
|---|---|---|
| [../index.html](../index.html) | 完整 head、CSS、body、JS、可執行 DEMO | **最高優先；能直接執行** |
| [REFERENCE_STYLE.css](REFERENCE_STYLE.css) | 從基準 index.html 的 style 標籤逐字擷取，約 26.5KB | **所有視覺 CSS 的精確快照** |
| [REFERENCE_MARKUP.html](REFERENCE_MARKUP.html) | 從基準 index.html 擷取的 body HTML 片段（不含 JS） | **頁面結構與 ID 的精確快照** |
| [../performance/index.html](../performance/index.html) | 獨立績效網址載入殼 | 路由程序參考 |
| [../news/index.html](../news/index.html) | 最新消息網址載入殼 | 同上 |
| [../resources/index.html](../resources/index.html) | 經營資源網址載入殼 | 同上 |
| [../stories/index.html](../stories/index.html) | 達人經驗談網址載入殼 | 同上 |
| [../worksite-report/index.html](../worksite-report/index.html) | 職域回報網址載入殼 | 同上 |
| [../data/manifest.json](../data/manifest.json) | 年度稽核、商品代碼、業務員路徑、分片索引 | **不能自行發明資料欄位** |
| [../data/worksite-sites.txt](../data/worksite-sites.txt) | 名冊去重識別與層級歸屬 | **需保留資料基準** |
| [../data/organization-metrics.json](../data/organization-metrics.json) | 組數／新人數獨立組織資料，人員與通訊處底層模擬 | **不要按職域分攤** |

**重要**：REFERENCE_MARKUP.html 是結構片段，不是可以獨立直接開啟的整頁；REFERENCE_STYLE.css 是 CSS 快照，仍由 index.html 內嵌 style 執行。重寫框架可引入兩份快照的內容，但必須保留相同結果。

## 2. 部署架構與路由

### 2.1 技術堆疊

目前不依賴 React／Vue／Next 或伺服器模板；全部寫在 HTML + 原生 CSS + JavaScript，數據在 browser memory 計算。圖表是 SVG 原生路徑，沒有第三方 chart package。GitHub Pages 掛在 **/WorkSite_KGI/** 專案子路徑而非網域根目錄。

### 2.2 URL 與頁面處理

| slug | pathname | 顯示 section | 標題 |
|---|---|---|---|
| performance | /WorkSite_KGI/performance/ | #performance | 績效管理 |
| news | /WorkSite_KGI/news/ | #news | 最新消息 |
| resources | /WorkSite_KGI/resources/ | #resources | 經營資源 |
| stories | /WorkSite_KGI/stories/ | #stories | 達人經驗談 |
| worksite-report | /WorkSite_KGI/worksite-report/ | #worksiteReport | 職域新增、調整、刪除回報 |

根目錄 /WorkSite_KGI/ 和 /WorkSite_KGI/index.html：立即以 location.replace 轉至 /WorkSite_KGI/performance/，保留 query/hash，避免返回迴圈。

每個 slug/index.html 是實體 GitHub Pages 文件：先顯示「正在載入○○…」；以 fetch('/WorkSite_KGI/index.html',{cache:'no-store'}) 抓**同一份共用 app**，驗證包含 #sidebar 及 PAGE_ROUTES，document.open()/write()/close() 注入共用 HTML。其 href path 保持原先 slug。主文件必須包含：

    <base href="/WorkSite_KGI/">

如缺 base，深路徑下 fetch('data/...') 會錯誤跑去 /WorkSite_KGI/news/data/...。主文件 script 的 routedView() 根據 location.pathname 最後一段判斷 slug。

### 2.3 狀態及 History

- PAGE_ROUTES 物件將繁體中文 menu label 對應 slug。
- 側邊欄每項真實 a.nav[href=...]；正常左鍵 click 時 preventDefault + history.pushState + showView(name)，使其在同分頁切換；修飾鍵/其他按鍵交給瀏覽器。
- showView() 更新 .nav.active、aria-current="page"、#pagetitle、document.title、#subtitle、五個 section 的 hidden 狀態與當前提示。
- window.popstate 依 routedView() 還原視圖；行動端點選後 toggleMenu(false)。
- 首次進入 performance 時 performanceInitialized=true，再 render() 和 loadActualData()；其他頁無須先下載業績資料。
- 頁面重新整理時**返回該 slug**，不應全部回 performance；但根目錄本身例外。
- 頁面的篩選狀態目前主要保存在**記憶體**，不要假設重整可保留所有細部篩選（現版未實作 URL query 同步）。

## 3. DOM 樹／元件分割（用 ID 做精確對照）

參考 [REFERENCE_MARKUP.html](REFERENCE_MARKUP.html)；接手者使用下列區塊拆成元件，必須保留同等事件與可存取性：

    body
      #cover (.closecover)
      #sidebar (.sidebar)
        .brand
        a.nav[data-view] × 5
      .main
        header.top
          #hamb
          #versionStamp
        main.content
          .pagehead
            #pagetitle
            #subtitle
          #performance
            .panel.filter
              input#start   // YYYYMM start
              input#end     // YYYYMM end
              button#apply
              #period
              #realDataStatus
            #summaryDashboard
              #dashboardTitle
              #chartMetricFilter
              #dashboardMetricBtn
              #dashboardMetricMenu
              #dashboardMetricChecks
              #dashboardGrid    // dynamic current/prior donut
            #yoyWrap
              #yoyPeriod
              #yoyGrid          // dynamic FYC/FYN/premium comparisons
            KPI table
              #leveltitle
              #crumb
              #policyDetailBtn
              #orgFilterRoot / #orgFilterBtn / #orgFilterMenu
              #orgFilterTitle / #orgFilterAll / #orgFilterNone / #orgFilterList
              #domainFilterRoot / #domainFilterBtn / #domainFilterMenu
              #domainFilterAll / #domainFilterNone / #domainFilterList
              #metricBtn / #metricMenu / #metricChecks
              #thead / #tbody
              組織名稱欄、組數／新人數獨立合併欄、職域明細欄
              #tbody td.org-metric-cell（每組織僅一組；rowSpan 包含小計）
            dialog#metricDetailDialog
              #detailTitle / #detailScope / #detailClose
              #detailDimension / #detailTotal / #detailCategory
              #detailRows / #detailEmpty
            dialog#policyDetailDialog
              #policyTitle / #policyScope / #policyClose
              #policyAgent / #policyCount / #policyRows
              #policyEmpty / #policyConsistency
          #resources
          #stories
          #news
          #worksiteReport
            form#reportForm
              #reportAddFields / #reportDeleteFields
              #reportCity / #reportDistrict
              #reportResult
          #placeholder

目前 dynamic 圓環由 renderDashboard() 組裝 .metric-card.pie-card.ring-card、svg.pie-svg.ring-svg.ring-labeled，而非預先寫死 svg markup。表格表頭由 render() 重建，篩選器需先移出舊表頭、在建表後重新移入正確宿主；不得不小心刪掉原有 listener。


### 3.1 組織指標是與職域分離的第一級表格欄位

在 `render()` 中先分離 `orgCols=TABLE_METRICS.filter(key => ORGANIZATION_METRICS.has(key) && VISIBLE.has(key))` 與其他 `cols`。表頭順序必須是：**當前組織層級 → 組數 → 新人數 → 職域 → 職域相關指標**。組數、新人數仍保留在 METRICS/TABLE_METRICS/VISIBLE，以沿用原本「顯示／隱藏指標」雙向同步；但不在 domain row 的 KPI 迴圈輸出。

對每個組織的首列：組織儲存格、組數、新人數各自設定 `rowSpan=shownDomains.length+1`；另外表格下方的「總計」是同樣設 rowspan 的合計儲存格。**不得**在每個職域 row 上插一個組數／新人數；也不得只在組織小計再重複一份。當任一個欄位取消勾選時，其表頭與合併儲存格一起消失。

跨組織總計：只累加當前顯示的各個組織 `organizationMetrics([...path,name])`；下鑽則直接查詢加長的組織路徑。此兩項不受職域篩選，且現行依模擬名冊快照，不會隨月份變化。點這兩欄的表頭可以排序組織，不能以 `sum(items)` 返回的 null 來排序。

正式後端實作時，資料模型必須拆成`organization`／`office`／`person` 等組織主體與 `worksite performance` 職域資料主體；不要在保單業績分類列建立 teamCount/newcomers 屬性。

## 4. CSS 精確復刻條件

**不要只看以下概略數值就自行重畫**；以 [REFERENCE_STYLE.css](REFERENCE_STYLE.css) 完整逐條 selector（含後置覆寫及 media rules）為準，保留 CSS cascade 優先序。

| 元件 | 關鍵 CSS／數值 |
|---|---|
| body | 背景 #f4f7fb；字體 system-ui / -apple-system / Noto Sans TC |
| sidebar | fixed、238px、背景 #13273f、字色 #d6e3ef、z-index 30、transition .22s |
| .brand | 18px、weight 800、padding 27px 20px |
| .nav | width calc(100% - 20px)、margin 4px 10px、padding 14px、radius 10px |
| .nav.active | #23506d、白字、粗體；hover #31506a |
| .main | margin-left 238px |
| .top | sticky top 0、高 68px、white、z-index 12、padding 0 24px |
| .content | max-width 1750px、padding 30px clamp(14px,3vw,40px) |
| .panel | white、border 1px #e1e8ef、radius 14px、陰影 |
| .filter | padding 20px、flex、gap 14px、換行 |
| .metric-card | radius 14px、border #dfe8f0、padding 19px |
| #thead th（**後置覆寫**） | #204a69、white、weight 800、font 13px、padding 16px 13px、bottom border 3px #12364f |
| .subtotal | #e9f4fa、weight 800 |
| #tbody td.org-metric-cell | 組織層級合併儲存格、背景 #f4f8fb、tabular-nums；總計背景 #fff5cc；獨立於職域列 |
| .total | #fff9d4、weight 800 |
| .ring-svg | 大型 730×555 viewBox SVG、資料文字／線直接在圖上 |
| @media(max-width:900px) | sidebar 抽屜 translateX(-238px)、main margin-left 0；cover 遮罩 |
| 1040px / 650px / 620px / 430px 斷點 | 以 CSS 原碼完整確認 grid 改單欄、手機輸入欄位寬度、圖表縮放、table 橫向捲動 |

圓環具備固定**內部 SVG 座標**：cx=352、cy=278、outer=157、inner=102、viewBox='0 0 730 555'；依資料值畫 arc path，中心比例、右側職域標籤、左下「其他」引導線不能重疊。圖表如果交給 Recharts/D3 等庫重做，仍必須在同視窗尺寸產出與基準 SVG 等價的結果，不能只說看起來相近。

YOY 卡包含百分比 chip、去年灰色長條與今年藍色長條；空值及負成長分別套現有 CSS class。其他功能卡的顏色、圖示、字級、展開 details 等，依 reference CSS/markup 原樣。

## 5. JS 函式清單與責任

| 程式名稱 | 功能、輸入與輸出 |
|---|---|
| readCompressedShard(url) | Base64 解碼＋gzip 解壓＋JSON.parse，失敗 throw |
| loadActualData() | manifest + 22 shard 稽核、建立 entries、載入名冊，最後 render |
| loadWorksiteData() | 名冊 group 解析、category 08 排除、以 siteIds 補 entries |
| loadOrganizationMetrics(d,m) | 獨立組織指標：從 agentIndex 清單去重、建立組織前綴的 teamCount/newcomers Map |
| organizationMetrics(prefix) | 返回當前組織路徑的兩項固定模擬數據，完全不依賴職域／業績日期 |
| inWorkMonthRange(month,a,b) | 六碼 YYYYMM 邊界含端點比對 |
| shiftYear(month,delta) | 年份移動、月份不變 |
| forEachActualRow(items,a,b,cb) | 只迭代選取範圍／月份來源列 |
| sum(items,yearOffset=0) | **職域 KPI 運算入口**，包含職域業績、去重、整體業績模擬；組數新人數不再由此分配 |
| orderedGlobalDomains() | 全通路當年截至當月 FYC 降冪，所有組織共用順序 |
| filteredItems() | 依 path、當層組織選擇、職域選擇得出 entries 集 |
| availableOrganizations() | 當層可用組織列表，根層固定六區順序 |
| toggleSort()/sortedOrganizations() | 預設名稱與點擊指標降／升冪 |
| renderOrganizationFilter() | 組織多選器、全選全不選 |
| renderDomainFilter() | 職域多選器、全選全不選 |
| renderDashboard(items,showYoY) | 畫兩張當年／去年圓環及根層 3 張同期比較卡 |
| render() | 生成麵包屑、動態表頭／指標與 table rows；將組織 KPI 置於職域欄**之前**，與組織同 rowSpan；小計及詳情事件 |
| targetHelp(key) | 達標人員／達標職域欄位的 tooltip、click 展開關閉 |
| openMetricDetail()/renderMetricDetail() | 商品別／繳別／年期／商品名稱明細 dialog |
| productBreakdown() | 對職域真實 KPI 按所選分類 sum；回傳排序分組 |
| openPolicyDetails()/renderPolicyDetails() | 業務員層後四碼／工作月來源列明細 |
| initReportForm() | 新增調整刪除切換、地址聯動、驗證、DEMO 回顯 |
| toggleMenu() | mobile sidebar／桌面 collapse |
| routedView()/showView() | URL slug 判斷、顯示 section、active nav、lazy data |

重要依賴順序：所有常數、DOM 輔助函式、監聽器在腳本載入時初始化；末尾 initReportForm() → showView(routedView())。切換至績效才 render() → loadActualData() → 再 render()。重構時必須保留初始 loading／成功／失敗三種 UI 狀態。

## 6. JS 狀態模型：clone 必須具備相同 scope

| 狀態 | 型別／初值 | 改變事件／影響 |
|---|---|---|
| start/end | string，台灣 YYYY01 / YYYYMM 當月 | #apply click；所有 KPI/chart/table |
| path | string[]，初始 [] | 組織下鑽或麵包屑；決定層級 |
| entries | Array<entry> | 載入績效與名冊；職域業績計算來源 |
| actualManifest / actualReady | object/null, boolean | fetch 成功後 |
| worksiteSource / worksiteReady | object/null, boolean | 名冊成功後 |
| organizationMetricTotals / organizationMetricReady | Map<JSON.stringify(orgPathPrefix),{teamCount,newcomers}>, boolean | 載入 organization-metrics.json，先人員去重，再按組織前綴累加 |
| loadingIssue | string/null | 顯示錯誤 |
| organizationFilters | Map<pathKey,Set<string>> | org 篩選器 |
| domainFilters | Map<pathKey,Set<string>> | 職域篩選器 |
| sortMetric / sortDirection | null / 'name' | 表頭首次 desc、再次 asc、恢復 name |
| VISIBLE | Set<metricKey> | 欄位 checkbox；兩個位置共用 |
| globalDomainOrder | string[]/null | 全通路 FYC 排名，只需在載入來源後建立 |
| detailContext | object/null | 業績金額點擊後彈窗 |
| policyVisibleEntries | entry[] | 業務員細節彈窗 |
| performanceInitialized | boolean false | 首次進入 /performance/ |
| PAGE_ROUTES | slug 映射常數 | URL 導覽 |
| report form state | form elements | reportType、city、district、驗證／回顯 |

**日期切換對全通路職域「預設排序」無影響**；它的排序是當年完整 YTD 的參考值。日期切換影響業績／同比／圖表，但**組數、新人數為現況組織模擬快照，不按職域或月份重新分配**。名冊職域數同樣按現況，不是區間歷史計數。

## 7. 精確算法與產物

### 7.1 最末層業務員是否達標（純顯示轉換）

- 本層判斷嚴格使用 `path.length===3`；任何其他層級不更名、不轉換成 O/X。
- `achievedOperators` 保持原資料鍵與數值：多人範圍正常統計人數，單位業務員的原始值 1/0。**不改 sum()、人員隨機種子、集合去重、排序數據**。
- 在 `render()` 先用 `displayMetricLabel(key,label)` 將業務員層 `achievedOperators` 的可見欄名及兩個欄位選單改為「是否達標」；其他層恢復「達標經營人員數」。
- `targetHelp(key,displayLabel)` 使用相同可見欄名，業務員層提示說明 O＝達標、X＝未達標。
- 表格儲存格：僅業務員層、`key==='achievedOperators'` 及**個別業務員列**執行 `1 → 'O', 0 → 'X', null/其他 → '—'`。最底層「全體業務員按職域匯總／通路匯總」不代表單一人，顯示「—」而不是把兩個人以上的達標數轉成 O/X。
- 指標設定選單兩套複本要以 `data-metric-key='achievedOperators'` 同步選取狀態，**禁止**依可見欄名文字匹配（因為不同層級名稱不同）。
- 原表頭排序仍根據數值 0/1 排序，不改為按照 O/X 字母排序。其他層仍以達標人數排序。


不可只用本文件重寫算法；必須連同 [DATA_CONTRACT.md](DATA_CONTRACT.md) 的 **row[0..11] 索引**、FNV hash 種子、每筆 FYC round、去重 Map、名冊 U=Y、類別 08 排除一起實作。三種百分比注意分母差別：

- 表格職域 FYC/FYN/保費占比 = 該職域業績 ÷ 當前組織的同 KPI 職域總計。
- 圓環「職域佔整體」 = 真實職域 KPI 合計 ÷ 模擬整體 KPI。
- YoY 成長率 = (今年同期 - 去年同期) / 去年同期；去年為 0 則不可除。
- 所有比例顯示 1 位小數、數值千分位；加總的原始精度先保留，**不能先四捨五入顯示值後再加總**。

## 8. DEMO 內容與表單交互

**新聞**：2 張卡，標題與 details 展開步驟以 [REFERENCE_MARKUP.html](REFERENCE_MARKUP.html) 為準。

**經營資源**：3 張（客說會補助申請、識別證補發、LINE 客戶預約活動），現在都是流程文字，不可做成假的實際送出。

**達人經驗談**：4 張（大小水庫實戰、團險理賠衍伸個險、首次職域開發、寵物險），均為示範 details。

**回報表單**：#reportForm 中 reportType 三個 radio；切換「刪除」隱藏 #reportAddFields、顯示 #reportDeleteFields，並處理 required/disabled；縣市、行政區連動；新增／調整包含職域名稱、員工人數、地址細項、電話與備註。submit 執行 e.preventDefault() + reportValidity() + new FormData()，只在 #reportResult 顯示**已送出（DEMO，未儲存）**，目前**沒有任何後端呼叫**。若正式版串接 DB，不得誤導為 DEMO 已完成正式寫入。

## 9. 本機啟動、部署與交付

目前文件屬 GitHub Pages 靜態網站。原生源碼可用最小 HTTP server 在 repo 根目錄服務，但因實際 base path **/WorkSite_KGI/**，本機測試應：

1. 把專案置於伺服器 public root 的 WorkSite_KGI 子目錄，讓 /WorkSite_KGI/index.html、/WorkSite_KGI/data/manifest.json 等路徑都能回應。
2. 啟動靜態 HTTP server，例如在 public root 執行 Python 的 http.server 8000，透過 http://localhost:8000/WorkSite_KGI/ 開啟。直接 file:// 會受 fetch／CORS 影響，不可作驗收。
3. 在 Chrome／Edge 使用支援 DecompressionStream 的現代瀏覽器。
4. 驗證根網址與五個獨立目錄網址都能回應 200 並解析主文件。
5. 使用固定 1440x900 與 390x844 等 viewports 記錄 baseline screenshots；逐項比對 CSS、圖表、表格及子頁。
6. 若改用 React/Vite/Next，build output 必須能部署到 GitHub Pages 的 project base path；direct deep link reload 必須有實體路由或 fallback；保持 SPA 正常 history。
7. 上線前先跑 [ACCEPTANCE_TESTS.md](ACCEPTANCE_TESTS.md)，通過後再推 main；新版本需註記改動的文件與來源 SHA。

**精確度限制**：字體作業系統差異、縮放比例與 anti-aliasing 會使不同裝置無法達到每個實體像素 bit-for-bit 相同；**DOM、CSS、尺寸規則、資料與互動完全等價**是交接可驗收的目標，視覺以同平台／viewport 的截圖回歸對照。

## 10. 已知不應錯誤描述為正式功能之處

- 所有五頁網址已可直連、切換與上一頁返回；其他四頁主體內容大量為 DEMO。
- 完整業績資料只涵蓋已匯入 2025、2026；不是即時庫。
- 全通路 KPI、達標指標、組數、新人數仍為固定亂數 DEMO。
- 公司全員、完整職域名冊與商品相關的正式範圍仍需業務端驗證。
- 保單後四碼及遮罩姓名即使不完整仍屬敏感業務資訊，不得直接當正式外部公開站。
- 回報頁目前只有前端回顯，不會存到任何地方。
