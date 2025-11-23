# Phim MiKa - Website Xem Phim Online

Website xem phim online với giao diện giống Netflix, được xây dựng bằng Next.js, React, Redux Toolkit và TypeScript.

## 🚀 Tính năng

- ✅ Giao diện đẹp mắt, giống Netflix
- ✅ Xem phim mới cập nhật
- ✅ Tìm kiếm phim
- ✅ Xem chi tiết phim và danh sách tập
- ✅ Phân loại phim: Phim bộ, Phim lẻ, Hoạt hình
- ✅ Responsive design, tối ưu cho mobile
- ✅ Tối ưu hình ảnh với WebP
- ✅ State management với Redux Toolkit

## 🛠️ Công nghệ sử dụng

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Swiper** - Carousel component
- **React Player** - Video player
- **Axios** - HTTP client
- **Framer Motion** - Animations

## 📦 Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd phimMiKa
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy development server:
```bash
npm run dev
```

4. Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

## 🏗️ Cấu trúc dự án

```
phimMiKa/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Trang chủ
│   │   ├── layout.tsx         # Root layout
│   │   ├── phim/              # Trang chi tiết phim
│   │   ├── phim-bo/           # Trang phim bộ
│   │   ├── phim-le/           # Trang phim lẻ
│   │   ├── hoat-hinh/         # Trang hoạt hình
│   │   └── search/            # Trang tìm kiếm
│   ├── components/            # React components
│   │   ├── layout/           # Layout components
│   │   └── movies/           # Movie components
│   ├── store/                # Redux store
│   │   ├── store.ts          # Store configuration
│   │   └── slices/           # Redux slices
│   ├── services/             # API services
│   ├── types/                # TypeScript types
│   └── utils/                # Utility functions
├── public/                   # Static files
└── package.json
```

## 📡 API Integration

Dự án sử dụng API từ [phimapi.com](https://phimapi.com) với các endpoints:

- `GET /danh-sach/phim-moi-cap-nhat` - Lấy phim mới cập nhật
- `GET /phim/{slug}` - Lấy chi tiết phim
- `GET /v1/api/danh-sach/{type}` - Lấy danh sách phim theo loại
- `GET /v1/api/tim-kiem` - Tìm kiếm phim
- `GET /the-loai` - Lấy danh sách thể loại
- `GET /quoc-gia` - Lấy danh sách quốc gia

## 🎨 Giao diện

- Màu sắc chủ đạo: Netflix Red (#E50914), Black (#141414)
- Responsive design cho tất cả thiết bị
- Smooth animations và transitions
- Hero section với phim nổi bật
- Horizontal scrolling movie lists

## 📝 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Chạy ESLint

## 🚀 Deploy

### Deploy lên Vercel (Khuyên dùng)

1. **Khởi tạo Git và push lên GitHub:**
   ```bash
   # Chạy script tự động (Windows)
   .\setup-git.ps1
   
   # Hoặc thủ công
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/phim-mika.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy trên Vercel:**
   - Vào [vercel.com](https://vercel.com) và đăng nhập bằng GitHub
   - Click **Add New Project**
   - Import repository `phim-mika`
   - Click **Deploy** (giữ nguyên cấu hình mặc định)
   - Đợi vài phút → Done! 🎉

Xem chi tiết trong file `QUICK_START.md` hoặc `DEPLOY.md`

## 🔧 Cấu hình

### Next.js Config
- Image optimization với domains: phimimg.com, phimapi.com
- React Strict Mode enabled

### Tailwind Config
- Custom colors: netflix-red, netflix-black, netflix-dark, netflix-gray
- Custom gradients cho overlays

## 📄 License

MIT

## 👨‍💻 Tác giả

Phim MiKa Team

# mika-phim
