import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
import Options from "./Options";
import { FaSearch } from "react-icons/fa";

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
      <Flex maxW={'md'} alignItems={'center'} gap={3}>
      <Input
        isTruncated
        placeholder={`Search for albums, artists, songs`}
        type="text"
        variant={"filled"}
        rounded={"full"}
        mr={3}
        w={'100%'}

      />
      <IconButton mr={2} icon={<FaSearch/>}/>
      </Flex>
     
      <Box mr={3}></Box>
    </Box>
  );
};
export default Search
