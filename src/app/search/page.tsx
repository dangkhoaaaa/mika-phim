'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { searchMovies, clearSearchResults } from '@/store/slices/movieSlice';
import MovieListPage from '@/components/movies/MovieListPage';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const dispatch = useAppDispatch();
  const { searchResults, loading, pagination } = useAppSelector((state) => state.movies);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Clear previous results when query changes
    dispatch(clearSearchResults());
    setCurrentPage(1);
  }, [query, dispatch]);

  useEffect(() => {
    if (query) {
      dispatch(searchMovies({ keyword: query, page: currentPage }));
    }
  }, [query, currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MovieListPage
      title={`Kết quả tìm kiếm: "${query}"`}
      movies={searchResults}
      loading={loading}
      pagination={pagination}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      emptyMessage="Không tìm thấy kết quả nào"
      loadingMessage="Đang tìm kiếm..."
      titleSize="text-3xl"
    />
  );
}

