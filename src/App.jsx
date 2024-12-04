import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import Sidebar from "./components/Sidebar";
import MusicContent from "./components/MusicContent";
import SongCard from "./components/SongCard";

const MusicPlayerInterface = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [songImages, setSongImages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffleMode, setIsShuffleMode] = useState(false);

  const progressIntervalRef = useRef(null);

  const generateFallbackImage = (text) => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text || "Music", canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL();
  };

  useEffect(() => {
    const fetchSongsAndImages = async () => {
      setIsLoading(true);
      try {
        const tracksResponse = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${
            import.meta.env.VITE_JAMENDO_CLIENT_ID
          }&format=json&limit=20`
        );
        const tracksData = await tracksResponse.json();

        const imagesMap = tracksData.results.reduce((acc, song, index) => {
          acc[index] =
            song.image || generateFallbackImage(song.artist || "Music");
          return acc;
        }, {});

        setSongImages(imagesMap);
        setSongs(tracksData.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setIsLoading(false);
      }
    };

    fetchSongsAndImages();
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      if (audioPlayer) {
        audioPlayer.unload();
      }

      const player = new Howl({
        src: [songs[currentSongIndex].audio],
        html5: true,
        volume: volume,
        onplay: () => {
          setIsPlaying(true);
          startProgressTracking();
        },
        onpause: () => {
          setIsPlaying(false);
          stopProgressTracking();
        },
        onend: () => {
          stopProgressTracking();
          handleSongEnd();
        },
      });

      setAudioPlayer(player);
      player.play();
    }

    return () => {
      if (audioPlayer) {
        audioPlayer.unload();
      }
      stopProgressTracking();
    };
  }, [currentSongIndex, songs]);

  const startProgressTracking = () => {
    stopProgressTracking();
    progressIntervalRef.current = setInterval(() => {
      if (audioPlayer) {
        const currentTime = audioPlayer.seek() || 0;
        const duration = audioPlayer.duration() || 1;
        setProgress((currentTime / duration) * 100);
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const handlePlayPause = () => {
    if (audioPlayer) {
      if (isPlaying) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
    }
  };

  const handleSongEnd = () => {
    if (isRepeat) {
      audioPlayer.play();
    } else if (isShuffleMode) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(randomIndex);
    } else {
      handleNextSong();
    }
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSongSelect = (index) => {
    if (index === currentSongIndex) {
      handlePlayPause();
    } else {
      setCurrentSongIndex(index);
    }
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    setIsShuffleMode(false);
  };

  const toggleShuffle = () => {
    setIsShuffleMode(!isShuffleMode);
    setIsRepeat(false);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex h-screen text-white">
      <Sidebar />

      <MusicContent
        songs={songs}
        songImages={songImages}
        currentSongIndex={currentSongIndex}
        isPlaying={isPlaying}
        onSongSelect={handleSongSelect}
        formatTime={formatTime}
        audioPlayer={audioPlayer}
        isLoading={isLoading}
      />

      {songs.length > 0 && (
        <SongCard
          currentSong={songs[currentSongIndex]}
          songImage={songImages[currentSongIndex]}
          isPlaying={isPlaying}
          audioPlayer={audioPlayer}
          onPlayPause={handlePlayPause}
          onPrevSong={handlePrevSong}
          onNextSong={handleNextSong}
          formatTime={formatTime}
          isRepeat={isRepeat}
          isShuffleMode={isShuffleMode}
          onToggleRepeat={toggleRepeat}
          onToggleShuffle={toggleShuffle}
        />
      )}
    </div>
  );
};

export default MusicPlayerInterface;
