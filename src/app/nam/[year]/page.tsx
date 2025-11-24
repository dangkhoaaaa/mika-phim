'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MovieListPage from '@/components/movies/MovieListPage';
import { movieService } from '@/services/movieService';
import { Movie, MovieListResponse } from '@/types/movie';

export default function YearPage() {
  const params = useParams();
  const yearParam = params?.year as string;
  const year = Number(yearParam);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState<MovieListResponse['pagination'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!year) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMoviesByYear(year, {
          page: currentPage,
          limit: 24,
          sort_field: 'modified.time',
          sort_type: 'desc',
        });
        setMovies(data.items);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Failed to fetch year movies', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const title = `Phim năm ${year}`;

  return (
    <MovieListPage
      title={title}
      movies={movies}
      loading={loading}
      pagination={pagination}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      emptyMessage="Chưa có phim nào cho năm này"
    />
  );
}

