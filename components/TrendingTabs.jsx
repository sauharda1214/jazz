
// TrendingTabs.js
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TrendingSongs from "./TrendingSongs";
import TrendingAlbums from "./TrendingAlbums";
import TopCharts from "./TopCharts";

const TrendingTabs = () => {
  return (
    <Box mb={'100px'} mt={'70px'} p="2">
      <Tabs variant='soft-rounded' colorScheme='green' isFitted>
        <TabList pos={'sticky'} mb="20px">
          <Tab>Trending Songs</Tab>
          <Tab>Trending Albums</Tab>
          <Tab>Top Charts</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TrendingSongs />
          </TabPanel>
          <TabPanel>
            <TrendingAlbums />
          </TabPanel>
          <TabPanel>
            <TopCharts />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TrendingTabs;
