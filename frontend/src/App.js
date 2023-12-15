import MainRoutes from "./routes";
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <ChakraProvider>
      <MainRoutes />
    </ChakraProvider>
  );
}

export default App;
