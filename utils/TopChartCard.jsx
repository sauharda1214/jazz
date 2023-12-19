/* eslint-disable react/prop-types */
import { Box, Image, Text, Link } from "@chakra-ui/react";

const TopChartCard = ({chart}) => {
  return (
    <Box  borderWidth="1px" borderRadius="lg" p="2" flexShrink={0}>
    <Image src={chart.image[2].link} alt={chart.title} />
    <Link href={chart.url} fontSize="xl" fontWeight="semibold" mt="2" isExternal>
      <Text>{chart.title}</Text>
    </Link>
  </Box>
  )
}

export default TopChartCard