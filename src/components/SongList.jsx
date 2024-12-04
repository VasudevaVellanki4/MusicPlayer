import React from "react";
import { Draggable } from "react-beautiful-dnd";

const SongList = ({ songs, currentSongIndex }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg w-full max-w-md">
      {songs.map((song, index) => (
        <Draggable key={song.id} draggableId={`song-${song.id}`} index={index}>
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
  );
};

export default SongList;
