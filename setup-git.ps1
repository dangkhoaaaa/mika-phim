# Script để khởi tạo Git và chuẩn bị push lên GitHub
# Chạy script này: .\setup-git.ps1

Write-Host "=== Khởi tạo Git Repository ===" -ForegroundColor Green

# Kiểm tra xem đã có git chưa
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git chưa được cài đặt. Vui lòng cài đặt Git trước." -ForegroundColor Red
    exit 1
}

# Khởi tạo git repository
Write-Host "`n1. Khởi tạo Git repository..." -ForegroundColor Yellow
git init

# Thêm tất cả files
Write-Host "`n2. Thêm files vào staging..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "`n3. Tạo commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Phim MiKa - Netflix-like movie streaming website"

Write-Host "`n=== Hoàn thành! ===" -ForegroundColor Green
Write-Host "`nBước tiếp theo:" -ForegroundColor Cyan
Write-Host "1. Tạo repository trên GitHub: https://github.com/new" -ForegroundColor White
Write-Host "2. Chạy các lệnh sau (thay YOUR_USERNAME bằng username GitHub của bạn):" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/phim-mika.git" -ForegroundColor Yellow
Write-Host "   git branch -M main" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host "`nHoặc xem file DEPLOY.md để biết chi tiết hơn." -ForegroundColor Cyan



