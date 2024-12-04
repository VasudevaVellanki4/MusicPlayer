import React, { useState, useEffect, useRef } from "react";
import {
  FaHeart,
  FaRandom,
  FaStepBackward,
  FaPause,
  FaPlay,
  FaStepForward,
  FaRetweet,
} from "react-icons/fa";

const SongCard = ({
  currentSong,
  songImage,
  isPlaying,
  audioPlayer,
  onPlayPause,
  onPrevSong,
  onNextSong,
  isRepeat,
  isShuffleMode,
  onToggleRepeat,
  onToggleShuffle,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef(null);

  const formatDisplayTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressBarClick = (e) => {
    if (!audioPlayer || !progressBarRef.current) return;

    const progressBar = progressBarRef.current;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.offsetWidth;

    const clickPercentage = (clickPosition / progressBarWidth) * 100;

    const seekTime = (clickPercentage / 100) * duration;

    audioPlayer.seek(seekTime);
    setCurrentTime(seekTime);
  };

  useEffect(() => {
    let intervalId;
    if (audioPlayer && isPlaying) {
      intervalId = setInterval(() => {
        try {
          const currentTimeValue = audioPlayer.seek() || 0;
          const durationValue = audioPlayer.duration() || 0;

          setCurrentTime(currentTimeValue);
          setDuration(durationValue);
        } catch (error) {
          console.error("Error getting audio time:", error);
        }
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [audioPlayer, isPlaying]);

  return (
    <div className="w-80 bg-gradient-to-b from-stone-900 to-black p-6 min-h-screen flex items-end">
      <div className="bg-red-900 rounded-2xl p-6 shadow-2xl w-full">
        <div className="mb-6">
          <h2 className="text-white/80 uppercase tracking-wider text-sm font-medium text-center">
            Now Playing
          </h2>
        </div>

        <div className="relative">
          <img
            src={songImage || currentSong.picture}
            alt={currentSong.title}
            className="w-full h-[150px] rounded-2xl object-cover mb-4 shadow-lg"
          />
          <button className="absolute top-4 right-4 bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors">
            <FaHeart className="text-white" />
          </button>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold text-white truncate">
            {currentSong.title}
          </h3>
          <p className="text-white/60 text-sm truncate">
            {currentSong.album || "Unknown Album"}
          </p>
        </div>

        <div className="text-center mt-8">
          <div
            ref={progressBarRef}
            className="w-full bg-gray-700 rounded-full h-1 mb-2 cursor-pointer relative"
            onClick={handleProgressBarClick}
          >
            <div
              className="bg-white h-1 rounded-full relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div
                className="absolute top-1/2 right-0 transform -translate-y-1/2 
                           w-4 h-4 bg-white rounded-full shadow-lg 
                           -mr-2 hover:scale-125 transition-transform"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-gray-400 mb-4">
            <span>{formatDisplayTime(currentTime)}</span>
            <span>{formatDisplayTime(duration)}</span>
          </div>

          <div className="flex justify-center space-x-6 items-center">
            <FaRandom
              className={`text-lg cursor-pointer ${
                isShuffleMode ? "text-blue-500" : "text-gray-400"
              }`}
              onClick={onToggleShuffle}
            />
            <FaStepBackward
              className="text-xl cursor-pointer hover:text-blue-500"
              onClick={onPrevSong}
            />
            {isPlaying ? (
              <FaPause
                className="text-3xl cursor-pointer hover:text-blue-500"
                onClick={onPlayPause}
              />
            ) : (
              <FaPlay
                className="text-3xl cursor-pointer hover:text-blue-500"
                onClick={onPlayPause}
              />
            )}
            <FaStepForward
              className="text-xl cursor-pointer hover:text-blue-500"
              onClick={onNextSong}
            />
            <FaRetweet
              className={`text-lg cursor-pointer ${
                isRepeat ? "text-blue-500" : "text-gray-400"
              }`}
              onClick={onToggleRepeat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;