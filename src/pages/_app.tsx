
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme.tsx"; // Certifique-se de que este caminho está correto

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;