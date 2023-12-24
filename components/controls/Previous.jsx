import { FaBackward } from "react-icons/fa";
import { AudioContext } from "../../src/contexts/AudioContext";
import { useContext } from "react";

const Previous = () => {
  const { setCurrentSong } = useContext(AudioContext);
  const handleClick = () => {
    const storedHistory = JSON.parse(sessionStorage.getItem("songHistory"));
    if (storedHistory && storedHistory.length >1) {

      const lastSong = storedHistory[storedHistory.length -= 2];

      // Assuming setCurrentSong expects an object with song details
      setCurrentSong({
        songUrl: lastSong.songUrl,
        songId: lastSong.songId,
        artistName: lastSong.artistName,
        songName: lastSong.songName,
        thumbnail: lastSong.thumbnail,
        isMusicAvailable: true,
        artistID: lastSong.artistID,
      });

      console.log(lastSong)
    }
    
  };

  return (
    <>
      <FaBackward onClick={handleClick} />
    </>
  );
};

export default Previous;
