import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const SongList = ({ songs, currentSongIndex }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800 p-4 rounded-lg w-full max-w-md">
      {/* Mobile Compact View */}
      <div className="md:hidden">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center">
            <span className="font-bold mr-2">Now Playing</span>
            {currentSongIndex !== -1 && (
              <span className="text-sm text-gray-400">
                {songs[currentSongIndex].title}
              </span>
            )}
          </div>
          <span>{isExpanded ? "▲" : "▼"}</span>
        </div>

        {isExpanded && (
          <div className="mt-4 max-h-64 overflow-y-auto">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className={`flex items-center justify-between p-2 rounded-md mb-2 ${
                  index === currentSongIndex
                    ? "bg-gray-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-400"
                }`}
              >
                <span>{song.title}</span>
                {index === currentSongIndex && (
                  <span className="text-green-500">Playing</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Full View */}
      <div className="hidden md:block">
        {songs.map((song, index) => (
          <Draggable
            key={song.id}
            draggableId={`song-${song.id}`}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`flex items-center justify-between p-2 rounded-md mb-2 ${
                  index === currentSongIndex
                    ? "bg-gray-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-400"
                }`}
              >
                <span>{song.title}</span>
                {index === currentSongIndex && (
                  <span className="text-green-500">Playing</span>
                )}
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default SongList;
