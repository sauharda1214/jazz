import { FaBackward } from "react-icons/fa";
import { AudioContext } from "../../src/contexts/AudioContext";
import { useContext } from "react";

const Previous = () => {
  const { setCurrentSong } = useContext(AudioContext);

  const handleClick = () => {
    const storedHistory = JSON.parse(sessionStorage.getItem("songHistory"));

    if (storedHistory && storedHistory.length > 1) {
      const updatedHistory = [...storedHistory];
      updatedHistory.pop(); // Remove the last song from history

      const lastSong = updatedHistory[updatedHistory.length - 1];

      setCurrentSong({
        songUrl: lastSong.songUrl,
        songId: lastSong.songId,
        artistName: lastSong.artistName,
        songName: lastSong.songName,
        thumbnail: lastSong.thumbnail,
        isMusicAvailable: true,
        artistID: lastSong.artistID,
      });

      sessionStorage.setItem("songHistory", JSON.stringify(updatedHistory));
    }
  };

  return (
    <>
      <FaBackward onClick={handleClick} />
    </>
  );
};

export default Previous;
