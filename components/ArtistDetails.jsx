/* eslint-disable react/prop-types */
import {
  Box,
  Text,
  Link,
  Badge,
  Center,
  Spinner,
  Avatar,
  Flex,
  IconButton,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getArtistDetails } from "../src/api/getArtistDetails";
import { useState, useEffect, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { getArtistSongs } from "../src/api/getArtistSongs";
import { AudioContext } from "../src/contexts/AudioContext";
import nowplaying from "../src/assets/music.gif";

const ArtistDetails = () => {
  const { artistID } = useParams();
  const [artist, setArtist] = useState(null);
  const [artistSongs, setArtistSongs] = useState(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const data = await getArtistDetails(artistID);
        const artistData = {
          image: data?.data?.image[2].link || "/vite.svg",
          name: data?.data?.name,
          wikipediaUrl: data?.data?.wiki,
          isVerified: data?.data?.isVerified,
          dominantLanguage: data?.data?.dominantLanguage,
          dominantType: data?.data?.dominantType,
        };
        setArtist(artistData);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };

    fetchArtistDetails();
  }, [artistID]);

  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        const data = await getArtistSongs(artistID);
        setArtistSongs(data);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };

    fetchArtistSongs();
  }, [artistID]);

  if (!artist) {
    return (
      <Center h={"100%"}>
        <Spinner />
      </Center>
    );
  }

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
        <Flex w={"100%"}>
          <IconButton isRound icon={<FaHeart />} />
        </Flex>
        <Avatar
          borderRadius="full"
          boxSize="150px"
          src={artist.image}
          alt={artist.name}
          mx="auto"
          my={4}
        />
        <Flex alignItems={"flex-start"} direction={"column"}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            fontWeight="bold"
            fontSize="2xl"
            flexDir={"column"}
          >
            <Text>
              {artist.name}{" "}
              <Badge
                variant="subtle"
                colorScheme={artist.isVerified ? "green" : "red"}
                mb={2}
              >
                {artist.isVerified ? "Verified" : "Not Verified"}
              </Badge>
            </Text>
            <Link href={artist.wikipediaUrl} color="teal.500" isExternal mb={2}>
              Wikipedia
            </Link>
          </Flex>

          <Text fontSize="md" mb={2}>
            Dominant Language: {artist.dominantLanguage}
          </Text>
          <Text fontSize="md">Dominant Type: {artist.dominantType}</Text>
        </Flex>
      </Box>

      <VStack
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        w="100%"
        ml={2}
        boxShadow="lg"
        mt={3}
        gap={4}
      >
        {artistSongs?.data?.results.map((song, index) => (
          <ArtistSongsCard key={song.id} song={song} index={index} />
        ))}
      </VStack>
    </Box>
  );
};

const ArtistSongsCard = ({ song, index }) => {
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
        <Text onClick={handlePlayClick} ml={2} isTruncated>
          {song.name}
        </Text>
      </Flex>
    </>
  );
};

export default ArtistDetails;
