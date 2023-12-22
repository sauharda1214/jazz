import { useState, useEffect } from "react";
import { fetchModules } from "../src/api/home";
import { Box, Grid, Heading } from "@chakra-ui/react";
import TrendingSongCard from "../utils/TrendingSongCard";


const TrendingSongs = () => {
  const [trendingSongs, setTrendingSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchModules();
        setTrendingSongs(data?.data?.trending?.songs || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box p="1">
      <Heading as="h1" mb="4">
        Trending Songs
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(2, 2fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {trendingSongs.map((song, index) => (
          <TrendingSongCard key={index} song={song} />
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingSongs;
