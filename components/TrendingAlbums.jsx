import { useState,useEffect } from "react";
import { fetchModules } from "../src/api/home";
import { Box, Grid, Heading } from "@chakra-ui/react";
import TrendingAlbumCard from "../utils/TrendingAlbumCard";

const TrendingAlbums = () => {
  const [trendingAlbums, setTrendingAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchModules();
        setTrendingAlbums(data?.data?.albums || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box p="1" maxWidth="100vw" overflowX="auto">
    <Heading as="h1" mb="4">
      Trending Albums
    </Heading>
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }}
      gap={4}
      overflowX="auto"
    >
      {trendingAlbums.map((album, index) => (
        <TrendingAlbumCard key={index} album={album} />
      ))}
    </Grid>
  </Box>
  )
}

export default TrendingAlbums