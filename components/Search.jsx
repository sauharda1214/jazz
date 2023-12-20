import { Box, Text } from "@chakra-ui/react";
import Menu from "./Menu";

const Search = () => {
  return (
    <Box h={'70px'} display={'flex'} alignItems={'center'} bg={"white"} top={0} left={0} w={"100%"} pos={"fixed"} zIndex={"999"}>
      <Menu />
      <Text>
        SEARCH
      </Text>
    </Box>
  );
};

export default Search;
