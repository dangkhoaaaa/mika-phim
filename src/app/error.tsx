'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl text-white mb-4">Đã xảy ra lỗi!</h2>
        <p className="text-gray-300 mb-8">{error.message}</p>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={reset}
            className="bg-netflix-red text-white px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="bg-netflix-gray text-white px-6 py-3 rounded hover:bg-gray-600 transition"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

