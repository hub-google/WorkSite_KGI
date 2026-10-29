# WorkSite_KGI｜職域業績資料來源

本目錄是**資料層**，與前端 `index.html` 分離。來源為使用者提供的 2025、2026「受理及核實業績」Excel；目前是靜態資料快照，日後可換成需要登入的資料庫 API。

## 資料檔
- `manifest.json`：版本、年度稽核總計、D～G 組織索引、職域／商品索引、月資料檔清單。
- `shards/YYYYMM.txt`：當月原始結果的正規化資料，內容為 **base64(gzip(JSON))**。
- 每筆記錄的月別以檔名為準，其餘欄位依 manifest.rowSchema：
  `[agentIndex, domainIndex, fyc, fyn, premium, productTypeIndex, paymentIndex, productIndex, term, policyLast4, policyHash, statusIndex]`。
- 網頁使用 `fetch`、`atob`、`DecompressionStream('gzip')` 載入並依月份與組織加總。

## 精準統計規則
1. **先篩選 AQ 欄「是否為當年度服務人員」＝1**。其餘列不納入。
2. 組織階層完全取 **D、E、F、G** 欄；工作月取 **C** 欄。
3. **職域FYC＝K 欄加總，職域FYN＝L 欄加總，職域保費＝N 欄加總**，保留小數與負向沖銷。
4. 保單明細僅取 **J 欄最後四個字元**；FYN 可能有小數，不能用「列數＝FYN」驗證。
5. 兩年度分開保存，年增率使用相同月份區間的前一年對照；日期選擇器按**工作月**，不是精確到日。
6. 商品別／繳別／年期／商品名稱：以來源 S／AR／R／V 欄分組，對 K／L／N 加總。

## 沒有來源的指標
本次來源只有職域受理及核實業績，**沒有整體非職域 FYC／FYN／保費、組數、新人名冊、職域責任額、團險／理賠／LINE 等資料來源**。這些指標應顯示「—」，不可用隨機數值或 0 假冒。經營人員數是**在 AQ＝1 業績資料中出現的去重人員**，不等於完整在職名冊；實動率以這些人員中淨 FYN 大於 0 的比例計算。

## 日後資料庫接入
前端只依賴來源資料介面。將 `loadActualData()` 改為具有授權驗證的 `GET /api/kgi/manifest` 與 `GET /api/kgi/records?month=YYYYMM`，回傳同一結構即可復用圖表、日期、組織與商品分類計算。正式版本建議在伺服端執行 AQ＝1、組織權限與聚合，再回傳被授權的範圍。

## 重要：公開資料風險
此 GitHub 儲存庫和 GitHub Pages 是公開的；即使只儲存遮罩姓名及 J 欄末四碼，檔案仍然可由任何人下載。**不得視為權限控管、密碼保護或正式內部資料庫**。正式上線前應將個人層級業績和保單末碼移到需登入、具角色權限與稽核紀錄的後端，並從公開 Git 歷史中清除已曝光的敏感資料。

## 驗證
在專案根目錄執行 `node scripts/check-worksite-data.mjs`。會確認所有月檔可解壓、列數、索引、保單末四碼長度、完整年度三個業績合計。
