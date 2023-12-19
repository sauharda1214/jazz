/* eslint-disable react/prop-types */
import { Box, Image, Text, Link } from "@chakra-ui/react";

const TrendingAlbumCard = ({ album }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="2" flexShrink={0}>
      <Image src={album.image[2].link} alt={album.name} />
      <Link href={album.url} fontSize="xl" fontWeight="semibold" mt="2" isExternal>
        <Text>{album.name}</Text>
      </Link>
      <Text>{album.artists[0].name}</Text>
    </Box>
  );
};

export default TrendingAlbumCard;
