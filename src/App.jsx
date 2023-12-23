import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AudioProvider } from "./contexts/AudioContext";
import MusicPlayer from "../utils/MusicPlayer";
import SongDetails from "../components/SongDetails";
import PlaylistDetails from "../components/PlaylistDetails";
import ArtistDetails from "../components/ArtistDetails";
import AlbumDetails from "../components/AlbumDetails";
import Home from "./Home";
import AllSearches from "../components/AllSearches";
import Search from "../components/Search";

const App = () => {
  return (
    <>
      <Router>
        <AudioProvider>
          <Search/>
          <div style={{ marginBottom: "100px", marginTop: "70px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/song" element={<SongDetails />} />
              <Route path="/artist/:id" element={<ArtistDetails />} />
              <Route path="/playlist" element={<PlaylistDetails />} />
              <Route path="/album/:id" element={<AlbumDetails />} />
              <Route path="/song/:id" element={<SongDetails />} />
              <Route path="/search/all/:query" element={<AllSearches />} />
            </Routes>
          </div>

          <MusicPlayer />
        </AudioProvider>
      </Router>
    </>
  );
};

export default App;
