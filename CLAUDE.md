# CLAUDE.md

Esta página proporciona guía a Claude Code cuando trabajas en este repositorio.

## Resumen del Proyecto

Landing page de una página para captar suscriptores de newsletter. HTML/CSS/JS vanilla, sin dependencias complejas.

## Stack

- HTML5 semántico
- CSS3 (variables, Flexbox, Grid)
- JavaScript vanilla
- Google Fonts: Archivo, Instrument Serif, Inter
- Mailerlite API (gestión de suscriptores)
- Web3Forms (notificaciones por email)

## Estructura

```
index.html - Página única con todas las secciones
styles/main.css - Todos los estilos
js/main.js - Lógica de formulario e integración APIs
assets/images/ - Imágenes, logo, iconos
```

## Desarrollo Local

Simplemente abre `index.html` en navegador. No necesita servidor ni build step.

Para cambios:
1. Edita archivos
2. Refresh en navegador (F5)
3. Revisa cambios inmediatamente

## Comandos Importantes

No hay scripts npm. Todo es manual y directo.

### Git workflow
```bash
git add .
git commit -m "message"
git push origin main
```

## Testing

Testing manual en navegador:
- Formulario con datos válidos
- Formulario con datos inválidos
- Verificar que ambas APIs reciben datos
- Verificar responsividad en mobile

## Despliegue

El proyecto puede desplegarse en:
- Vercel (recomendado, auto-deploy desde GitHub)
- GitHub Pages
- Dinahosting (servidor propio con FTP)

## Notas de Diseño

- Mobile-first
- Tipografía: Archivo (display), Inter/Instrument Serif (body)
- Performance: < 2 segundos, Lighthouse > 90
- Formulario: nombre + email (validación cliente)
- APIs: Mailerlite (suscriptores) + Web3Forms (notificaciones email)
