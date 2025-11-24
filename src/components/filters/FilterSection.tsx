'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface FilterItem {
  label: string;
  href: string;
}

interface FilterSectionProps {
  title: string;
  items: FilterItem[];
}

const FilterSection = ({ title, items }: FilterSectionProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {title && <h3 className="text-white text-xl font-semibold">{title}</h3>}
      <div className="flex gap-2 flex-wrap">
        {items.map((item) => (
          <motion.div
            key={item.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={item.href}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/10 hover:border-netflix-red hover:text-netflix-red transition-colors duration-200"
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;

