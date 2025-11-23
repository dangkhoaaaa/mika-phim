# 📖 Hướng Dẫn Deploy Phim MiKa lên GitHub & Vercel

## 🎯 Mục tiêu
- Đẩy code lên GitHub
- Deploy website lên Vercel (miễn phí)

---

## 📌 BƯỚC 1: Chuẩn bị

### Cài đặt Git (nếu chưa có)
- Tải Git: https://git-scm.com/download/win
- Cài đặt và khởi động lại terminal

### Tạo tài khoản
- GitHub: https://github.com/signup
- Vercel: https://vercel.com/signup (đăng nhập bằng GitHub)

---

## 📌 BƯỚC 2: Khởi tạo Git Repository

### Cách 1: Dùng script tự động (Khuyên dùng)

Mở PowerShell trong thư mục dự án và chạy:

```powershell
.\setup-git.ps1
```

### Cách 2: Chạy thủ công

Mở terminal trong thư mục `D:\phimMiKa` và chạy:

```bash
# Khởi tạo git
git init

# Thêm tất cả files
git add .

# Tạo commit
git commit -m "Initial commit: Phim MiKa"
```

---

## 📌 BƯỚC 3: Tạo Repository trên GitHub

1. **Vào trang tạo repository:**
   - https://github.com/new

2. **Điền thông tin:**
   - **Repository name**: `phim-mika`
   - **Description**: `Website xem phim online giống Netflix`
   - Chọn **Public** (hoặc Private nếu muốn)
   - **KHÔNG** tích vào "Add a README file"
   - **KHÔNG** tích vào "Add .gitignore"
   - **KHÔNG** tích vào "Choose a license"

3. **Click "Create repository"**

---

## 📌 BƯỚC 4: Push code lên GitHub

Sau khi tạo repository, GitHub sẽ hiển thị các lệnh. Chạy các lệnh sau trong terminal:

```bash
# Thay YOUR_USERNAME bằng username GitHub của bạn
# Ví dụ: nếu username là "john", thì dùng: https://github.com/john/phim-mika.git

git remote add origin https://github.com/YOUR_USERNAME/phim-mika.git
git branch -M main
git push -u origin main
```

**Lưu ý:** Lần đầu push sẽ yêu cầu đăng nhập GitHub. Làm theo hướng dẫn trên màn hình.

---

## 📌 BƯỚC 5: Deploy lên Vercel

### Cách 1: Qua Vercel Dashboard (Dễ nhất) ⭐

1. **Vào Vercel:**
   - https://vercel.com/new
   - Đăng nhập bằng GitHub nếu chưa

2. **Import Project:**
   - Click **"Import Git Repository"**
   - Tìm và chọn repository `phim-mika`
   - Click **"Import"**

3. **Cấu hình (Giữ nguyên mặc định):**
   - Framework Preset: **Next.js** (tự động)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy:**
   - Click nút **"Deploy"**
   - Đợi 2-5 phút để build
   - Xong! 🎉

5. **Lấy URL:**
   - Sau khi deploy xong, bạn sẽ thấy URL dạng:
   - `https://phim-mika.vercel.app`
   - Hoặc `https://phim-mika-YOUR_USERNAME.vercel.app`

### Cách 2: Qua Vercel CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

---

## 📌 BƯỚC 6: Cập nhật code sau này

Mỗi khi bạn thay đổi code và muốn deploy lại:

```bash
# Thêm files đã thay đổi
git add .

# Tạo commit
git commit -m "Mô tả thay đổi của bạn"

# Push lên GitHub
git push origin main
```

**Vercel sẽ tự động deploy lại!** Không cần làm gì thêm.

---

## ✅ Checklist

- [ ] Đã cài Git
- [ ] Đã tạo tài khoản GitHub
- [ ] Đã tạo tài khoản Vercel
- [ ] Đã khởi tạo Git repository
- [ ] Đã tạo repository trên GitHub
- [ ] Đã push code lên GitHub
- [ ] Đã deploy lên Vercel
- [ ] Website đã chạy thành công

---

## 🐛 Xử lý lỗi thường gặp

### Lỗi: "fatal: not a git repository"
**Giải pháp:** Chạy `git init` trong thư mục dự án

### Lỗi: "remote origin already exists"
**Giải pháp:** 
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/phim-mika.git
```

### Lỗi: "Permission denied"
**Giải pháp:** 
- Kiểm tra username và repository name đúng chưa
- Đảm bảo đã đăng nhập GitHub trong terminal

### Lỗi Build trên Vercel
**Giải pháp:**
1. Vào Vercel Dashboard → Project → Deployments
2. Click vào deployment bị lỗi
3. Xem logs để biết lỗi cụ thể
4. Thường là do:
   - TypeScript errors → Chạy `npm run lint` để kiểm tra
   - Missing dependencies → Kiểm tra `package.json`
   - Build timeout → Tăng timeout trong Vercel settings

### Website không load ảnh
**Giải pháp:**
- Kiểm tra `next.config.js` đã cấu hình image domains
- Kiểm tra CORS của API `phimapi.com`

---

## 📞 Hỗ trợ

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **GitHub Docs:** https://docs.github.com

---

## 🎉 Chúc mừng!

Nếu bạn đã hoàn thành tất cả các bước, website của bạn đã được deploy thành công!

**URL website:** `https://phim-mika.vercel.app` (hoặc URL Vercel cung cấp)

