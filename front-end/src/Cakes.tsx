import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Cakes = () => {
const [ cakeList, setCakeList ] = useState([]);

useEffect(() => {
  axios.get(`${process.env.REACT_APP_LOCALHOST}/cakes`)
    .then(response => setCakeList(response.data))
    .catch(error => {
      console.log(error);
  })
}, [])

return (
  <VStack alignItems={'center'}>
    {cakeList.length > 0 ? cakeList.map((cake: Cake) => 
      <Box>
        <Heading>{cake.name}</Heading>
        <Text>{cake.imageUrl}</Text>
      </Box>) : 'No cakes available'}
  </VStack>
)};

export default Cakes;

type Cake = {
id: number;
name: string;
comment: string;
imageUrl: string;
yumFactor: number;
_id: number;
}
