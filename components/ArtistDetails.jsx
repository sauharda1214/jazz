import { Box, Image, Text, Link, Badge } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {getArtistDetails} from '../src/api/getArtistDetails'
import { useState, useEffect } from "react";

const ArtistDetails =  () => {
  const { artistURL } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      const data = await getArtistDetails(artistURL);
      console.log(data)
      const artistData = {
        image: data?.data?.image[1].url || '/vite.svg',
        name: data?.data?.name,
        followerCount: data?.data?.followerCount,
        fanCount: data?.data?.fanCount,
        wikipediaUrl: data?.data?.wiki,
        isVerified:data?.data?.isVerified,
        dominantLanguage:data?.data?.dominantLanguage,
        dominantType:data?.data?.dominantType,
      }
      setArtist(artistData);
    }

    fetchArtistDetails();
  }, [artistURL]);

  if (!artist) {
    return null; // or a loading spinner
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      maxW="sm"
      mx="auto"
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
      <Text mb={2}>Followers: {artist.followerCount}</Text>
      <Text mb={2}>Fans: {artist.fanCount}</Text>
      <Link href={artist.wikipediaUrl} color="teal.500" isExternal mb={2}>
        Wikipedia
      </Link>
      <Badge colorScheme={artist.isVerified ? "green" : "red"} mb={2}>
        {artist.isVerified ? "Verified" : "Not Verified"}
      </Badge>
      <Text mb={2}>Dominant Language: {artist.dominantLanguage}</Text>
      <Text>Dominant Type: {artist.dominantType}</Text>
    </Box>
  );
};

export default ArtistDetails;
