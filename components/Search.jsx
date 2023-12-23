import { Box, Input } from "@chakra-ui/react";
import Options from "./Options";

const Search = () => {

  return (
    <Box
      h={"70px"}
      display={"flex"}
      alignItems={"center"}
      bg={"white"}
      top={0}
      left={0}
      w={"100%"}
      pos={"fixed"}
      zIndex={"1001"}
    >
      <Options />
      <Input
        isTruncated
        placeholder={`Search for albums, artists, songs`}
        type="text"
        variant={"filled"}
        rounded={"full"}
        mr={3}

      />
      <Box mr={3}></Box>
    </Box>
  );
};
export default Search
