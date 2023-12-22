import { useState, useEffect } from "react";
import { fetchModules } from "../src/api/home";
import { Box, Grid, Heading } from "@chakra-ui/react";
import TopChartCard from "../utils/TopChartCard";

const TopCharts = () => {
  const [topCharts, setTopCharts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchModules();
        setTopCharts(data)
        setTopCharts(data?.data?.charts || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p="1">
      <Heading as="h1" mb="4">
        Top Charts
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {topCharts.map((chart, index) => (
          <TopChartCard key={index} chart={chart} />
        ))}
      </Grid>
    </Box>
  );
};

export default TopCharts;
