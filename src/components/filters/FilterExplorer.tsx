'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import FilterSection from './FilterSection';
import { movieService } from '@/services/movieService';
import { FilterOption } from '@/types/movie';

const MAX_ITEMS = 12;

const formatLabel = (label: string) => {
  if (!label) return '';
  return label
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const FilterExplorer = () => {
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [countries, setCountries] = useState<FilterOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);
        const [categoryData, countryData] = await Promise.all([
          movieService.getCategories(),
          movieService.getCountries(),
        ]);

        setCategories(categoryData.slice(0, MAX_ITEMS));
        setCountries(countryData.slice(0, MAX_ITEMS));
      } catch (error) {
        console.error('Failed to fetch filters', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, index) => currentYear - index);
  }, []);

  if (loading && categories.length === 0 && countries.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-white/70 text-sm">Đang tải bộ lọc...</div>
      </div>
    );
  }

  return (
    <section className="py-8 bg-gradient-to-b from-black/20 to-black/50 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Khám phá theo sở thích</h2>
          <p className="text-white/60 text-sm md:text-base">
            Chọn nhanh thể loại, quốc gia hoặc năm phát hành để tìm bộ phim yêu thích
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-white text-xl font-semibold">Thể loại nổi bật</h3>
            <Link href="/the-loai" className="text-sm text-white/70 hover:text-netflix-red transition">
              Xem tất cả →
            </Link>
          </div>
          <FilterSection
            title=""
            items={categories.map((cat) => ({
              label: formatLabel(cat.name),
              href: `/the-loai/${cat.slug}`,
            }))}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-white text-xl font-semibold">Quốc gia</h3>
            <Link href="/quoc-gia" className="text-sm text-white/70 hover:text-netflix-red transition">
              Xem tất cả →
            </Link>
          </div>
          <FilterSection
            title=""
            items={countries.map((country) => ({
              label: formatLabel(country.name),
              href: `/quoc-gia/${country.slug}`,
            }))}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-white text-xl font-semibold">Năm phát hành</h3>
            <Link href="/nam" className="text-sm text-white/70 hover:text-netflix-red transition">
              Xem tất cả →
            </Link>
          </div>
          <FilterSection
            title=""
            items={years.map((year) => ({
              label: year.toString(),
              href: `/nam/${year}`,
            }))}
          />
        </div>
      </div>
    </section>
  );
};

export default FilterExplorer;

