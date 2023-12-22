/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { getAlbumDetails } from "../src/api/getAlbumDetails";
import { useState, useEffect, useContext } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Center,
  Spinner,
  Flex,
  VStack,
  Link as ChakraLink,
  IconButton,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { AudioContext } from "../src/contexts/AudioContext";
import nowplaying from "../src/assets/music.gif";
import { BsDownload } from "react-icons/bs";
import { downloadSong } from "../utils/downloadSongs";

const AlbumDetails = () => {
  const { id:albumID } = useParams();
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const data = await getAlbumDetails(albumID);
        console.log(data);
        setAlbums(data || null);
      } catch (error) {
        console.error("Error fetching album details:", error);
      }
    };

    fetchAlbumDetails();
  }, [albumID]);

  if (!albums) {
    return (
      <>
        <Center h={"100%"}>
          <Spinner />
        </Center>
      </>
    );
  }

  return (
    <>
      <Box h={"100%"}>
        <Box
          bg="gray.100"
          p={4}
          borderRadius="md"
          boxShadow="md"
          mx={["2", "4", "6"]}
        >
          <Image
            boxSize={"120px"}
            src={albums?.data?.image[2].link}
            alt={albums?.data?.name}
            borderRadius="md"
          />
          <Heading
            textAlign={"center"}
            fontSize={["xl", "2xl", "3xl"]}
            fontWeight="bold"
            mt={4}
          >
            {albums?.data?.name}
          </Heading>
          <ChakraLink
            to={`/artist/${albums?.data?.primaryArtistsId}`}
            as={ReactRouterLink}
          >
            <Text textAlign={"center"} color="gray.600" fontSize="md">
              {albums?.data?.primaryArtists}
            </Text>
          </ChakraLink>
          <Flex>
            <Badge
              display={"inline-block"}
              colorScheme="teal"
              fontSize="sm"
              mt={2}
            >
              {albums?.data?.year}
            </Badge>
          </Flex>
          <Heading ml={2}>Song(s) ({albums?.data?.songCount})</Heading>
          <VStack mt={3} gap={4}>
            {albums?.data?.songs.map((song, index) => (
              <SongsCard key={song.id} song={song} index={index} />
            ))}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

const SongsCard = ({ song, index }) => {
  const { setCurrentSong } = useContext(AudioContext);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = async () => {
    if (song) {
      document.title = `${song.primaryArtists} - ${song.name}`;
      setIsPlaying(true);
      setCurrentSong({
        songUrl: song.downloadUrl[4].link,
        artistName: song.primaryArtists,
        songName: song.name,
        thumbnail: song.image[2].link,
        isMusicAvailable: true,
        artistID: song.primaryArtistsId,
      });
    }
  };
  return (
    <>
      <Flex cursor={"pointer"} w={"100%"} alignItems={"center"} ml={2}>
        <Text fontSize={"x-large"}>{index + 1}) </Text>
        <Image
          onClick={handlePlayClick}
          alt={song.name}
          ml={index < 9 ? "5" : "2"}
          width={"50px"}
          height={"50px"}
          borderRadius={"md"}
          objectFit="cover"
          src={isPlaying ? nowplaying : song.image[2].link}
          mr={0}
        />
        <Box isTruncated display={"flex"} alignItems={"center"} gap={4} ml={2}>
          <Text onClick={handlePlayClick} ml={2} isTruncated>
            {song.name}
          </Text>
          <IconButton
            onClick={() => {
              downloadSong("", song.name, song.downloadUrl[4].link);
            }}
            icon={<BsDownload />}
          />
        </Box>
      </Flex>
    </>
  );
};

export default AlbumDetails;
