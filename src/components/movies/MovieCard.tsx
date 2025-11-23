'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { getMovieImage } from '@/utils/imageUtils';
import { FiPlay, FiInfo } from 'react-icons/fi';

interface MovieCardProps {
  movie: Movie;
  isLarge?: boolean;
}

const MovieCard = ({ movie, isLarge = false }: MovieCardProps) => {
  const imageUrl = getMovieImage(movie);

  return (
    <Link href={`/phim/${movie.slug}`}>
      <div
        className={`group relative cursor-pointer mb-[50px] transition-transform duration-300 hover:scale-105 ${
          isLarge ? 'h-96' : 'h-64'
        }`}
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={movie.name}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-4">
              <button className="bg-white text-black px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition">
                <FiPlay size={20} />
                <span>Phát</span>
              </button>
              <button className="bg-gray-600/80 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-600 transition">
                <FiInfo size={20} />
                <span>Chi tiết</span>
              </button>
            </div>
          </div>

          {movie.episode_current && (
            <div className="absolute top-2 right-2 bg-netflix-red text-white px-2 py-1 rounded text-xs font-bold">
              Tập {movie.episode_current}
            </div>
          )}

          {movie.quality && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
              {movie.quality}
            </div>
          )}
        </div>

        <div className="mt-2">
          <h3 className="text-white font-semibold line-clamp-2 group-hover:text-netflix-red transition">
            {movie.name}
          </h3>
          {movie.year && (
            <p className="text-gray-400 text-sm">{movie.year}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
