import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { registerLicense } from "@syncfusion/ej2-base";

import App from "./App.tsx";
import colors from "./configs/color-theme.ts";

import { SYNCFUSION_API_KEY } from "./helpers/envs.ts";

registerLicense(SYNCFUSION_API_KEY);

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
