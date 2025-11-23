import { movieService } from '@/services/movieService';

/**
 * Chuyển đổi URL ảnh sang định dạng WEBP để tối ưu hiệu suất
 */
export const getOptimizedImageUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl || imageUrl.trim() === '') {
    // Return a placeholder SVG data URL
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QaGltIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
  }
  
  // Nếu đã là URL từ phimapi.com/image.php thì không cần convert lại
  if (imageUrl.includes('phimapi.com/image.php')) {
    return imageUrl;
  }
  
  // Nếu đã là full URL từ phimimg.com thì dùng trực tiếp, không convert
  if (imageUrl.startsWith('https://phimimg.com/') || imageUrl.startsWith('http://phimimg.com/')) {
    return imageUrl;
  }
  
  // Nếu là relative path (bắt đầu với "upload/"), thêm domain
  let fullUrl = imageUrl;
  if (imageUrl.startsWith('upload/') || imageUrl.startsWith('/upload/')) {
    fullUrl = `https://phimimg.com/${imageUrl.replace(/^\//, '')}`;
  } else if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
    // Nếu không có protocol, thêm domain
    fullUrl = `https://phimimg.com/${imageUrl}`;
  }
  
  // Chỉ convert sang WebP nếu URL chưa được convert
  return movieService.convertImageToWebP(fullUrl);
};

/**
 * Lấy URL poster hoặc thumb của phim
 */
export const getMovieImage = (movie: { poster_url?: string; thumb_url?: string }): string => {
  return getOptimizedImageUrl(movie.poster_url || movie.thumb_url);
};

