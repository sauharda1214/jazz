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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getArtistDetails } from "../src/api/getArtistDetails";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import {getArtistSongs} from '../src/api/getArtistSongs'

const ArtistDetails = () => {
  const { artistID } = useParams();
  const [artist, setArtist] = useState(null);


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
        console.log(data)

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
        maxW="md"
        mx="auto"
        boxShadow="lg"
        textAlign="center"
      >
         <Flex w={'100%'}>
         <IconButton isRound icon={<FaHeart/>}/>
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
            flexDir={'column'}
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
    </Box>
  );
};

export default ArtistDetails;
