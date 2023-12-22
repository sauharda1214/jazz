import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AudioProvider } from "./contexts/AudioContext";
import MusicPlayer from "../utils/MusicPlayer";
import Search from "../components/Search";
import SongDetails from "../components/SongDetails";
import PlaylistDetails from "../components/PlaylistDetails";
import ArtistDetails from "../components/ArtistDetails";
import AlbumDetails from "../components/AlbumDetails";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <AudioProvider>
        <div style={{ marginBottom: "100px", marginTop: "70px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/song" element={<SongDetails />} />
            <Route path="/artist/:artistID" element={<ArtistDetails />} />
            <Route path="/playlist" element={<PlaylistDetails />} />
            <Route path="/album/:albumID" element={<AlbumDetails />} />
          </Routes>
        </div>
        <Search />
          <MusicPlayer />
      </AudioProvider>
    </Router>
  );
};

export default App;
