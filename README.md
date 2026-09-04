# ArchitectAny M01 — Solution Universe

An interactive, cinematic 3D elliptical Solution Universe built with **React**, **TypeScript**, **Three.js**, **Tailwind CSS**, and **Vite**.

---

## 🚀 Quick Start (VS Code / Local Environment)

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **npm** (comes with Node.js) or **yarn** / **pnpm** / **bun**
- **VS Code** (with recommended extensions: *ESLint*, *Tailwind CSS IntelliSense*)

### 2. Installation
Open the project directory in your terminal or inside VS Code (`Terminal -> New Terminal`):

```bash
npm install
```

### 3. Run Development Server
Start the local Vite development server:

```bash
npm run dev
```

Open your browser at:
**`http://localhost:3000`** (or the port displayed in your terminal).

---

## 📦 Available Scripts

- `npm run dev` — Starts the local development server with instant HMR.
- `npm run build` — Compiles and optimizes production assets into the `dist/` folder.
- `npm run preview` — Previews the production build locally.
- `npm run lint` — Runs TypeScript type-checking (`tsc --noEmit`).

---

## 📂 Project Architecture

```text
├── app/
│   └── preview/page.tsx          # Main Preview page layout
├── components/preview/
│   ├── UniverseStage.tsx         # Main 3D galaxy ellipse coordinator & animation engine
│   ├── UniversePlane.tsx         # Three.js 3D WebGL particle disc & galaxy spiral arms
│   ├── DomainNode.tsx            # Interactive orbital domain nodes with 3D depth scaling
│   ├── IntentCore.tsx            # Center Intent Core with ArchitectAny 3D monogram
│   ├── SolutionRail.tsx          # Bottom interactive solution metadata & capabilities rail
│   ├── Header.tsx                # Top navigation header & user profile
│   └── Footer.tsx                # Platform footer
├── data/universe/
│   ├── domains.json              # Authoritative domain node registry (D01-D14)
│   ├── subdomains.json           # Subdomains and functional tags
│   ├── solution-capabilities.json# Solution capabilities and tech stacks
│   └── solutions.json            # Solution matrix
├── public/
│   └── assets/                   # Optimized 3D logos, badges, and user profile media
├── src/
│   ├── types.ts                  # Shared TypeScript interfaces & definitions
│   ├── App.tsx                   # Root React component
│   └── main.tsx                  # Vite application entry point
├── index.html                    # HTML5 entry document
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite & Tailwind CSS plugins
```

---

## 🎨 Key Features

1. **3D Elliptical Galaxy Engine**: Smooth, mathematical 3D orbital positioning with continuous galaxy rotation, speed controls (`0.5x`, `1x`, `2x`), and auto-pause on hover.
2. **Perspective Depth Mapping**: Automatic z-index, opacity, and scale adjustments based on trigonometric orbital depth ($\sin\theta$).
3. **Luminous Synapse Laser**: Real-time pulsing energy beam connecting the central Intent Core to the active domain node.
4. **Interactive Solution Rail**: Live reactive metadata breakdown displaying subdomains, capability matrix, and solutions for any selected node.
5. **Turnkey Setup**: Standard React + Vite structure ready for deployment to Cloud Run, Vercel, Netlify, or standard Node.js hosts.
