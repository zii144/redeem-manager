# 兌換碼領取系統

一個現代化的網頁應用程式，讓使用者透過身份資訊（電子郵件和使用者名稱）領取兌換碼。

## 功能特色

- 🎨 現代化響應式設計
- 🌏 繁體中文介面 (zh-TW)
- ✅ 即時表單驗證
- 📱 手機友善的介面
- 🎯 使用者體驗優化
- 🔒 資料驗證與安全性

## 技術規格

- **HTML5**: 語義化標記
- **CSS3**: Flexbox, Grid, 動畫效果
- **JavaScript (ES6+)**: 現代化 JavaScript 功能
- **字體**: Noto Sans TC (繁體中文優化)
- **圖示**: Font Awesome 6.0

## 專案結構

```
redeem-manager/
├── index.html          # 主要 HTML 檔案
├── styles.css          # 樣式表
├── script.js           # JavaScript 邏輯
└── README.md           # 專案說明
```

## 功能說明

### 表單驗證

- **電子郵件**: 格式驗證
- **使用者名稱**: 中英文、數字、底線和連字號，2-50 字元
- **兌換碼**: 大寫字母、數字和連字號，6-20 字元
- **服務條款**: 必選同意

### 使用者介面

- 漸層背景設計
- 卡片式佈局
- 動畫效果
- 成功/錯誤模態視窗
- 複製兌換碼功能

### 響應式設計

- 桌面版 (1200px+)
- 平板版 (768px-1199px)
- 手機版 (480px-767px)
- 小螢幕手機 (<480px)

## 使用方式

1. 開啟 `index.html` 檔案
2. 填寫表單資訊：
   - 電子郵件地址
   - 使用者名稱
   - 兌換碼
   - 同意服務條款
3. 點擊「領取兌換碼」按鈕
4. 系統會模擬處理過程並顯示結果

## 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 開發說明

### 自訂樣式

修改 `styles.css` 中的 CSS 變數來自訂主題色彩：

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #27ae60;
  --error-color: #e74c3c;
}
```

### API 整合

在 `script.js` 中的 `handleFormSubmit` 函數中替換模擬 API 呼叫：

```javascript
// 替換這個模擬呼叫
await new Promise((resolve) => setTimeout(resolve, 2000));

// 使用真實的 API 呼叫
const response = await fetch("/api/redeem", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
```

## 授權

© 2024 兌換碼領取系統. 保留所有權利.
