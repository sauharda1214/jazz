/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Text,
  Image,
  VStack,
  HStack,
  IconButton,
  Spinner,
  Link as ChakraLink,
  Slider,
  SliderThumb,
  SliderFilledTrack,
  SliderTrack,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaPlay, FaPause, FaVolumeUp} from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { AudioContext } from "../src/contexts/AudioContext";
import { useContext } from "react";
import { BsDownload, BsFullscreen } from "react-icons/bs";
import { downloadSong } from "./downloadSongs";
import songHistory from "./songHistory";
import Previous from "../components/controls/Previous";
import Next from "../components/controls/Next";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

const MusicPlayer = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const { currentSong } = useContext(AudioContext);

  const {
    songUrl,
    songId,
    thumbnail,
    artistName,
    songName,
    isMusicAvailable,
    artistID,
  } = currentSong;


  if (songUrl != "") {
    const isSongInHistory = songHistory.some(
      (historyItem) => historyItem.songId === songId
    );

    if (!isSongInHistory) {
      songHistory.push({
        songUrl: songUrl,
        songId: songId,
        artistName: artistName,
        songName: songName,
        thumbnail: thumbnail,
        isMusicAvailable: true,
        artistID: artistID,
      });

      sessionStorage.setItem("songHistory", JSON.stringify(songHistory));
    }
  }

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
    setVolume(100);
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
      audio.remove();
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
      height="110px"
      padding="10px"
      bgColor="gray.800"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <VStack ml={{ base: "0", md: "6", lg: "6" }} spacing={2} marginLeft="1">
        <ChakraLink to={!songId ? "/" : `/song/${songId}`} as={ReactRouterLink}>
          <Image
            boxSize="50px"
            objectFit="cover"
            borderRadius="md"
            src={isMusicAvailable ? thumbnail : "/vite.svg"}
            alt="Album Thumbnail"
            marginRight="4"
            ml={2}
          />
        </ChakraLink>

        <Box display={"flex"} gap={3} fontWeight="bold" color="white">
          <ChakraLink
            as={ReactRouterLink}
            to={isMusicAvailable ? `/artist/${artistID}` : "/"}
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
        <VStack gap={4}>
          <HStack gap={3}>
            <IconButton
              rounded={"full"}
              size={"sm"}
              p={2}
              icon={<Previous />}
              isDisabled={!isMusicAvailable}
            />

            <IconButton
              rounded={"full"}
              size={"sm"}
              p={2}
              icon={
                !songUrl ? (
                  <Spinner size="sm" color="white" />
                ) : isPlaying ? (
                  <FaPause size={"15px"} />
                ) : (
                  <FaPlay size={"15px"} />
                )
              }
              onClick={handlePlayPauseClick}
              isDisabled={!isMusicAvailable} // Disable when no music
            />
            <IconButton
              rounded={"full"}
              size={"sm"}
              p={2}
              icon={<Next/>}
              isDisabled={!isMusicAvailable} // Disable when no music
            />
          </HStack>

          <input
            type="range"
            min="0"
            max="100"
            value={
              isMusicAvailable
                ? isNaN(currentTime) || isNaN(duration)
                  ? 0
                  : (currentTime / duration) * 100
                : 0
            }
            onChange={(e) => handleSeekChange(Number(e.target.value))}
            onMouseDown={() => setIsPlaying(false)}
            onMouseUp={() => setIsPlaying(true)}
            disabled={!isMusicAvailable}
            style={{
              width: `${isLargerThan600 ? "300px" : "150px"}`,
              height: "6px",
              outline: "none",
              border: "none",
              margin: "0",
              padding: "0",
              cursor: "pointer",
            }}
          />
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={4}
            color="white"
            fontSize="sm"
          >
            <Text>
              {formatTime(currentTime)} / {"- "}
              {formatTime(duration - currentTime + 1)}
            </Text>
            <IconButton
              onClick={() => {
                downloadSong("", songName, songUrl);
              }}
              display={!songUrl ? "none" : "block"}
              isDisabled={!songUrl}
              size={"sm"}
              isRound
              icon={<BsDownload color="green" />}
            />
            <ChakraLink as={ReactRouterLink} to={`/song/${songId}`}>
              <IconButton
                isDisabled={!songUrl}
                isRound
                icon={<BsFullscreen />}
                size={"sm"}
              />
            </ChakraLink>
          </Box>
        </VStack>
        <Box display={"flex"} alignItems={"flex-start"}>
          <Slider
            aria-label="slider-ex-3"
            defaultValue={isNaN(volume) ? 0 : volume}
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
