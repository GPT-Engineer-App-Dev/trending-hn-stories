import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  orange: {
    50: "#FFF5E5",
    100: "#FFE4B3",
    200: "#FFD280",
    300: "#FFC04D",
    400: "#FFAD1A",
    500: "#E69500",
    600: "#B37700",
    700: "#805900",
    800: "#4D3B00",
    900: "#1A1D00",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);