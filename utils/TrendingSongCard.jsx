/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Box, Image, Text, Link } from '@chakra-ui/react';
import { getAudio } from '../src/api/getAudiofile';
import { formattedURL } from '../utils/getFormattedURL';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { AudioContext } from '../src/contexts/AudioContext';

const TrendingSongCard = ({ song }) => {
  const { setCurrentSong } = useContext(AudioContext);
  const artistID = song.primaryArtists[0].id;

  const handlePlayClick = async () => {
    try {
      const data = await getAudio(formattedURL(song.url));
      if (data) {
        document.title = `${song.primaryArtists[0].name} - ${song.name}`;
        setCurrentSong({
          songUrl: data?.data[0]?.downloadUrl[4]?.link,
          artistName: song.primaryArtists[0].name,
          songName: song.name,
          thumbnail: song.image[2].link,
          isMusicAvailable: true,
          artistID: artistID,
        });
        console.log(artistID)
      }
    } catch (error) {
      console.error('Error fetching MP3 link:', error);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="2" flexShrink={0}>
      <Image onClick={handlePlayClick} src={song.image[2].link} alt={song.name} />
      <Link onClick={handlePlayClick} fontSize="xl" fontWeight="semibold" mt="2" isExternal>
        <Text>{song.name}</Text>
      </Link>
      <ChakraLink as={ReactRouterLink} to={`/artist/${artistID}`}>
        {song.primaryArtists[0].name}
      </ChakraLink>
    </Box>
  );
};

export default TrendingSongCard;
