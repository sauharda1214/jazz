import { useState } from 'react';
import TrendingTabs from "./TrendingTabs";
import Search from "./Search";
import MusicPlayer from '../utils/MusicPlayer'

const Home = () => {
  const [currentSong, setCurrentSong] = useState({
    songUrl: null,
    artistName: null,
    songName: null,
    thumbnail: null,
    isMusicAvailable: false,
  });

  return (
    <>
      <Search />
      <TrendingTabs setCurrentSong={setCurrentSong} />
      <MusicPlayer {...currentSong} />
    </>
  );
};

export default Home;