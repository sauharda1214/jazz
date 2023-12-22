/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Text,
  Slider,
  Image,
  VStack,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  IconButton,
  Spinner
} from "@chakra-ui/react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaForward,
  FaBackward,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { AudioContext } from "../src/contexts/AudioContext";
import { useContext } from "react";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

const MusicPlayer = () => {
  const { currentSong } = useContext(AudioContext);

  const {
    songUrl,
    thumbnail,
    artistName,
    songName,
    isMusicAvailable,
    artistID,
  } = currentSong;

  const [audio, setAudio] = useState(new Audio(songUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100); // Chakra UI Slider values are between 0 and 100
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  useEffect(() => {


    const loadAudio = async () => {
      try {
        audio.load();

      } catch (error) {
        console.error("Error loading audio:", error);

      }
    };

    loadAudio();
  }, [audio, songUrl]);

  useEffect(() => {
    setAudio(new Audio(songUrl));
    setVolume(30);
  }, [songUrl]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume, audio]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audio, audio.currentTime]);

  useEffect(() => {
    const playPauseAudio = async () => {
      try {
        if (isPlaying && audio.paused) {
          await audio.play();
        } else if (!isPlaying && !audio.paused) {
          audio.pause();
        }
      } catch (error) {
        console.error("Error while playing/pausing audio:", error);
      }
    };

    if (audio.readyState >= 2) {
      playPauseAudio();
    } else {
      audio.addEventListener("canplaythrough", playPauseAudio);
    }

    return () => {
      audio.removeEventListener("canplaythrough", playPauseAudio);
    };
  }, [isPlaying, audio]);

  useEffect(() => {
    // Pause the previous song when a new one is played
    return () => {
      audio.pause();
      setCurrentTime(0);
    };
  }, [audio]);

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
  };

  const handleSeekChange = (value) => {
    const newTime = (value / 100) * duration;
    setCurrentTime(newTime);
    audio.currentTime = newTime;
  };

  return (
    <Box
      as="footer"
      position="fixed"
      bottom={0}
      left={0}
      width="100vw"
      height="100px"
      padding="10px"
      bgColor="gray.800"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        ml={{ base: "0", md: "6", lg: "6" }}
        spacing={1 / 2}
        marginLeft="1"
      >
        <Image
          boxSize="50px"
          objectFit="cover"
          borderRadius="md"
          src={isMusicAvailable ? thumbnail : "/vite.svg"}
          alt="Album Thumbnail"
          marginRight="4"
          ml={2}
        />
        <Box display={"flex"} gap={3} fontWeight="bold" color="white">
          <ChakraLink
            as={ReactRouterLink}
            to={
              isMusicAvailable
                ? `/artist/${artistID}`
                : "/"
            }
            fontWeight={"400"}
            display={{ base: "none", md: "flex" }}
          >
            {isMusicAvailable ? artistName : "Artist Name"}
          </ChakraLink>
          <span>
            <Box
              className="marquee"
              width={{ base: "100px", md: "150px", lg: "200px" }}
            >
              <span>{isMusicAvailable ? songName : "SONG NAME"}</span>
            </Box>
          </span>
        </Box>
      </VStack>
      <Flex
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flex={1}
      >
        <VStack>
          <HStack gap={3}>
            <IconButton
              rounded={"full"}
              size={"20px"}
              p={2}
              icon={<FaBackward />}
              isDisabled={!isMusicAvailable} // Disable when no music
            />
            <IconButton
              rounded={"full"}
              size={"20px"}
              p={2}
              icon={
                !songUrl ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  isPlaying ? (
                    <FaPause size={"15px"} />
                  ) : (
                    <FaPlay size={"15px"} />
                  )
                )
              }
              onClick={handlePlayPauseClick}
              isDisabled={!isMusicAvailable} // Disable when no music
            />
            <IconButton
              rounded={"full"}
              size={"20px"}
              p={2}
              icon={<FaForward />}
              isDisabled={!isMusicAvailable} // Disable when no music
            />
          </HStack>
          <Slider
            w={{ base: "150px", md: "300px", lg: "450px" }}
            aria-label="slider-ex-1"
            onChange={handleSeekChange}
            onChangeStart={() => setIsPlaying(false)} // Pause when user starts dragging
            onChangeEnd={() => setIsPlaying(true)} // Resume when user stops dragging
            value={isMusicAvailable ? (currentTime / duration) * 100 : 0} // Set to 0 when no music
            isDisabled={!isMusicAvailable} // Disable when no music
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text color="white" fontSize="sm">
            {formatTime(currentTime)} / {"- "}
            {formatTime(duration - currentTime+1)}
          </Text>
        </VStack>
        <Box display={"flex"} alignItems={"flex-start"}>
          <Slider
            aria-label="slider-ex-3"
            defaultValue={volume}
            orientation="vertical"
            h={"70px"}
            onChange={handleVolumeChange}
            isDisabled={!isMusicAvailable} // Disable when no music
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={"15px"}>
              <FaVolumeUp />
            </SliderThumb>
          </Slider>
        </Box>
      </Flex>
    </Box>
  );
};

export default MusicPlayer;
