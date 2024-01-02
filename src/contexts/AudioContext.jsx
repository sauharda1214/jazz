// AudioContext.js
import { createContext, useState } from "react";

export const AudioContext = createContext();

// eslint-disable-next-line react/prop-types
export const AudioProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState({
    songUrl: "",
    songId: "",
    thumbnail: "",
    artistName: "",
    songName: "",
    isMusicAvailable: false,
    artistID:"",
  });

  return (
    <AudioContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </AudioContext.Provider>
  );
};
