import React, { useState } from "react";
import { FaSearch, FaMusic, FaPlay, FaFilter, FaBars } from "react-icons/fa";

const SkeletonSongItem = () => (
  <div className="grid grid-cols-12 items-center p-4 animate-pulse md:grid">
    <div className="col-span-1 hidden md:block">
      <div className="h-4 w-4 bg-gray-700 rounded"></div>
    </div>
    <div className="col-span-12 md:col-span-4 flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
      <div className="space-y-2 flex-grow">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
    <div className="hidden md:block md:col-span-2">
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
    <div className="hidden md:block md:col-span-2">
      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
    </div>
    <div className="hidden md:block md:col-span-3">
      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
    </div>
  </div>
);

const MusicContent = ({
  songs,
  songImages,
  currentSongIndex,
  isPlaying,
  onSongSelect,
  formatTime,
  audioPlayer,
  isLoading,
}) => {
  const [activeSection, setActiveSection] = useState("Music");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-[#5D0000] via-[#300000] to-black overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4">
        <div className="flex items-center">
          <FaMusic className="text-red-500 mr-2" />
          <h1 className="text-xl font-bold text-white">DreamMusic</h1>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
            <FaSearch className="text-white" />
          </button>
          <button onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
            <FaBars className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black p-4">
          <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search songs, artists, albums"
              className="bg-transparent text-white placeholder-gray-400 w-full outline-none mr-3"
            />
            <FaSearch
              className="text-gray-400"
              onClick={() => setIsMobileSearchOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop/Tablet Header */}
      <div className="hidden md:flex justify-center items-center p-6">
        <div className="flex justify-between w-full max-w-6xl items-center">
          <div className="flex space-x-6">
            {["Music", "Podcast", "Live", "Radio"].map((section) => (
              <button
                key={section}
                className={`text-lg font-semibold transition-colors ${
                  activeSection === section
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 w-96">
            <input
              type="text"
              placeholder="Search songs, artists, albums"
              className="bg-transparent text-white placeholder-gray-400 w-full outline-none mr-3"
            />
            <FaSearch className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content - Remains similar, with minor responsive adjustments */}
      <div className="px-4 md:px-[60px] pb-20 space-y-8 max-w-6xl mx-auto w-full mt-4 md:mt-[90px]">
        {/* Large Featured Song Section - Adjusted for mobile */}
        {isLoading ? (
          <div className="w-full h-[200px] md:h-[300px] bg-gray-800 rounded-2xl animate-pulse"></div>
        ) : (
          songs.length > 0 && (
            <div className="w-full h-[200px] md:h-[300px] relative rounded-2xl overflow-hidden">
              <img
                src={
                  songImages[currentSongIndex] ||
                  songs[currentSongIndex].picture
                }
                alt={songs[currentSongIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-xl md:text-3xl font-bold text-white">
                  {songs[currentSongIndex].title}
                </h3>
                <p className="text-sm md:text-xl text-gray-300">
                  {songs[currentSongIndex].artist}
                </p>
              </div>
            </div>
          )
        )}

        {/* Song List Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">Popular</h2>
          <button className="flex items-center text-gray-400 hover:text-white transition-colors text-sm md:text-base">
            See All
          </button>
        </div>

        <div className="rounded-lg overflow-hidden">
          {/* Header for Larger Screens */}
          <div className="hidden md:grid grid-cols-12 p-4 text-gray-400 font-medium sticky top-0 z-10">
            <div className="col-span-1">#</div>
            <div className="col-span-4">TITLE</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-2">TIME</div>
            <div className="col-span-3">ALBUM</div>
          </div>

          {/* Song List */}
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <>
                {[...Array(10)].map((_, index) => (
                  <SkeletonSongItem key={index} />
                ))}
              </>
            ) : (
              songs.map((song, index) => {
                const isCurrentSong = index === currentSongIndex;
                const isCurrentlyPlaying = isCurrentSong && isPlaying;

                return (
                  <div
                    key={index}
                    onClick={() => onSongSelect(index)}
                    className={`grid grid-cols-12 items-center p-4 cursor-pointer transition-all duration-200
                      ${
                        isCurrentlyPlaying
                          ? "bg-red-500/20 border-l-4 border-red-500"
                          : isCurrentSong
                          ? "bg-red-500/10 border-l-4 border-red-500/50"
                          : "hover:bg-red-500/5 border-l-4 border-transparent"
                      }
                    `}
                  >
                    {/* Mobile-friendly song item layout */}
                    <div className="col-span-12 md:col-span-12 grid grid-cols-12 gap-2 items-center">
                      {/* Index/Playing Icon - Hidden on mobile */}
                      <div className="hidden md:block md:col-span-1">
                        {isCurrentSong ? (
                          <FaMusic
                            className={`${
                              isPlaying
                                ? "text-red-500 animate-pulse"
                                : "text-gray-400"
                            }`}
                          />
                        ) : (
                          <span className="text-gray-400">{index + 1}</span>
                        )}
                      </div>

                      {/* Song Details - Full Width on Mobile */}
                      <div className="col-span-12 md:col-span-4 flex items-center space-x-4">
                        <img
                          src={songImages[index] || song.picture}
                          alt={song.title}
                          className={`w-12 h-12 rounded-lg object-cover ${
                            isCurrentlyPlaying ? "ring-2 ring-red-500" : ""
                          }`}
                        />
                        <div>
                          <div
                            className={`font-medium text-sm md:text-base ${
                              isCurrentlyPlaying ? "text-red-500" : "text-white"
                            }`}
                          >
                            {song.title}
                          </div>
                          <div className="text-xs md:text-sm text-gray-400">
                            {song.artist}
                          </div>
                        </div>
                      </div>

                      {/* Status - Hidden on Mobile */}
                      <div className="hidden md:block md:col-span-2">
                        {isCurrentlyPlaying ? (
                          <span className="text-red-500 animate-pulse text-sm">
                            Playing
                          </span>
                        ) : isCurrentSong ? (
                          <span className="text-red-500/50 text-sm">
                            Paused
                          </span>
                        ) : (
                          <FaPlay className="text-gray-400 text-sm" />
                        )}
                      </div>

                      {/* Time - Hidden on Mobile */}
                      <div className="hidden md:block md:col-span-2 text-gray-400 text-sm">
                        {formatTime(song.duration)}
                      </div>

                      {/* Album - Hidden on Mobile */}
                      <div className="hidden md:block md:col-span-3 text-gray-400 text-sm">
                        {song.album || "Unknown Album"}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicContent;
