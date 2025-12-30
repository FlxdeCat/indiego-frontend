# Indiego Frontend

[![Last Commit](https://img.shields.io/github/last-commit/FlxdeCat/indiego-frontend)](https://github.com/FIxCat/indiego-frontend)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)
![Languages](https://img.shields.io/github/languages/count/FlxdeCat/indiego-frontend)

---

### Built with the tools and technologies:

![Tech Stack](https://img.shields.io/badge/JSON-informational?logo=json&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-informational?logo=markdown&logoColor=white)
![Npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![Zod](https://img.shields.io/badge/Zod-2b2d42?logo=zod)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios)
![shadcn](https://img.shields.io/badge/shadcn/UI-20232A?logo=tailwindcss)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=react)
![React Router](https://img.shields.io/badge/React%20Router-EA4335?logo=reactrouter)

---

## 🔗 Related Repositories

- **Backend API**: https://github.com/Lawrance-Cancerlon/indiego-backend

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

## 🔧 Environment Variables

This project uses environment variables for API configuration.

An example file is provided in `.env.example`

Before running the application, create a `.env` file in the project root and fill it using the same format:

VITE_API_BASE_URL="http://localhost:port/api"

### Notes:
- Replace `port` with the backend port (e.g. `5000`)
- The backend must be running for API-dependent features
- Environment variables prefixed with `VITE_` are required by Vite

Example:

VITE_API_BASE_URL="http://localhost:5000/api"

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
