/* eslint-disable react/prop-types */
import { useContext } from "react";
import {
  Box,
  Image,
  Text,
  IconButton,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { getAudio } from "../src/api/getAudiofile";
import { formattedURL } from "../utils/getFormattedURL";
import { Link as ReactRouterLink } from "react-router-dom";
import { AudioContext } from "../src/contexts/AudioContext";
import { BsDownload } from "react-icons/bs";
import { downloadSong } from "./downloadSongs";

const TrendingSongCard = ({ song }) => {
  const { setCurrentSong } = useContext(AudioContext);
  const artistID = song.primaryArtists[0].id;

  const handlePlayClick = async () => {
    if (!song.url) {
      console.error("Song URL is null");
      return;
    }

    try {
      const data = await getAudio(formattedURL(song.url));
      if (data) {
        document.title = `${song.primaryArtists[0].name} - ${song.name}`;
        setCurrentSong({
          songUrl: data?.data[0]?.downloadUrl[4]?.link,
          songId: song.id,
          artistName: song.primaryArtists[0].name,
          songName: song.name,
          thumbnail: song.image[2].link,
          isMusicAvailable: true,
          artistID: artistID,
          isPlaylist: false,
          isAlbum: false,
        });
      }
    } catch (error) {
      console.error("Error fetching MP3 link:", error);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="2">
      <IconButton
        size={"sm"}
        m={2}
        onClick={() => {
          downloadSong(song.url, song.name, "");
        }}
        isRound
        icon={<BsDownload />}
      />
      <Image
        onClick={handlePlayClick}
        src={song.image[2].link}
        alt={song.name}
      />

      <Text cursor={'pointer'} onClick={handlePlayClick} maxW={"100%"}>{song.name}</Text>

      <ChakraLink as={ReactRouterLink} to={`/artist/${artistID}`}>
        {song.primaryArtists[0].name}
      </ChakraLink>
    </Box>
  );
};

export default TrendingSongCard;
