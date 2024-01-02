import { FaForward } from "react-icons/fa";
import { AudioContext } from "../../src/contexts/AudioContext";
import { useContext } from "react";

const Next = () => {
  const { setCurrentSong } = useContext(AudioContext);

const handleClick = () => {
  const storedHistory = JSON.parse(sessionStorage.getItem("songHistory"));

  if (storedHistory && storedHistory.length > 1) {
    const updatedHistory = [...storedHistory];
    updatedHistory.pop(); // Remove the last song from history

    const nextSong = updatedHistory[updatedHistory.length - 1];

    setCurrentSong({
      songUrl: nextSong.songUrl,
      songId: nextSong.songId,
      artistName: nextSong.artistName,
      songName: nextSong.songName,
      thumbnail: nextSong.thumbnail,
      isMusicAvailable: true,
      artistID: nextSong.artistID,
    });

    sessionStorage.setItem("songHistory", JSON.stringify(updatedHistory));
  }
};

  return <FaForward onClick={handleClick} />;
};

export default Next;
