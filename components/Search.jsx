import { Box } from "@chakra-ui/react";
import Menu from "./Menu";

const Search = () => {
  return (
    <Box bg={"white"} top={0} left={0} w={"100%"} pos={"fixed"} zIndex={"999"}>
      <Menu />
    </Box>
  );
};

export default Search;
