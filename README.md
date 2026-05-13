# Newsletter Landing Page

Landing page para captar suscriptores a la newsletter de Jorge Fonseca.

## Setup Local

1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. No requiere dependencias ni build step

## Despliegue

### Vercel (Recomendado)
1. Push a GitHub
2. Conecta repositorio en Vercel
3. Auto-despliega en cada push a main

### GitHub Pages
1. Push a GitHub
2. Ve a Settings > Pages
3. Selecciona `main` branch como source
4. Tu sitio estará en `https://username.github.io/02_landing`

### Dinahosting
1. Accede a tu panel de control de Dinahosting
2. Sube los archivos via FTP/SFTP a la carpeta pública
3. Configura las variables de entorno en el panel

## Desarrollo

- Edita `index.html` para estructura
- Edita `styles/main.css` para estilos
- Edita `js/main.js` para lógica
- Abre `index.html` en navegador para probar cambios (refresh en F5)

## Variables de Entorno

Para desplegar, necesitas configurar:
- `MAILERLITE_API_KEY` - Tu API key de Mailerlite
- `WEB3FORMS_ACCESS_KEY` - Tu access key de Web3Forms

En Vercel/GitHub Pages, añade estas como secrets en las settings del proyecto.
En Dinahosting, configura en el panel de control del hosting.
