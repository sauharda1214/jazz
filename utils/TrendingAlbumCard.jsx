/* eslint-disable react/prop-types */
import { Box, Image, Text,Link as ChakraLink  } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const TrendingAlbumCard = ({ album }) => {
  const albumID = album.id;
  return (
    <Box borderWidth="1px" borderRadius="lg" p="2" >
      <ChakraLink  as={ReactRouterLink} to={`/albums/${albumID}`}>
        <Image src={album.image[2].link} alt={album.name} />
      </ChakraLink>

      <ChakraLink
        as={ReactRouterLink}
        to={`/albums/${albumID}`}
        fontSize="xl"
        fontWeight="semibold"
        mt="2"
      >
        <Text>{album.name}</Text>
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to={`/artist/${album.artists[0].id}`}>
      <Text>{album.artists[0].name}</Text>
      </ChakraLink>

    </Box>
  );
};

export default TrendingAlbumCard;
