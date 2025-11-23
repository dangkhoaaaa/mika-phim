'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMovieList } from '@/store/slices/movieSlice';
import MovieListPage from '@/components/movies/MovieListPage';

export default function PhimBoPage() {
  const dispatch = useAppDispatch();
  const { latestMovies, loading, pagination } = useAppSelector((state) => state.movies);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMovieList({ typeList: 'phim-bo', params: { page: currentPage, limit: 20 } }));
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MovieListPage
      title="Phim Bộ"
      movies={latestMovies}
      loading={loading}
      pagination={pagination}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
}

