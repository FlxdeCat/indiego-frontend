# Indiego Frontend

This is the frontend of the **Indiego** website, built using **React**, **TypeScript**, and **Vite**.

---

## 🚀 Features

- ⚛️ React 18
- 🟦 TypeScript
- ⚡ Vite for fast development
- 🎨 Tailwind CSS for utility-first styling
- 🧩 shadcn/ui for accessible and beautiful components
- 🧠 Modular architecture with hooks, context, and utils
- 🧱 Easily extendable and customizable

---

## 📁 Project Structure

```
indiego-frontend/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── admin/
│   │   ├── dev/
│   │   ├── ui/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── types/
│   ├── utils/
│   └── main.tsx
├── index.html
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 🛠 Installation

Before running the project, make sure you have **Node.js** installed.

Then follow these steps:

```bash
# 1. Install dependencies
npm i --force

# 2. Start development server
npm run dev
```

⚠️ **We use `--force` with `npm install` to ensure all dependencies are installed even if there are peer dependency conflicts.**

---

## 🌐 Development Server

Once started, the app should be available at:

**http://localhost:5173**

You can now start developing the **Indiego** frontend!

---

## 📦 Build

To create a production build:

```bash
npm run build
```

---

## 🎨 Styling

This project uses:

- **Tailwind CSS** for fast, utility-first styling
- **shadcn/ui** for well-designed and accessible component primitives

Both tools make it easy to customize and maintain a consistent UI across the project.
