# Mauricio González — Professional Portfolio

Cloud Agent session focused on **Mauricio González**’s portfolio (`Gtmaury` / `gtmauan`).

Source repo on GitHub: [Gtmaury/Porfolio](https://github.com/Gtmaury/Porfolio)  
Live site: [porfolio-lime-ten.vercel.app](https://porfolio-lime-ten.vercel.app)

## What it is

FullStack portfolio with a modern minimal look: featured projects, games catalog at `/games.html`, tech stack, and ES/EN i18n. **English is the default language.**

## Stack

- Semantic HTML5
- CSS3 (Grid, Flexbox, animations)
- JavaScript ES6+ (i18n, IntersectionObserver, navigation)
- Fonts: Syne + DM Sans

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4321](http://127.0.0.1:4321).

Shareable games catalog: [http://127.0.0.1:4321/games.html](http://127.0.0.1:4321/games.html) — also `/games` and `/juegos`.

## Structure

```
/
├── index.html      # Portfolio (projects, skills, contact)
├── games.html      # Video games catalog
├── juegos.html     # Redirect → games.html
├── vercel.json     # Rewrites /games and /juegos
├── css/style.css
├── js/main.js
├── js/games-page.js
├── img/
└── package.json
```
