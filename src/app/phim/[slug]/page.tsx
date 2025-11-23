'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMovieDetail } from '@/store/slices/movieSlice';
import { getMovieImage } from '@/utils/imageUtils';
import { Episode, ServerData } from '@/types/movie';
import { FiPlay, FiCalendar, FiClock, FiGlobe } from 'react-icons/fi';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function MovieDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const dispatch = useAppDispatch();
  const { currentMovie, loading } = useAppSelector((state) => state.movies);
  const [selectedServer, setSelectedServer] = useState<string>('');
  const [selectedEpisode, setSelectedEpisode] = useState<ServerData | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchMovieDetail(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (currentMovie) {
      // Tự động chọn server đầu tiên
      const firstEpisode = currentMovie.episodes?.[0];
      if (firstEpisode && firstEpisode.server_data.length > 0) {
        setSelectedServer(firstEpisode.server_name);
        setSelectedEpisode(firstEpisode.server_data[0]);
      }
    }
  }, [currentMovie]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  if (!currentMovie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Không tìm thấy phim</div>
      </div>
    );
  }

  const imageUrl = getMovieImage(currentMovie);
  const episodes = currentMovie.episodes || currentMovie.episodesSub || currentMovie.episodesVo || [];

  const handlePlayEpisode = (episode: ServerData) => {
    setSelectedEpisode(episode);
    setShowPlayer(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={currentMovie.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black" />
        </div>

        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 pb-4">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {currentMovie.name}
              </h1>
              {currentMovie.origin_name && currentMovie.origin_name !== currentMovie.name && (
                <p className="text-lg text-gray-300">{currentMovie.origin_name}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Movie Info */}
            {currentMovie.content && (
              <div className="bg-netflix-dark rounded-lg p-4 mb-4">
                <h2 className="text-xl font-bold text-white mb-2">Nội dung phim</h2>
                <p className="text-gray-300 leading-relaxed text-sm">{currentMovie.content}</p>
              </div>
            )}

            {/* Episodes */}
            {episodes.length > 0 && (
              <div className="bg-netflix-dark rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-white">Danh sách tập</h2>
                  {episodes.length > 1 && (
                    <select
                      value={selectedServer}
                      onChange={(e) => {
                        setSelectedServer(e.target.value);
                        const server = episodes.find((ep) => ep.server_name === e.target.value);
                        if (server && server.server_data.length > 0) {
                          setSelectedEpisode(server.server_data[0]);
                        }
                      }}
                      className="bg-netflix-gray text-white px-3 py-1.5 rounded text-sm"
                    >
                      {episodes.map((ep) => (
                        <option key={ep.server_name} value={ep.server_name}>
                          {ep.server_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5">
                  {episodes
                    .find((ep) => ep.server_name === selectedServer)
                    ?.server_data.map((episode) => (
                      <button
                        key={episode.slug}
                        onClick={() => handlePlayEpisode(episode)}
                        className={`bg-netflix-gray text-white px-2 py-1.5 rounded text-xs hover:bg-netflix-red transition ${
                          selectedEpisode?.slug === episode.slug
                            ? 'bg-netflix-red'
                            : ''
                        }`}
                      >
                        {episode.name}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Player */}
            {showPlayer && selectedEpisode && (
              <div className="bg-netflix-dark rounded-lg p-4 mb-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  {selectedEpisode.link_m3u8 ? (
                    <ReactPlayer
                      url={selectedEpisode.link_m3u8}
                      controls
                      width="100%"
                      height="100%"
                      playing
                    />
                  ) : selectedEpisode.link_embed ? (
                    <iframe
                      src={selectedEpisode.link_embed}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white">
                      Không có link phát
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-netflix-dark rounded-lg p-4 sticky top-20">
              <div className="mb-4">
                <Image
                  src={imageUrl}
                  alt={currentMovie.name}
                  width={300}
                  height={450}
                  className="w-full rounded-lg"
                />
              </div>

              <div className="space-y-3">
                {currentMovie.year && (
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <FiCalendar size={16} />
                    <span>Năm: {currentMovie.year}</span>
                  </div>
                )}
                {currentMovie.time && (
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <FiClock size={16} />
                    <span>Thời lượng: {currentMovie.time}</span>
                  </div>
                )}
                {currentMovie.quality && (
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <FiGlobe size={16} />
                    <span>Chất lượng: {currentMovie.quality}</span>
                  </div>
                )}
                {currentMovie.lang && (
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <span>Ngôn ngữ: {currentMovie.lang}</span>
                  </div>
                )}
                {currentMovie.episode_current && (
                  <div className="flex items-center space-x-2 text-gray-300 text-sm">
                    <span>Tập hiện tại: {currentMovie.episode_current}</span>
                  </div>
                )}

                {currentMovie.category && currentMovie.category.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-1.5 text-sm">Thể loại:</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {currentMovie.category.map((cat) => (
                        <span
                          key={cat.id}
                          className="bg-netflix-red text-white px-2 py-0.5 rounded text-xs"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {currentMovie.country && currentMovie.country.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-1.5 text-sm">Quốc gia:</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {currentMovie.country.map((country) => (
                        <span
                          key={country.id}
                          className="bg-netflix-gray text-white px-2 py-0.5 rounded text-xs"
                        >
                          {country.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {currentMovie.actor && currentMovie.actor.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-1.5 text-sm">Diễn viên:</h3>
                    <p className="text-gray-300 text-xs">{currentMovie.actor.join(', ')}</p>
                  </div>
                )}

                {currentMovie.director && currentMovie.director.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-1.5 text-sm">Đạo diễn:</h3>
                    <p className="text-gray-300 text-xs">{currentMovie.director.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

