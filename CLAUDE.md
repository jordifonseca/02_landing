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

### Git
```bash
git add .
git commit -m "message"
git push origin master
```

## Testing

Formulario: datos válidos/inválidos, suscriptor se crea en Mailerlite, mobile responsivo.

## Despliegue

Dinahosting (FTP): Copia todos los archivos (incluyendo `api.php`) a la carpeta de la landing.

La credencial de Mailerlite está en `api.php` (línea 13).

## Notas

- Mobile-first, Lighthouse 90+
- Formulario: nombre + email (validación cliente)
- API: Mailerlite (suscriptores via proxy PHP)
- Sin variables de entorno necesarias (credencial en api.php)
