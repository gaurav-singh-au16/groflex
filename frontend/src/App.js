import MainRoutes from "./routes";
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
      <MainRoutes />
      </Provider>
    </ChakraProvider>
  );
}

export default App;
