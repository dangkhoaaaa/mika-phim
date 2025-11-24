'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { movieService } from '@/services/movieService';
import { FilterOption } from '@/types/movie';

export default function CategoriesIndexPage() {
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await movieService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen container mx-auto px-6 py-8">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Tất cả thể loại</h1>
          <p className="text-white/70 mt-2">
            Chọn thể loại bạn yêu thích để khám phá kho phim cực khủng của Phim Mika.
          </p>
        </div>
        <span className="text-white/60 text-sm">
          Tổng cộng: {categories.length} thể loại
        </span>
      </div>

      {loading ? (
        <div className="text-white/80 text-lg">Đang tải danh sách thể loại...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/the-loai/${category.slug}`}
              className="group p-4 rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-netflix-red transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold group-hover:text-netflix-red transition-colors">
                  {category.name}
                </h3>
                <span className="text-white/50 text-xs">#{category.slug}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

