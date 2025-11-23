'use client';

import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface MovieListProps {
  title: string;
  movies: Movie[];
  isHorizontal?: boolean;
}

const MovieList = ({ title, movies, isHorizontal = true }: MovieListProps) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  if (isHorizontal) {
    return (
      <div className="mb-8">
        <h2 className="text-white text-2xl font-bold mb-4 px-4">{title}</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={16}
          slidesPerView={2}
          slidesPerGroup={2}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1024: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            1280: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
          }}
          className="px-4"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {title && <h2 className="text-white text-2xl font-bold mb-3 px-4">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;

