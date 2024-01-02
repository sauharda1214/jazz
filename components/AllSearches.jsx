import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchSongs } from "../src/api/searchSongs";
import { Center, Spinner } from "@chakra-ui/react";

const AllSearches = () => {
  const { query } = useParams();
  const [queries,setQueries] = useState(null)

  useEffect(() => {
    const handleSearch = async () =>{
      const data = await searchSongs(query)
      setQueries(data)
    }
    handleSearch()
  }, [query]);

  if(!queries){
    return(
      <Center h={'100%'}>
        <Spinner/>
      </Center>
    )
  }

  console.log(queries)

  return (
    <>

    </>
  );
};

export default AllSearches;
