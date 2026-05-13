# Script de sincronización FTP para Dinahosting
# Uso: .\deploy.ps1

$ErrorActionPreference = "Stop"

# Cargar credenciales
$config = @{}
Get-Content ".env.local" | ForEach-Object {
    if ($_ -match '(\w+)=(.*)') {
        $config[$matches[1]] = $matches[2]
    }
}

$ftpHost = $config['FTP_HOST']
$ftpUser = $config['FTP_USER']
$ftpPass = $config['FTP_PASS']
$ftpPath = $config['FTP_PATH']

Write-Host "🚀 Sincronizando con Dinahosting..." -ForegroundColor Green

# Archivos a subir
$files = @(
    "index.html",
    "api.php",
    "styles/main.css",
    "js/main.js",
    "CLAUDE.md",
    "README.md"
)

# Crear conexión FTP
$ftpUri = "ftp://$ftpHost$ftpPath"
$credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)

foreach ($file in $files) {
    if (Test-Path $file) {
        $uri = "$ftpUri$file"
        Write-Host "⬆️  Subiendo: $file"

        try {
            $request = [System.Net.FtpWebRequest]::Create($uri)
            $request.Credentials = $credentials
            $request.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile

            $fileContent = [System.IO.File]::ReadAllBytes($file)
            $request.ContentLength = $fileContent.Length

            $stream = $request.GetRequestStream()
            $stream.Write($fileContent, 0, $fileContent.Length)
            $stream.Close()

            $response = $request.GetResponse()
            $response.Close()

            Write-Host "✅ $file subido correctamente"
        } catch {
            Write-Host "❌ Error subiendo $file : $_" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠️  Archivo no encontrado: $file"
    }
}

Write-Host "✨ ¡Deploy completado!" -ForegroundColor Green
Write-Host "🌐 https://jorgefonseca.es/news/" -ForegroundColor Cyan
