# Hướng dẫn Deploy lên GitHub và Vercel

## Bước 1: Khởi tạo Git và đẩy lên GitHub

### 1.1. Khởi tạo Git repository (nếu chưa có)

```bash
git init
```

### 1.2. Thêm tất cả files vào staging

```bash
git add .
```

### 1.3. Commit code

```bash
git commit -m "Initial commit: Phim MiKa - Netflix-like movie streaming website"
```

### 1.4. Tạo repository trên GitHub

1. Đăng nhập vào [GitHub](https://github.com)
2. Click vào dấu **+** ở góc trên bên phải
3. Chọn **New repository**
4. Đặt tên: `phim-mika` (hoặc tên bạn muốn)
5. Chọn **Public** hoặc **Private**
6. **KHÔNG** tích vào "Initialize this repository with a README"
7. Click **Create repository**

### 1.5. Kết nối và push code lên GitHub

Sau khi tạo repository, GitHub sẽ hiển thị các lệnh. Chạy:

```bash
# Thêm remote origin (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/phim-mika.git

# Đổi tên branch chính thành main (nếu cần)
git branch -M main

# Push code lên GitHub
git push -u origin main
```

## Bước 2: Deploy lên Vercel

### 2.1. Cách 1: Deploy qua Vercel Dashboard (Khuyên dùng)

1. **Đăng ký/Đăng nhập Vercel**
   - Truy cập [vercel.com](https://vercel.com)
   - Đăng nhập bằng GitHub account

2. **Import Project**
   - Click **Add New...** → **Project**
   - Chọn repository `phim-mika` từ danh sách
   - Click **Import**

3. **Cấu hình Project**
   - **Framework Preset**: Next.js (tự động detect)
   - **Root Directory**: `./` (mặc định)
   - **Build Command**: `npm run build` (mặc định)
   - **Output Directory**: `.next` (mặc định)
   - **Install Command**: `npm install` (mặc định)

4. **Environment Variables** (nếu có)
   - Thêm các biến môi trường nếu cần
   - Hiện tại project không cần env variables

5. **Deploy**
   - Click **Deploy**
   - Vercel sẽ tự động build và deploy
   - Sau khi hoàn thành, bạn sẽ nhận được URL: `https://phim-mika.vercel.app`

### 2.2. Cách 2: Deploy qua Vercel CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login vào Vercel
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

## Bước 3: Cấu hình Domain tùy chỉnh (Tùy chọn)

1. Vào **Project Settings** → **Domains**
2. Thêm domain của bạn
3. Cấu hình DNS theo hướng dẫn của Vercel

## Bước 4: Cập nhật code sau này

Mỗi khi bạn push code mới lên GitHub, Vercel sẽ tự động deploy lại:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Lưu ý quan trọng

1. **API Endpoints**: Đảm bảo API `phimapi.com` cho phép CORS từ domain Vercel
2. **Image Domains**: Đã cấu hình trong `next.config.js` cho phimimg.com và phimapi.com
3. **Build Time**: Build có thể mất 2-5 phút tùy vào kích thước project
4. **Free Tier**: Vercel free tier rất hào phóng, đủ cho project này

## Troubleshooting

### Lỗi Build
- Kiểm tra console trong Vercel dashboard
- Đảm bảo tất cả dependencies đã được cài đặt
- Kiểm tra TypeScript errors: `npm run lint`

### Lỗi Runtime
- Kiểm tra Network tab trong browser
- Xem logs trong Vercel dashboard → Functions

### Lỗi Image
- Kiểm tra `next.config.js` đã cấu hình đúng image domains
- Kiểm tra CORS của API image

## Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)



