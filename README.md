# WorkSite_KGI｜職域經營平台

**目前階段：功能可操作的 DEMO／尚非正式營運系統。**

產品網站：**https://hub-google.github.io/WorkSite_KGI/**  
首頁自動進入績效管理： https://hub-google.github.io/WorkSite_KGI/performance/

## 接手開發者必讀（按順序）

1. **[完整 PRD：PRD.md](PRD.md)** — 五個功能需求、資料真實性、UI 行為、排序／篩選、所有 KPI、來源、驗收要求與待開發。
2. **[工程復刻規格：docs/IMPLEMENTATION_SPEC.md](docs/IMPLEMENTATION_SPEC.md)** — 路由、HTML 結構、JS 狀態與事件、CSS、資料載入及本機部署。
3. **[資料契約：docs/DATA_CONTRACT.md](docs/DATA_CONTRACT.md)** — Excel 原始欄位、manifest 12 欄 row schema、22 個月分片、完整 KPI 公式、亂數 hash、去重與邊界。
4. **[驗收清單：docs/ACCEPTANCE_TESTS.md](docs/ACCEPTANCE_TESTS.md)** — 直連網址、桌機／手機視覺、日期、同比、排序、KPI 計算、回報等逐項驗測。
5. **[精確 CSS 快照：docs/REFERENCE_STYLE.css](docs/REFERENCE_STYLE.css)** 與 **[HTML 結構快照：docs/REFERENCE_MARKUP.html](docs/REFERENCE_MARKUP.html)** — 直接自 2026-10-30 已驗證版本擷取，不必從文字臆測畫面。
6. **[正在運行的主程式：index.html](index.html)** — 最終精確行為與原始 SVG／表格程式，視為 golden source。

復刻參考版本：2026-10-30 組織層級指標改版基準 commit **7f826c6d870fe74728d8854cf35a3162446c1405**。資料層的組數／新人數來源為 [data/organization-metrics.json](data/organization-metrics.json)，不是從各職域業績列產生。重新設計 UI、改用其他框架或換資料來源以前，**先做到對這個版本的 DOM／視覺／數值／互動等價**。

## 頁面

| 功能 | 可直接開啟的網址 |
|---|---|
| 績效管理 | https://hub-google.github.io/WorkSite_KGI/performance/ |
| 最新消息 | https://hub-google.github.io/WorkSite_KGI/news/ |
| 經營資源 | https://hub-google.github.io/WorkSite_KGI/resources/ |
| 達人經驗談 | https://hub-google.github.io/WorkSite_KGI/stories/ |
| 職域新增、調整、刪除回報 | https://hub-google.github.io/WorkSite_KGI/worksite-report/ |

每頁有實體目錄，點選導覽可切換 URL，支援直接開啟、重新整理、上一頁／下一頁。網站根路徑導向績效管理。

## 目前真實與模擬的區分

**已由來源資料匯入**：2025/2026 職域 FYC/FYN/保費、名冊職域代碼及衍生去重與占比統計。  
**以固定公式模擬**：整體通路 FYC／FYN／保費（以真實職域列值乘上按指標、年度、月份固定的倍率，讓職域占整體比例約落在 18%～28%，每次刷新不變）、達標職域數、達標經營人員數、組數、新人數。  
**僅 DEMO**：新聞、資源、經驗分享及職域新增／調整／刪除表單；表單送出不寫入任何資料庫。

**注意：GitHub Pages 與其 data 檔案為公開可讀。沒有登入驗證、資料庫／API、RBAC 或審核流程。不可直接當成正式含機敏資訊的公司系統。**

## 組織模擬名冊（2026-10-30 擴充）

組數由原本 **156** 增加到 **1,560**，新人數由 **211** 增加到 **1,055**。模擬名冊 [data/organization-metrics.json](data/organization-metrics.json) 在每位去重業務員層級以 0/1 分別認列，**不是**把每個人原有數值直接乘 10／5。原本算組數或新人的人員保留，其餘從尚未被計入的人員依固定 hash 加入；組數、新人數均按組織層級往上加總，不按職域分配。可執行 `node scripts/generate-organization-metrics.mjs` 重建相同名冊，詳見 [資料契約](docs/DATA_CONTRACT.md)。

## 本機預覽

本專案以 /WorkSite_KGI/ 作為 project base path，本機預覽必須維持相同路徑：

1. 將本 repo 放在一個上層資料夾下，子資料夾名稱為 WorkSite_KGI。
2. 在**上層資料夾**執行： `python -m http.server 8000`。
3. 開啟 http://localhost:8000/WorkSite_KGI/；需現代 Chrome/Edge 支援 gzip 的 DecompressionStream。
4. 不能直接用 file:// 打開，因為績效會 fetch data/ 分片。
5. 改動後執行 [驗收規格](docs/ACCEPTANCE_TESTS.md)，確認每層數據加總、路由及響應式視覺。

## 變更管理

任何調整 KPI 公式、資料格式、URL、預設排序、視覺或表單行為的提交，必須同步更新 **PRD + 工程規格 + 資料契約 + 驗收測例**。若 CSS／DOM golden source 改變，重新擷取兩份 reference snapshot，標記新的基準 commit。正式版新增 SSO／API 與資料庫時，請建立獨立遷移規格，不要默默把 DEMO 資料當作正式實績。
