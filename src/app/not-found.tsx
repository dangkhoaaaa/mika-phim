import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-gray-300 mb-8">Trang không tìm thấy</h2>
        <Link
          href="/"
          className="bg-netflix-red text-white px-6 py-3 rounded hover:bg-red-700 transition"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}



