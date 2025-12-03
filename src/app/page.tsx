'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchLatestMovies } from '@/store/slices/movieSlice';
import Hero from '@/components/movies/Hero';
import MovieList from '@/components/movies/MovieList';
import FilterExplorer from '@/components/filters/FilterExplorer';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { latestMovies, featuredMovie, loading } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchLatestMovies({ page: 1, version: 'v3' }));
  }, [dispatch]);

  if (loading && latestMovies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  // Chia danh sách phim thành các nhóm để hiển thị
  const heroMovies = latestMovies.slice(0, 5);
  const trendingMovies = latestMovies.slice(5, 15);
  const newMovies = latestMovies.slice(15, 25);
  const popularMovies = latestMovies.slice(25, 35);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {heroMovies.length > 0 && <Hero movies={heroMovies} />}

      <FilterExplorer />

      {/* Movie Lists */}
      <div className="container mx-auto py-8">
        {trendingMovies.length > 0 && (
          <MovieList title="Xu hướng" movies={trendingMovies} />
        )}
        {newMovies.length > 0 && (
          <MovieList title="Mới cập nhật" movies={newMovies} />
        )}
        {popularMovies.length > 0 && (
          <MovieList title="Phổ biến" movies={popularMovies} />
        )}
        {latestMovies.length > 0 && (
          <MovieList title="Tất cả phim mới" movies={latestMovies} />
        )}
      </div>
    </div>
  );
}



