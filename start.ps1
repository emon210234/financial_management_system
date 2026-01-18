# Start Backend and Frontend Servers

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Starting Financial Management System" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env files exist
if (-not (Test-Path "backend/.env")) {
    Write-Host "✗ Backend .env file not found!" -ForegroundColor Red
    Write-Host "Please run install.ps1 first and configure your .env files" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path "frontend/.env")) {
    Write-Host "✗ Frontend .env file not found!" -ForegroundColor Red
    Write-Host "Please run install.ps1 first and configure your .env files" -ForegroundColor Yellow
    exit 1
}

Write-Host "Starting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start"

Start-Sleep -Seconds 2

Write-Host "Starting frontend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host ""
Write-Host "✓ Both servers are starting in separate windows" -ForegroundColor Green
Write-Host ""
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Close the terminal windows to stop the servers" -ForegroundColor Yellow
