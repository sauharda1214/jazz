
import { Routes, Route } from "react-router-dom";
import { AudioProvider } from "./contexts/AudioContext";
import MusicPlayer from "../utils/MusicPlayer";
import Search from "../components/Search";
import TrendingTabs from "../components/TrendingTabs";
import SongDetails from "../components/SongDetails";
import PlaylistDetails from "../components/PlaylistDetails";
import ArtistDetails from "../components/ArtistDetails";
import AlbumDetails from "../components/AlbumDetails";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <AudioProvider>
      <ChakraProvider>
        <div style={{ marginBottom: '100px', marginTop: '70px' }}>
          <Routes>
            <Route path="/" element={<TrendingTabs />} />
            <Route path="/song" element={<SongDetails />} />
            <Route path="/artist/:artistID" element={<ArtistDetails />} />
            <Route path="/playlist" element={<PlaylistDetails />} />
            <Route path="/albums/:albumID" element={<AlbumDetails />} />
          </Routes>
          <Search />
          <MusicPlayer />
        </div>
      </ChakraProvider>
    </AudioProvider>
  );
};

export default App;
