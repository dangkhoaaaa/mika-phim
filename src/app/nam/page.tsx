'use client';

import Link from 'next/link';

const generateYears = (count: number = 30) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: count }, (_, index) => currentYear - index);
};

export default function YearsIndexPage() {
  const years = generateYears(40);

  return (
    <div className="min-h-screen container mx-auto px-6 py-8">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Năm phát hành</h1>
          <p className="text-white/70 mt-2">
            Chọn một năm bất kỳ để xem lại những bom tấn đã ra mắt trong năm đó.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {years.map((year) => (
          <Link
            key={year}
            href={`/nam/${year}`}
            className="group px-4 py-3 rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-netflix-red text-center text-white font-semibold hover:text-netflix-red transition-colors"
          >
            {year}
          </Link>
        ))}
      </div>
    </div>
  );
}

