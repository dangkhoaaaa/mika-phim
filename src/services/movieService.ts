import api from './api';
import {
  MovieListResponse,
  MovieDetail,
  SearchParams,
  SearchResponse,
  MovieDetailResponse,
  FilterOption,
  CollectionResponse,
} from '@/types/movie';

const defaultPagination = (params?: SearchParams): MovieListResponse['pagination'] => ({
  totalItems: 0,
  totalItemsPerPage: params?.limit ?? 24,
  currentPage: params?.page ?? 1,
  totalPages: 1,
});

const transformCollectionResponse = (
  payload: CollectionResponse,
  params?: SearchParams
): MovieListResponse => {
  if (payload.status && payload.data) {
    const pagination =
      payload.data.pagination ||
      payload.data.params?.pagination ||
      defaultPagination(params);

    return {
      status: true,
      items: payload.data.items || [],
      pagination,
      pathImage: payload.data.APP_DOMAIN_CDN_IMAGE || '',
      titlePage: payload.data.titlePage || '',
    };
  }

  return {
    status: false,
    items: [],
    pagination: defaultPagination(params),
    pathImage: '',
    titlePage: '',
  };
};

export const movieService = {
  // Lấy danh sách phim mới cập nhật
  getLatestMovies: async (page: number = 1, version: 'v1' | 'v2' | 'v3' = 'v3'): Promise<MovieListResponse> => {
    const endpoint = version === 'v1' 
      ? `/danh-sach/phim-moi-cap-nhat?page=${page}`
      : `/danh-sach/phim-moi-cap-nhat-${version}?page=${page}`;
    
    const response = await api.get<MovieListResponse>(endpoint);
    return response.data;
  },

  // Lấy thông tin chi tiết phim
  getMovieDetail: async (slug: string): Promise<MovieDetail> => {
    const response = await api.get<MovieDetailResponse>(`/phim/${slug}`);
    
    // Transform response to match MovieDetail format
    if (response.data && response.data.status && response.data.movie) {
      return {
        ...response.data.movie,
        episodes: response.data.episodes || [],
      };
    }
    
    throw new Error('Failed to fetch movie detail');
  },

  // Lấy thông tin phim theo TMDB ID
  getMovieByTMDB: async (type: 'tv' | 'movie', id: number): Promise<MovieDetail> => {
    const response = await api.get<MovieDetail>(`/tmdb/${type}/${id}`);
    return response.data;
  },

  // Tổng hợp danh sách phim
  getMovieList: async (
    typeList: string,
    params: SearchParams = {}
  ): Promise<MovieListResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.sort_field) queryParams.append('sort_field', params.sort_field);
    if (params.sort_type) queryParams.append('sort_type', params.sort_type);
    if (params.sort_lang) queryParams.append('sort_lang', params.sort_lang);
    if (params.category) queryParams.append('category', params.category);
    if (params.country) queryParams.append('country', params.country);
    if (params.year) queryParams.append('year', params.year.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/v1/api/danh-sach/${typeList}${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<CollectionResponse>(endpoint);
    return transformCollectionResponse(response.data, params);
  },

  // Tìm kiếm phim
  searchMovies: async (params: SearchParams): Promise<MovieListResponse> => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.keyword) queryParams.append('keyword', params.keyword);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.sort_field) queryParams.append('sort_field', params.sort_field);
      if (params.sort_type) queryParams.append('sort_type', params.sort_type);
      if (params.sort_lang) queryParams.append('sort_lang', params.sort_lang);
      if (params.category) queryParams.append('category', params.category);
      if (params.country) queryParams.append('country', params.country);
      if (params.year) queryParams.append('year', params.year.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const response = await api.get<SearchResponse>(`/v1/api/tim-kiem?${queryParams.toString()}`);
      
      // Transform response to match MovieListResponse format
      if (response.data && response.data.status === 'success' && response.data.data) {
        return {
          status: true,
          items: response.data.data.items || [],
          pagination: response.data.data.params?.pagination || {
            totalItems: 0,
            totalItemsPerPage: 24,
            currentPage: params.page || 1,
            totalPages: 1,
          },
          pathImage: '',
          titlePage: response.data.data.titlePage || '',
        };
      }
      
      // Fallback
      return {
        status: false,
        items: [],
        pagination: {
          totalItems: 0,
          totalItemsPerPage: 24,
          currentPage: params.page || 1,
          totalPages: 1,
        },
        pathImage: '',
        titlePage: '',
      };
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Lấy danh sách thể loại
  getCategories: async (): Promise<FilterOption[]> => {
    const response = await api.get<FilterOption[]>('/the-loai');
    return response.data;
  },

  // Lấy phim theo thể loại
  getMoviesByCategory: async (
    categorySlug: string,
    params: SearchParams = {}
  ): Promise<MovieListResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.sort_field) queryParams.append('sort_field', params.sort_field);
    if (params.sort_type) queryParams.append('sort_type', params.sort_type);
    if (params.sort_lang) queryParams.append('sort_lang', params.sort_lang);
    if (params.country) queryParams.append('country', params.country);
    if (params.year) queryParams.append('year', params.year.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/v1/api/the-loai/${categorySlug}${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<CollectionResponse>(endpoint);
    return transformCollectionResponse(response.data, params);
  },

  // Lấy danh sách quốc gia
  getCountries: async (): Promise<FilterOption[]> => {
    const response = await api.get<FilterOption[]>('/quoc-gia');
    return response.data;
  },

  // Lấy phim theo quốc gia
  getMoviesByCountry: async (
    countrySlug: string,
    params: SearchParams = {}
  ): Promise<MovieListResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.sort_field) queryParams.append('sort_field', params.sort_field);
    if (params.sort_type) queryParams.append('sort_type', params.sort_type);
    if (params.sort_lang) queryParams.append('sort_lang', params.sort_lang);
    if (params.category) queryParams.append('category', params.category);
    if (params.year) queryParams.append('year', params.year.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/v1/api/quoc-gia/${countrySlug}${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<CollectionResponse>(endpoint);
    return transformCollectionResponse(response.data, params);
  },

  // Lấy phim theo năm
  getMoviesByYear: async (
    year: number,
    params: SearchParams = {}
  ): Promise<MovieListResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.sort_field) queryParams.append('sort_field', params.sort_field);
    if (params.sort_type) queryParams.append('sort_type', params.sort_type);
    if (params.sort_lang) queryParams.append('sort_lang', params.sort_lang);
    if (params.category) queryParams.append('category', params.category);
    if (params.country) queryParams.append('country', params.country);
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/v1/api/nam/${year}${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<CollectionResponse>(endpoint);
    return transformCollectionResponse(response.data, params);
  },

  // Chuyển đổi ảnh sang WEBP
  convertImageToWebP: (imageUrl: string): string => {
    return `https://phimapi.com/image.php?url=${encodeURIComponent(imageUrl)}`;
  },
};

