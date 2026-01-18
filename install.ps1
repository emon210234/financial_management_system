# Installation Script for Windows

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Financial Management System Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location -Path "backend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Backend dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

# Create backend .env if not exists
if (-not (Test-Path ".env")) {
    Write-Host "Creating backend .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Backend .env file created" -ForegroundColor Green
    Write-Host "⚠ Remember to edit backend/.env with your credentials!" -ForegroundColor Yellow
}

Set-Location -Path ".."

Write-Host ""

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location -Path "frontend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

# Create frontend .env if not exists
if (-not (Test-Path ".env")) {
    Write-Host "Creating frontend .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Frontend .env file created" -ForegroundColor Green
    Write-Host "⚠ Remember to edit frontend/.env with your credentials!" -ForegroundColor Yellow
}

Set-Location -Path ".."

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Edit backend/.env with your MongoDB and Google OAuth credentials" -ForegroundColor White
Write-Host "2. Edit frontend/.env with your Google OAuth Client ID" -ForegroundColor White
Write-Host "3. Run 'npm start' in backend directory" -ForegroundColor White
Write-Host "4. Run 'npm start' in frontend directory" -ForegroundColor White
Write-Host ""
Write-Host "For detailed setup instructions, see README.md" -ForegroundColor Cyan
