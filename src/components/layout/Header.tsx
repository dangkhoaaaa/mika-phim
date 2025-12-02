'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useAppDispatch } from '@/store/hooks';
import { searchMovies } from '@/store/slices/movieSlice';
import { authService } from '@/services/authService';
import LoginModal from '@/components/auth/LoginModal';
import RegisterModal from '@/components/auth/RegisterModal';
import UserMenu from '@/components/user/UserMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Listen for auth changes
    const checkAuth = () => setIsAuthenticated(authService.isAuthenticated());
    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchMovies({ keyword: searchQuery, page: 1 }));
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-netflix-black' : 'bg-black/50'
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
            <Link href="/the-loai" className="text-white hover:text-gray-300 transition">
              Thể loại
            </Link>
            <Link href="/quoc-gia" className="text-white hover:text-gray-300 transition">
              Quốc gia
            </Link>
            <Link href="/nam" className="text-white hover:text-gray-300 transition">
              Năm phát hành
            </Link>
          </nav>

          {/* Search, Auth, and Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={toggleSearch}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5 text-white" />
            </button>

            {/* Auth Section */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-white hover:text-gray-300 transition"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className="bg-[#e50914] text-white px-4 py-2 rounded hover:bg-[#f40612] transition"
                >
                  Đăng ký
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-gray-300 transition"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-800">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm phim..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-netflix-red"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-2 bg-netflix-red hover:bg-red-700 rounded transition-colors text-white"
              >
                Tìm
              </button>
            </form>
          </div>
        )}

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
              <Link
                href="/the-loai"
                className="text-white hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Thể loại
              </Link>
              <Link
                href="/quoc-gia"
                className="text-white hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Quốc gia
              </Link>
              <Link
                href="/nam"
                className="text-white hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Năm phát hành
              </Link>
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-800">
              {!isAuthenticated && (
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left bg-white text-black py-2 px-3 rounded hover:bg-gray-200 transition"
                  >
                    Đăng nhập
                  </button>                  <button
                    onClick={() => {
                      setShowRegister(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left bg-[#e50914] text-white px-3 py-2 rounded hover:bg-[#f40612] transition"
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </header>
  );
};

export default Header;

