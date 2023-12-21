import Home from "../components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SongDetails from "../components/SongDetails";
import PlaylistDetails from "../components/PlaylistDetails";
import ArtistDetails from "../components/ArtistDetails";
import AlbumDetails from "../components/AlbumDetails";
import { AudioProvider } from "./contexts/AudioContext";
import MusicPlayer from "../utils/MusicPlayer";
import Search from "../components/Search";


const App = () => {
  return (
    <Router>
      <AudioProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/song" element={<SongDetails />} />
          <Route path="/artist/:artistID" element={<ArtistDetails />} />
          <Route path="/playlist" element={<PlaylistDetails />} />
          <Route path="/albums/:albumID" element={<AlbumDetails />} />
        </Routes>
        <Search/>
        <MusicPlayer/>
      </AudioProvider>
    </Router>
  );
};

export default App;
