import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// Definindo os estilos de camada diretamente
const layerStyles = {
  container: {
    description: "container styles",
    bg: "gray.50",
    border: "2px solid",
    borderColor: "gray.500",
  },
};

// Estendendo o tema com os estilos de camada
export const theme = extendTheme({ config, layerStyles });