'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { movieService } from '@/services/movieService';
import { FilterOption } from '@/types/movie';

const CountryCard = ({ country }: { country: FilterOption }) => (
  <Link
    href={`/quoc-gia/${country.slug}`}
    className="group p-4 rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-netflix-red transition-colors flex items-center justify-between"
  >
    <span className="text-white font-semibold group-hover:text-netflix-red transition-colors">
      {country.name}
    </span>
    <span className="text-white/50 text-xs uppercase">{country.slug}</span>
  </Link>
);

export default function CountriesIndexPage() {
  const [countries, setCountries] = useState<FilterOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await movieService.getCountries();
        setCountries(data);
      } catch (error) {
        console.error('Failed to fetch countries', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="min-h-screen container mx-auto px-6 py-8">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Tất cả quốc gia</h1>
          <p className="text-white/70 mt-2">
            Khám phá phim theo từng quốc gia với kho nội dung đa dạng, phong phú.
          </p>
        </div>
        <span className="text-white/60 text-sm">
          Tổng cộng: {countries.length} quốc gia
        </span>
      </div>

      {loading ? (
        <div className="text-white/80 text-lg">Đang tải danh sách quốc gia...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {countries.map((country) => (
            <CountryCard key={country._id} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

