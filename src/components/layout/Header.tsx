'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useAppDispatch } from '@/store/hooks';
import { searchMovies } from '@/store/slices/movieSlice';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchMovies({ keyword: searchQuery, page: 1 }));
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Phim MiKa Logo"
                fill
                className="object-contain"
                priority
                sizes="40px"
              />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-netflix-red text-2xl font-bold">PHIM</span>
              <span className="text-white text-2xl font-bold">MIKA</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-gray-300 transition">
              Trang chủ
            </Link>
            <Link href="/phim-bo" className="text-white hover:text-gray-300 transition">
              Phim bộ
            </Link>
            <Link href="/phim-le" className="text-white hover:text-gray-300 transition">
              Phim lẻ
            </Link>
            <Link href="/hoat-hinh" className="text-white hover:text-gray-300 transition">
              Hoạt hình
            </Link>
          </nav>

          {/* Search and Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm phim..."
                    className="bg-black/80 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-netflix-red w-64"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className="text-white hover:text-gray-300"
                  >
                    <FiX size={20} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-white hover:text-gray-300 transition"
                >
                  <FiSearch size={20} />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-gray-300 transition"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                href="/phim-bo"
                className="text-white hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Phim bộ
              </Link>
              <Link
                href="/phim-le"
                className="text-white hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Phim lẻ
              </Link>
              <Link
                href="/hoat-hinh"
                className="text-white hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Hoạt hình
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

