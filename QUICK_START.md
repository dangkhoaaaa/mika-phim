# 🚀 Quick Start - Deploy Phim MiKa

## 📋 Checklist trước khi deploy

- [ ] Đã cài đặt Git
- [ ] Đã có tài khoản GitHub
- [ ] Đã có tài khoản Vercel (hoặc đăng ký miễn phí)

## ⚡ Các bước nhanh

### 1️⃣ Khởi tạo Git (Chạy script tự động)

**Windows PowerShell:**
```powershell
.\setup-git.ps1
```

**Hoặc chạy thủ công:**
```bash
git init
git add .
git commit -m "Initial commit: Phim MiKa"
```

### 2️⃣ Tạo Repository trên GitHub

1. Vào: https://github.com/new
2. Repository name: `phim-mika`
3. Chọn **Public** hoặc **Private**
4. **KHÔNG** tích "Initialize with README"
5. Click **Create repository**

### 3️⃣ Push code lên GitHub

```bash
# Thay YOUR_USERNAME bằng username GitHub của bạn
git remote add origin https://github.com/YOUR_USERNAME/phim-mika.git
git branch -M main
git push -u origin main
```

### 4️⃣ Deploy lên Vercel

**Cách nhanh nhất:**

1. Vào: https://vercel.com/new
2. Click **Import Git Repository**
3. Chọn repository `phim-mika`
4. Click **Deploy** (giữ nguyên cấu hình mặc định)
5. Đợi 2-3 phút → Done! 🎉

**URL của bạn sẽ là:** `https://phim-mika.vercel.app`

## 🔄 Cập nhật code sau này

```bash
git add .
git commit -m "Mô tả thay đổi"
git push origin main
```

Vercel sẽ tự động deploy lại!

## 📚 Xem thêm

- File `DEPLOY.md` để biết chi tiết đầy đủ
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## ❓ Gặp vấn đề?

1. Kiểm tra console trong Vercel dashboard
2. Xem logs trong tab **Deployments**
3. Đảm bảo build thành công: `npm run build`



