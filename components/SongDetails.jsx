import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AudioContext } from "../src/contexts/AudioContext";
import { getSongDetails } from "../src/api/getSongDetails";
import {
  Center,
  Spinner,
  Box,
  Image,
  Text,
  IconButton,
  Badge,
  Flex,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FaHeart, FaPlay } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { downloadSong } from "../utils/downloadSongs";
import { Link as ReactRouterLink } from "react-router-dom";

const SongDetails = () => {
  const { id: songId } = useParams();
  const [songDetails, setSongDetails] = useState(null);
  const { setCurrentSong } = useContext(AudioContext);

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const data = await getSongDetails(songId);
        setSongDetails(data);
      } catch (error) {
        console.error("Error fetching song details:", error);
      }
    };

    fetchSongDetails();
  }, [songId]);

  if (!songDetails) {
    return (
      <>
        <Center h={"100%"}>
          <Spinner />
        </Center>
      </>
    );
  }

  const handlePlayClick = async () => {
    if (songDetails) {
      document.title = `${songDetails?.data[0]?.primaryArtists} - ${songDetails?.data[0]?.name}`;
      setCurrentSong({
        songUrl: songDetails?.data[0]?.downloadUrl[4].link,
        songId: songDetails?.data[0]?.id,
        artistName: songDetails?.data[0]?.primaryArtists,
        songName: songDetails?.data[0]?.name,
        thumbnail: songDetails?.data[0]?.image[2].link,
        isMusicAvailable: true,
        artistID: songDetails?.data[0]?.primaryArtistsId,
        isPlaylist: false,
        isAlbum: false,
      });
    }
  };

  return (
    <Box p={2}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        maxW="lg"
        mx="auto"
        boxShadow="lg"
        textAlign="center"
      >
        <Flex gap={2} w={"100%"}>
          <IconButton isRound icon={<FaHeart />} />
          <IconButton
            onClick={() =>
              downloadSong(
                "",
                songDetails?.data[0]?.name,
                songDetails?.data[0]?.downloadUrl[4].link
              )
            }
            isRound
            icon={<BsDownload />}
          />
          <IconButton onClick={handlePlayClick} isRound icon={<FaPlay />} />
        </Flex>
        <Image
          borderRadius="md"
          boxSize="150px"
          src={songDetails?.data[0]?.image[2].link}
          mx="auto"
          my={4}
        />
        <Flex alignItems={"flex-start"} direction={"column"}>
          <Heading fontSize={'x-large'}  isTruncated w={"100%"} textAlign={"center"}>
            <span>
            {songDetails?.data[0]?.name}
            </span>
            
          </Heading>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            fontWeight="bold"
            fontSize="2xl"
            flexDir={"column"}
            mt={3}
          >
            <Text p={2} display={"flex"} gap={2}>
              <Badge colorScheme="green" variant="subtle">
                {songDetails?.data[0]?.year}
              </Badge>
              <Badge colorScheme="purple" variant="subtle">
                {songDetails?.data[0]?.label}
              </Badge>
              <Badge colorScheme="red">{songDetails?.data[0]?.language}</Badge>
            </Text>

            <Flex fontSize={"sm"} gap={2} alignItems={"center"}>
              <FaPlay />
              <Text>
                {songDetails?.data[0]?.playCount.toLocaleString("en-US")}
              </Text>
            </Flex>
            <Flex padding={2} fontSize={"sm"} gap={2} alignItems={"center"}>
              <ChakraLink
                as={ReactRouterLink}
                to={`/artist/${songDetails?.data[0]?.primaryArtistsId}`}
              >
                <Badge colorScheme="teal">
                  {songDetails?.data[0]?.primaryArtists}
                </Badge>
              </ChakraLink>
              <ChakraLink as={ReactRouterLink} to={`/album/${songDetails?.data[0]?.album.id}`}>
              <Badge
                className="marquee"
                variant={"outline"}
                colorScheme="purple"
              >
                <span>ALBUM: {songDetails?.data[0]?.album.name}</span>
              </Badge>
              </ChakraLink>
              
            </Flex>
          </Flex>

          <Text fontSize="md" mb={2}></Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default SongDetails;
