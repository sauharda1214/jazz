import { FaForward } from "react-icons/fa";
import { AudioContext } from "../../src/contexts/AudioContext";
import { useContext } from "react";

const Next = () => {
  const { setCurrentSong } = useContext(AudioContext);

  const handleClick = () => {
    const storedHistory = JSON.parse(sessionStorage.getItem("songHistory"));

    // Check if storedHistory is not empty
    if (storedHistory && storedHistory.length >= 1) {
      const nextSong = storedHistory[storedHistory.length - 1];

      // Assuming setCurrentSong expects an object with song details
      setCurrentSong({
        songUrl: nextSong.songUrl,
        songId: nextSong.songId,
        artistName: nextSong.artistName,
        songName: nextSong.songName,
        thumbnail: nextSong.thumbnail,
        isMusicAvailable: true,
        artistID: nextSong.artistID,
      });

    }
  };

  return <FaForward onClick={handleClick} />;
};

export default Next;
