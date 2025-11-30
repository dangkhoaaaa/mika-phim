'use client';

import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { authService } from '@/services/authService';
import { favoritesService } from '@/services/favoritesService';

interface FavoriteButtonProps {
  contentType: 'movie' | 'comic';
  contentId: string;
  contentTitle: string;
  contentThumb?: string;
  contentSlug?: string;
}

export default function FavoriteButton({
  contentType,
  contentId,
  contentTitle,
  contentThumb,
  contentSlug,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    if (isAuthenticated) {
      checkFavorite();
    }
  }, [contentId, isAuthenticated]);

  const checkFavorite = async () => {
    try {
      const favorite = await favoritesService.checkFavorite(contentId);
      setIsFavorite(favorite);
    } catch (error) {
      console.error('Failed to check favorite:', error);
    }
  };

  const handleToggle = async () => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để lưu yêu thích');
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        await favoritesService.removeFavorite(contentId);
        setIsFavorite(false);
      } else {
        await favoritesService.addFavorite({
          contentType,
          contentId,
          contentTitle,
          contentThumb,
          contentSlug,
        });
        setIsFavorite(true);
      }
    } catch (error: any) {
      console.error('Failed to toggle favorite:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${
        isFavorite
          ? 'bg-[#e50914] text-white hover:bg-[#f40612]'
          : 'bg-[#2f2f2f] text-white hover:bg-[#3f3f3f] border border-gray-600'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <FiHeart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
      <span>{isFavorite ? 'Đã lưu' : 'Lưu để xem sau'}</span>
    </button>
  );
}
