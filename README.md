# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## LokaTrack Web Application Preview

LokaTrack is a comprehensive logistics tracking system that provides real-time monitoring and management capabilities for packages, drivers, and tracking devices. Below are the main pages of the application:

### 🏠 Dashboard

<img src="https://drive.google.com/uc?export=view&id=1TbwuZLL3Tcl7_MKRDIbF3NhexNHbxSTq" alt="Dashboard" width="800" />

The dashboard provides a comprehensive overview of the entire logistics operation. It displays key metrics, active drivers status, available tracking devices, and real-time system statistics. This central hub allows administrators to quickly assess the current state of all operations at a glance.

### 📦 Package Tracking

<img src="https://drive.google.com/uc?export=view&id=1dZZnJk3xd1BgQNrThznq3xLJK2XTjgZk" alt="Package Tracking" width="800" />

The package tracking page allows users to monitor and manage all shipments in the system. Users can view package details, delivery status, and track the complete journey of each package from origin to destination.

### 🗺️ Live Tracking

<img src="https://drive.google.com/uc?export=view&id=1V4a-8boQahdQqh01IVNuqubqFflKjPPp" alt="Live Tracking" width="800" />

The live tracking interface provides real-time location monitoring on an interactive map. This page displays the current positions of all active drivers and vehicles, allowing for immediate visibility into fleet movements and enabling quick response to any operational needs.

### 📡 Tracker Management

<img src="https://drive.google.com/uc?export=view&id=1putcAdS-4GaMM1cDccoc9KF-d-94A1sm" alt="Tracker Management" width="800" />

The tracker management page handles the administration of all GPS tracking devices. Users can view device status, assign trackers to vehicles or packages, monitor device health, and configure tracking parameters to ensure optimal monitoring coverage.

### 👨‍💼 Driver Management

<img src="https://drive.google.com/uc?export=view&id=1qUcvWjLcrhpxQYKf7YrMvyP0q896XYBX" alt="Driver Management" width="800" />

The driver management interface provides complete control over driver profiles and assignments. Administrators can view driver information and monitor their current status.
