import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Input } from "@chakra-ui/react";
import Options from "./Options";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    // Format the search query by replacing spaces with '+'
    const formattedQuery = searchQuery.split(" ").join("+");

    // Navigate to the specified path using React Router
    navigate(`/search/all/${formattedQuery}`);
  };

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

      <form
        style={{
          display: "flex",
          alignItems: "center",
          gap: "3",
          width: "100%",
        }}
        onSubmit={handleSearch}
      >
        <Input
          isTruncated
          placeholder={`Search for albums, artists, songs`}
          type="text"
          variant={"filled"}
          rounded={"full"}
          mr={3}
          w={"100%"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton type="submit" mr={2} icon={<FaSearch />} />
      </form>

      <Box mr={3}></Box>
    </Box>
  );
};

export default Search;
