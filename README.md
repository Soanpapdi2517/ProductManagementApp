# 🚀 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Framework** | React Native CLI |
| **State Management** | Redux Toolkit |
| **Local Storage** | Async Storage |
| **Navigation** | React Navigation (Bottom Tab + Stack) |
| **Styling** | React Native StyleSheet |
| **Testing** | Jest |
| **Build Tool** | Gradle |

---

## 🧩 Installation & Setup

### 🔧 Prerequisites

- Node.js installed  
- Android Studio (for emulator or physical device testing)  
- React Native CLI configured  
- Java SDK and Gradle setup  

### ⚙️ Steps

```bash
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
```

---

## 📲 Screens Overview

| Screen | Description |
|---------|--------------|
| **Dashboard** | Displays all products color-coded by quantity |
| **Limited Products** | Shows only products with less than 15 quantity |
| **Create/Edit Products** | Add, update, or delete products |
| **Create Product (Stack)** | Form for creating new products |
| **Edit Product (Stack)** | Modify product details (except image) |
| **Product Details (Stack)** | Displays product-specific details |

---

## 🧠 State Management Flow

```
Redux Toolkit Slice (dataSlice.js)
        ↓
Store (store.js)
        ↓
AsyncStorage (Persisted State)
        ↓
UI Components (Screens)
```

---

## 📦 Download App

You can download the release APK directly from Google Drive:

👉 [**Download Product Management App**](https://drive.google.com/file/d/1u9bFFOy1iatEQkhb22VXFcpJZRQO1LOy/view?usp=drive_link)

---

## 📸 Preview (Optional)

### 🏠 Dashboard
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1R_3lROMXQYrwtcOayD6KflBSoWmDawr6" width="300" height="600" />
  <img src="assets/screenshot/limitedproducts.png" width="300" height="600" />

</p>
### 🧾 Limited Products

### 🛠️ Create Product
![Create Product Screen](assets/screenshots/CreateOrEditProducts.png)

---

## 🧑‍💻 Author

**👤 Sonu Yadav**  
📧 [Connect on LinkedIn](https://linkedin.com/in/)  

💻 *Full Stack Developer | React | React Native | MERN | DevOps Enthusiast*

---

## 🪪 License

This project is licensed under the **MIT License** – feel free to use and modify.

---
