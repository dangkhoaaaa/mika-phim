export interface Movie {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
  year: number;
  category: Category[];
  country: Country[];
  type: string;
  status: string;
  modified: {
    time: string;
  };
  episode_current?: string;
  episode_total?: string;
  quality?: string;
  lang?: string;
  time?: string;
  content?: string;
  chieurap?: boolean;
  sub_docquyen?: boolean;
  is_copyright?: boolean;
  notify?: string;
  showtimes?: string;
  view?: number;
  actor?: string[];
  director?: string[];
  is_sensitive_content?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface MovieListResponse {
  status: boolean;
  items: Movie[];
  pagination: {
    totalItems: number;
    totalItemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  pathImage: string;
  titlePage: string;
}

export interface MovieDetail extends Movie {
  episodes?: Episode[];
  episodesVo?: Episode[];
  episodesSub?: Episode[];
  episodesLite?: Episode[];
  trailer_url?: string;
  currentEpisode?: Episode;
}

export interface MovieDetailResponse {
  status: boolean;
  msg: string;
  movie: Movie;
  episodes: Episode[];
}

export interface Episode {
  server_name: string;
  server_data: ServerData[];
}

export interface ServerData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface SearchParams {
  keyword?: string;
  page?: number;
  sort_field?: string;
  sort_type?: 'asc' | 'desc';
  sort_lang?: 'vietsub' | 'thuyet-minh' | 'long-tieng';
  category?: string;
  country?: string;
  year?: number;
  limit?: number;
}

export interface SearchResponse {
  status: string;
  msg: string;
  data: {
    items: Movie[];
    params: {
      pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        totalPages: number;
      };
    };
    titlePage?: string;
    seoOnPage?: any;
    breadCrumb?: any[];
  };
}

