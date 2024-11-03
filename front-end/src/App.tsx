import { Heading, ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react";
import Cakes from "./Cakes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCake from "./AddCake";
import { useState } from "react";

function App() {
  const [cakeList, setCakeList] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Cakes cakeList={cakeList} setCakeList={setCakeList} />,
    },
    {
      path: "/add",
      element: <AddCake cakeList={cakeList} />,
    },
  ]);

  return (
    <ChakraProvider value={defaultSystem}>
      <Heading textAlign={"center"} mb="3">
        All about cakes
      </Heading>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
