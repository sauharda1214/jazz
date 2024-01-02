/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { searchSongs } from "../src/api/searchSongs";
import {
  Center,
  Flex,
  Heading,
  Spinner,
  Box,
  Grid,
  IconButton,
  Image,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { BsDownload } from "react-icons/bs";
import { downloadSong } from "../utils/downloadSongs";
import { AudioContext } from "../src/contexts/AudioContext";
import { Link as ReactRouterLink } from "react-router-dom";

const AllSearches = () => {
  const { query } = useParams();
  const [queries, setQueries] = useState(null);

  useEffect(() => {
    const handleSearch = async () => {
      const data = await searchSongs(query);
      setQueries(data);
    };
    handleSearch();
  }, [query]);

  if (!queries) {
    return (
      <Center h={"100%"}>
        <Spinner />
      </Center>
    );
  }

  const result = {
    songs: queries.songs.data,
    artists: queries.artists.data,
    albums: queries.albums.data,
    playlists: queries.playlists.data,
  };

  console.log(result);

  return (
    <>
      <Box p={2}>
        {result.songs.results.length !== 0 && (
          <>
            <Flex
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
              p={2}
              direction={"column"}
            >
              <Heading p={2}>Songs</Heading>
              <Grid
                templateColumns={{
                  base: "repeat(2, 2fr)",
                  md: "repeat(4, 1fr)",
                  lg: "repeat(6, 1fr)",
                }}
                gap={5}
              >
                {result.songs.results.map((song, index) => (
                  <SongCard key={index} song={song} />
                ))}
              </Grid>
            </Flex>
          </>
        )}
      </Box>
    </>
  );
};

const SongCard = ({ song }) => {
  const { setCurrentSong } = useContext(AudioContext);
  const artistID = song.primaryArtistsId;

  const handlePlayClick = async () => {
    if (!song.url) {
      console.error("Song URL is null");
      return;
    }

    try {
      document.title = `${song.primaryArtists} - ${song.name}`;
      setCurrentSong({
        songUrl: song.downloadUrl[4]?.link,
        songId: song.id,
        artistName: song.primaryArtists,
        songName: song.name,
        thumbnail: song.image[2].link,
        isMusicAvailable: true,
        artistID: artistID,
        isPlaylist: false,
        isAlbum: false,
      });
    } catch (error) {
      console.error("Error fetching MP3 link:", error);
    }
  };
  return (
    <>
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
          src={song.image[2].link || <Spinner/>}
          alt={song.name}
          cursor={"pointer"}
          boxSize={"150px"}
        />

        <Text
          fontWeight={"bold"}
          isTruncated
          maxW={"100px"}
          cursor={"pointer"}
          onClick={handlePlayClick}
        >
          {song.name}
        </Text>

        <ChakraLink   as={ReactRouterLink} to={`/artist/${artistID}`}>
          <Text isTruncated maxW={'100px'}>
          {song.primaryArtists}
          </Text>
        </ChakraLink>
      </Box>
    </>
  );
};

export default AllSearches;
