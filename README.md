# Double Checker: Clinical Protocol Date Comparison App

A modern web app for clinical project leaders to double-check and compare protocol date schedules. Built with React + Vite.

## ✨ Features
- Input two sets of protocol date data (supports free text, Korean/English mix)
- Robust parsing and normalization of date points (e.g., Day 1, Day 2, ranges, etc.)
- Side-by-side comparison table with match/warning indicators
- Optional date range filter with Apple-style toggle switch
- Modern, responsive UI
- Deployable as a static site (GitHub Pages)

## 🚀 Getting Started

### Local Development
```bash
npm install
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🌐 Deploy to GitHub Pages
1. Ensure your repo is public.
2. The `vite.config.js` is set with the correct base:
   ```js
   export default defineConfig({
     base: '/double-chcker/',
     // ...
   })
   ```
3. The following scripts are in `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
5. In your repo settings, set GitHub Pages source to the `gh-pages` branch.
6. Your app will be live at: `https://mike123789-dev.github.io/double-chcker/`

## 📁 Project Structure
- `src/` — React source code
- `public/` — Static assets
- `plan.md` — Project planning and requirements

## 🛠️ Tech Stack
- React 19 + Vite
- Modern CSS
- GitHub Pages for hosting

---

Feel free to fork, contribute, or use for your own clinical trial protocol checking needs!
