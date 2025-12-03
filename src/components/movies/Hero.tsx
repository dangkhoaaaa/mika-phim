'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { getMovieImage } from '@/utils/imageUtils';
import { FiPlay, FiInfo } from 'react-icons/fi';

interface HeroProps {
  movies: Movie[];
}

const Hero = ({ movies }: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [movies.length]);

  if (movies.length === 0) {
    return null; // Don't render anything if there are no movies
  }

  const movie = movies[currentIndex];
  const imageUrl = getMovieImage(movie);

  return (
    <div className="relative h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={movie.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {movie.name}
            </h1>
            {movie.origin_name && movie.origin_name !== movie.name && (
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                {movie.origin_name}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.category?.slice(0, 3).map((cat) => (
                <Link href={`/the-loai/${cat.slug}`} key={cat.id}>
                  <span
                    className="bg-white/20 text-white px-3 py-1 rounded text-sm cursor-pointer hover:bg-white/30 transition"
                  >
                    {cat.name}
                  </span>
                </Link>
              ))}
              {movie.year && (
                <span className="bg-white/20 text-white px-3 py-1 rounded text-sm">
                  {movie.year}
                </span>
              )}
              {movie.episode_current && (
                <span className="bg-netflix-red text-white px-3 py-1 rounded text-sm font-bold">
                  {movie.episode_current}
                  {movie.episode_total && ` / ${movie.episode_total}`}
                </span>
              )}
            </div>
            {movie.content && (
              <p className="text-white/90 mb-6 line-clamp-3 text-sm md:text-base">
                {movie.content}
              </p>
            )}
            <div className="flex space-x-4">
              <Link
                href={`/phim/${movie.slug}`}
                className="bg-white text-black px-8 py-3 rounded flex items-center space-x-2 hover:bg-gray-200 transition font-semibold"
              >
                <FiPlay size={24} />
                <span>Phát ngay</span>
              </Link>
              <Link
                href={`/phim/${movie.slug}`}
                className="bg-gray-600/80 text-white px-8 py-3 rounded flex items-center space-x-2 hover:bg-gray-600 transition font-semibold"
              >
                <FiInfo size={24} />
                <span>Thông tin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;



