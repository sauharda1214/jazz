import { Box, Image, Text, Link, Badge, Center, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getArtistDetails } from "../src/api/getArtistDetails";
import { useState, useEffect } from "react";

const ArtistDetails = () => {
  const { artistURL } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const data = await getArtistDetails(artistURL);
        const artistData = {
          image: data?.data?.image[2].link || "/vite.svg",
          name: data?.data?.name,
          followerCount: data?.data?.followerCount,
          fanCount: data?.data?.fanCount,
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
  }, [artistURL]);

  if (!artist) {
    return <Center h={'100%'}>
      <Spinner/>
    </Center>
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      maxW="md"
      mx="auto"
      boxShadow="lg"
      textAlign="center"
      m={2}
    >
      <Image
        borderRadius="full"
        boxSize="150px"
        src={artist.image}
        alt={artist.name}
        mx="auto"
        my={4}
      />
      <Text fontWeight="bold" fontSize="2xl" mb={2}>
        {artist.name}
      </Text>
      <Text fontSize="md" mb={2}>
        Followers: {artist.followerCount}
      </Text>
      <Text fontSize="md" mb={2}>
        Fans: {artist.fanCount}
      </Text>
      <Link href={artist.wikipediaUrl} color="teal.500" isExternal mb={2}>
        Wikipedia
      </Link>
      <Badge
        variant="subtle"
        colorScheme={artist.isVerified ? "green" : "red"}
        mb={2}
      >
        {artist.isVerified ? "Verified" : "Not Verified"}
      </Badge>
      <Text fontSize="md" mb={2}>
        Dominant Language: {artist.dominantLanguage}
      </Text>
      <Text fontSize="md">Dominant Type: {artist.dominantType}</Text>
    </Box>
  );
};

export default ArtistDetails;
