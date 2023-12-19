import Home from "../components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SongDetails from "../components/SongDetails";
import PlaylistDetails from "../components/PlaylistDetails";
import ArtistDetails from "../components/ArtistDetails";
import AlbumDetails from "../components/AlbumDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/song" element={<SongDetails />} />
        <Route path="/artist" element={<ArtistDetails />} />
        <Route path="/playlist" element={<PlaylistDetails />} />
        <Route path="/album" element={<AlbumDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
