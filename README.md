# Mauricio González — Portafolio Profesional

Sesión de Cloud Agent centrada en el portafolio de **Mauricio González** (`Gtmaury` / `gtmauan`).

Repositorio fuente en GitHub: [Gtmaury/Porfolio](https://github.com/Gtmaury/Porfolio)  
Sitio publicado: [porfolio-lime-ten.vercel.app](https://porfolio-lime-ten.vercel.app)

## Qué es

Portafolio FullStack con estética moderna y minimalista: proyectos destacados, catálogo de juegos en `/juegos`, stack técnico e internacionalización ES/EN.

## Stack

- HTML5 semántico
- CSS3 (Grid, Flexbox, animaciones)
- JavaScript ES6+ (i18n, IntersectionObserver, navegación)
- Fuentes: Syne + DM Sans

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre [http://127.0.0.1:4321](http://127.0.0.1:4321).

Catálogo de juegos (enlace para compartir): [http://127.0.0.1:4321/juegos](http://127.0.0.1:4321/juegos) — también `/games`.

También puedes abrir `index.html` o `juegos.html` directamente o usar cualquier servidor estático.

## Estructura

```
/
├── index.html      # Portafolio (proyectos, skills, contacto)
├── juegos.html     # Catálogo de videojuegos
├── vercel.json     # Rewrites /juegos y /games
├── css/style.css
├── js/main.js
├── js/games-page.js
├── img/
└── package.json
```
