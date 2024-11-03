import { Heading, ChakraProvider } from '@chakra-ui/react';
import { defaultSystem } from "@chakra-ui/react"
import Cakes from './Cakes';

function App() {
  return (
  <ChakraProvider value={defaultSystem}>
      <Heading>All about cakes</Heading>
      <Cakes  />
  </ChakraProvider>
  );
}

export default App;
