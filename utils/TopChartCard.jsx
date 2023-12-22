/* eslint-disable react/prop-types */
import { Box, Image, Text,Link as ChakraLink  } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'

const TopChartCard = ({chart}) => {
  return (
    <Box  borderWidth="1px" borderRadius="lg" p="2" >
      <ChakraLink cursor={'pointer'} as={ReactRouterLink}>
      <Image src={chart.image[2].link} alt={chart.title} />
      </ChakraLink>
    <ChakraLink as={ReactRouterLink} href={chart.url} fontSize="xl" fontWeight="semibold" mt="2" isExternal>
      <Text>{chart.title}</Text>
    </ChakraLink>
  </Box>
  )
}

export default TopChartCard