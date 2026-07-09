param(
  [switch]$SkipInstall,
  [switch]$OfflineWebView
)

$ErrorActionPreference = "Stop"
Write-Host "[COAN] Windows Tauri packaging runbook" -ForegroundColor Cyan

if (-not $SkipInstall) {
  Write-Host "[COAN] npm install" -ForegroundColor DarkCyan
  npm install
}

Write-Host "[COAN] Applying package patch" -ForegroundColor DarkCyan
node scripts/apply-tauri-package-patch.mjs

Write-Host "[COAN] Module check" -ForegroundColor DarkCyan
npm run check:modules

Write-Host "[COAN] Global pack audit" -ForegroundColor DarkCyan
npm run audit:coan

Write-Host "[COAN] Tauri packaging audit" -ForegroundColor DarkCyan
npm run audit:tauri

Write-Host "[COAN] Release notes" -ForegroundColor DarkCyan
npm run release:notes

if ($OfflineWebView) {
  Write-Host "[COAN] Tauri build with offline WebView2 overlay" -ForegroundColor Yellow
  npm run tauri:build -- --config src-tauri/tauri.windows-offline.conf.json
} else {
  Write-Host "[COAN] Tauri build" -ForegroundColor Green
  npm run tauri:build
}

Write-Host "[COAN] Expected outputs" -ForegroundColor Cyan
Get-ChildItem -Path "src-tauri/target/release" -Filter "*.exe" -ErrorAction SilentlyContinue | Select-Object FullName, Length
Get-ChildItem -Path "src-tauri/target/release/bundle/nsis" -ErrorAction SilentlyContinue | Select-Object FullName, Length
Get-ChildItem -Path "src-tauri/target/release/bundle/msi" -ErrorAction SilentlyContinue | Select-Object FullName, Length
