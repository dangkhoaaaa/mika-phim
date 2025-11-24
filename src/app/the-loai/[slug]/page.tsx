'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MovieListPage from '@/components/movies/MovieListPage';
import { movieService } from '@/services/movieService';
import { Movie, MovieListResponse } from '@/types/movie';
import { formatSlugToTitle } from '@/utils/stringUtils';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState<MovieListResponse['pagination'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMoviesByCategory(slug, {
          page: currentPage,
          limit: 24,
          sort_field: 'modified.time',
          sort_type: 'desc',
        });
        setMovies(data.items);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Failed to fetch category movies', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const title = `Thể loại: ${formatSlugToTitle(slug)}`;

  return (
    <MovieListPage
      title={title}
      movies={movies}
      loading={loading}
      pagination={pagination}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      emptyMessage="Chưa có phim nào trong thể loại này"
    />
  );
}

