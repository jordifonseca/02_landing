# CLAUDE.md

Landing page de newsletter. HTML/CSS/JS vanilla + PHP proxy.

## Stack

HTML5 + CSS3 (variables, Grid) + JavaScript vanilla + PHP + Google Fonts (Archivo, Inter, Instrument Serif) + Mailerlite API

## Estructura

- `index.html` — Página única (header, hero, benefits, form, footer)
- `styles/main.css` — Estilos responsivos (mobile-first)
- `js/main.js` — Validación + llamadas a API
- `api.php` — Proxy PHP para Mailerlite (credenciales seguras)
- `assets/images/` — Imágenes/logos

## Desarrollo Local

Abre `index.html` en navegador. No requiere build step ni dependencias.

### Git + Deploy Automático

1. **Configura credenciales FTP** en `.env.local` (copia `.env.local.example`)
2. **Edita los archivos** normalmente
3. **Commit y push:**
   ```bash
   git add .
   git commit -m "message"
   git push origin master
   ```
4. **El deploy automático se ejecuta** después de cada commit (git hook)

## Testing

Formulario: datos válidos/inválidos, suscriptor se crea en Mailerlite, mobile responsivo.

## Despliegue

✅ **En vivo:** https://jorgefonseca.es/news/

Dinahosting (FTP): Todos los archivos (incluyendo `api.php`) están en la carpeta `/news/`.

La credencial de Mailerlite está en `api.php` (línea 13).

## Notas

- Mobile-first, Lighthouse 90+
- Formulario: nombre + email (validación cliente)
- API: Mailerlite (suscriptores via proxy PHP)
- Sin variables de entorno necesarias (credencial en api.php)
