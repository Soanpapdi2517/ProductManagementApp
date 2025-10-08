<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="center" width="30%">
</p>
<h1 align="center">📱 Product Management App</h1>

<p align="center">
  <img src="https://img.shields.io/github/license/Soanpapdi2517/ProductManagementApp?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
  <img src="https://img.shields.io/github/last-commit/Soanpapdi2517/ProductManagementApp?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
  <img src="https://img.shields.io/github/languages/top/Soanpapdi2517/ProductManagementApp?style=default&color=0080ff" alt="repo-top-language">
  <img src="https://img.shields.io/github/languages/count/Soanpapdi2517/ProductManagementApp?style=default&color=0080ff" alt="repo-language-count">
</p>

---

## 🧭 Overview

**ProductManagementApp** is a complete **React Native CLI application** designed to manage products efficiently.  
It features **real-time product monitoring**, **categorization based on quantity**, and **CRUD functionalities** (Create, Read, Update, Delete) — all powered by **Redux Toolkit** and **Async Storage** for seamless state persistence.

---

## ⚙️ Features

✅ **Dashboard with Product Status Colors**  
- 🟢 Green → Products with quantity **≥ 40**  
- 🟡 Yellow → Products with quantity **> 15**  
- 🔴 Red → Products with quantity **< 15**

✅ **Limited Products Screen**  
- Displays only **low-stock items (< 15 quantity)** for quick restocking decisions.

✅ **Create & Edit Products Screen**  
- Add new products with:
  - Product Name  
  - Product Price  
  - Product Quantity  
  - Product Quantity Type (kg, g, pcs, etc.)  
  - Product Quality  
  - Product Image Upload  
- Delete or edit existing products easily.  
- HeaderRight ➕ navigates to *Create Product* form.  
- Modal confirmation on Cancel (Yes/No).  
- Redux Toolkit for centralized state management.  
- Async Storage to persist data locally.

✅ **Product Detail Screen**  
- Opens from Dashboard to display detailed information for each product.

✅ **Smooth UI Navigation**  
- Implemented using **React Navigation (Bottom Tabs + Stack Navigator)**.

✅ **Offline Persistence**  
- State and products remain saved locally even after app restarts.

---

## 🗂 Project Structure

```bash
ProductManagementApp/
├── android/
├── ios/
├── src/
│   ├── Common/
│   ├── Modal/
│   ├── Navigators/
│   ├── Reducer/
│   ├── Screens/
│   ├── Slices/
│   └── Store/
├── App.jsx
├── index.js
├── package.json
└── README.md
🚀 Tech Stack
Category	Technology
Framework	React Native CLI
State Management	Redux Toolkit
Local Storage	Async Storage
Navigation	React Navigation (Bottom Tab + Stack)
Styling	React Native StyleSheet
Testing	Jest
Build Tool	Gradle
🧩 Installation & Setup
Prerequisites

Node.js installed

Android Studio (for emulator or physical device testing)

React Native CLI configured

Java SDK and Gradle setup

Steps
# Clone repository
git clone https://github.com/Soanpapdi2517/ProductManagementApp

# Move into folder
cd ProductManagementApp

# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on Android
npx react-native run-android

📲 Screens Overview
Screen	Description
Dashboard	Displays all products color-coded by quantity
Limited Products	Shows only products with less than 15 quantity
Create/Edit Products	Add, update, or delete products
Create Product (Stack)	Form for creating new products
Edit Product (Stack)	Modify product details (except image)
Product Details (Stack)	Displays product-specific details
🧠 State Management Flow
Redux Toolkit Slice (dataSlice.js)
        ↓
Store (store.js)
        ↓
AsyncStorage (Persisted State)
        ↓
UI Components (Screens)

📦 Download App

You can download the release APK directly from Google Drive:

👉 Download Product Management App

📸 Preview (Optional)

Add screenshots here when available to show UI.

🧑‍💻 Author

👤 Sonu Yadav
📧 Connect on LinkedIn

💻 Full Stack Developer | React | React Native | MERN | DevOps Enthusiast

🪪 License

This project is licensed under the MIT License – feel free to use and modify.
