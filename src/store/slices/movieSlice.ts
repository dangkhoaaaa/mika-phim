import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { movieService } from '@/services/movieService';
import { Movie, MovieDetail, MovieListResponse, SearchParams } from '@/types/movie';

interface MovieState {
  latestMovies: Movie[];
  featuredMovie: Movie | null;
  currentMovie: MovieDetail | null;
  searchResults: Movie[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  } | null;
}

const initialState: MovieState = {
  latestMovies: [],
  featuredMovie: null,
  currentMovie: null,
  searchResults: [],
  loading: false,
  error: null,
  pagination: null,
};

// Async thunks
export const fetchLatestMovies = createAsyncThunk(
  'movies/fetchLatestMovies',
  async ({ page = 1, version = 'v3' }: { page?: number; version?: 'v1' | 'v2' | 'v3' }) => {
    const response = await movieService.getLatestMovies(page, version);
    return response;
  }
);

export const fetchMovieDetail = createAsyncThunk(
  'movies/fetchMovieDetail',
  async (slug: string) => {
    const movie = await movieService.getMovieDetail(slug);
    return movie;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (params: SearchParams) => {
    const response = await movieService.searchMovies(params);
    return response;
  }
);

export const fetchMovieList = createAsyncThunk(
  'movies/fetchMovieList',
  async ({ typeList, params }: { typeList: string; params?: SearchParams }) => {
    const response = await movieService.getMovieList(typeList, params);
    return response;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
    setFeaturedMovie: (state, action: PayloadAction<Movie>) => {
      state.featuredMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch latest movies
      .addCase(fetchLatestMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.latestMovies = action.payload.items;
        state.pagination = {
          currentPage: action.payload.pagination.currentPage,
          totalPages: action.payload.pagination.totalPages,
          totalItems: action.payload.pagination.totalItems,
        };
        // Set featured movie (first movie)
        if (action.payload.items.length > 0 && !state.featuredMovie) {
          state.featuredMovie = action.payload.items[0];
        }
      })
      .addCase(fetchLatestMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      })
      // Fetch movie detail
      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie detail';
      })
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.items;
        state.pagination = {
          currentPage: action.payload.pagination.currentPage,
          totalPages: action.payload.pagination.totalPages,
          totalItems: action.payload.pagination.totalItems,
        };
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search movies';
      })
      // Fetch movie list
      .addCase(fetchMovieList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieList.fulfilled, (state, action) => {
        state.loading = false;
        state.latestMovies = action.payload.items;
        state.pagination = {
          currentPage: action.payload.pagination.currentPage,
          totalPages: action.payload.pagination.totalPages,
          totalItems: action.payload.pagination.totalItems,
        };
      })
      .addCase(fetchMovieList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie list';
      });
  },
});

export const { clearSearchResults, clearCurrentMovie, setFeaturedMovie } = movieSlice.actions;
export default movieSlice.reducer;

