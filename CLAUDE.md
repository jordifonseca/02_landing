# CLAUDE.md

Landing page de newsletter. HTML/CSS/JS vanilla, sin dependencias.

## Stack

HTML5 + CSS3 (variables, Grid) + JavaScript vanilla + Google Fonts (Archivo, Inter, Instrument Serif) + Mailerlite API + Web3Forms

## Estructura

- `index.html` — Página única (header, hero, benefits, form, footer)
- `styles/main.css` — Estilos responsivos (mobile-first)
- `js/main.js` — Validación + APIs (Mailerlite, Web3Forms)
- `assets/images/` — Imágenes/logos

## Desarrollo

Abre `index.html` en navegador. Sin servidor ni build step. Refresh para ver cambios.

### Git
```bash
git add .
git commit -m "message"
git push origin main
```

## Testing

Formulario: datos válidos/inválidos, ambas APIs reciben datos, mobile responsivo.

## Despliegue

Vercel (auto-deploy) | GitHub Pages | Dinahosting (FTP)

## Notas

- Mobile-first, Lighthouse 90+
- Formulario: nombre + email (validación cliente)
- APIs: Mailerlite (suscriptores) + Web3Forms (email al propietario)
- Variables de entorno: MAILERLITE_API_KEY, WEB3FORMS_ACCESS_KEY
