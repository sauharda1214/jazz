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
} from "@chakra-ui/react";
import { FaHeart, FaPlay } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { downloadSong } from "../utils/downloadSongs";

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
          <Heading isTruncated w={"100%"} textAlign={"center"}>
            {songDetails?.data[0]?.name}
          </Heading>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            fontWeight="bold"
            fontSize="2xl"
            flexDir={"column"}
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
              <Badge variant={"outline"} colorScheme="green">
                {songDetails?.data[0]?.primaryArtists}
              </Badge>
              <Badge variant={"outline"} colorScheme="purple">
                ALBUM: {songDetails?.data[0]?.album.name}
              </Badge>
            </Flex>
          </Flex>

          <Text fontSize="md" mb={2}></Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default SongDetails;
