import { Button, Card, PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cake } from "./types";
import { useNavigate } from "react-router-dom";

const Cakes = () => {
const [ cakeList, setCakeList ] = useState([]);
const navigate = useNavigate();

useEffect(() => {
  // TODO for deployment change from localhost
  axios.get('http://localhost:5050/cakes')
    .then(response => setCakeList(response.data))
    .catch(error => {
      console.log(error);
  })
}, [])

return (
  <VStack alignItems={'center'}>
    {cakeList.length > 0 ? cakeList.map((cake: Cake) => 
      <Card.Root key={cake.name}>
        <Card.Title>
          {cake.name}
        </Card.Title>
        <Card.Body>
          <PopoverRoot positioning={{ sameWidth: true }}>
            <PopoverTrigger>
            {cake.imageUrl}
            </PopoverTrigger>
            <PopoverContent width="auto">
              <PopoverBody>
                comment: {cake.comment}
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </Card.Body>
      </Card.Root>
      ) : 'No cakes available'}
      <Button mt='4' onClick={() => navigate('/add')}>Add cake</Button>
  </VStack>
)};

export default Cakes;
