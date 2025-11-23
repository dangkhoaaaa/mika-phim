'use client';

import { ReactNode } from 'react';
import MovieList from './MovieList';
import Pagination from '@/components/common/Pagination';
import { Movie } from '@/types/movie';

interface MovieListPageProps {
  title: string;
  movies: Movie[];
  loading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  } | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  emptyMessage?: string;
  loadingMessage?: string;
  titleSize?: 'text-3xl' | 'text-4xl';
}

const MovieListPage = ({
  title,
  movies,
  loading,
  pagination,
  currentPage,
  onPageChange,
  emptyMessage = 'Không tìm thấy kết quả nào',
  loadingMessage = 'Đang tải...',
  titleSize = 'text-4xl',
}: MovieListPageProps) => {
  return (
    <div className="min-h-screen container mx-auto px-6 py-6">
      <h1 className={`${titleSize} font-bold text-white mb-6`}>{title}</h1>

      {loading && movies.length === 0 ? (
        <div className="text-white text-xl">{loadingMessage}</div>
      ) : !loading && movies.length === 0 ? (
        <div className="text-white text-xl">{emptyMessage}</div>
      ) : (
        <>
          <MovieList title="" movies={movies} isHorizontal={false} />

          {pagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MovieListPage;

