import "@fontsource/playfair-display";

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

// TODO - revist breakpoints, currently not working
const config = defineConfig({
  theme: {
    breakpoints: {
      mobile: '320px',
      desktop: '1200px',
    },
    tokens: {
      fonts: {
        heading: { value: `'Playfair', sans-serif`},
        body: { value: `'Playfair', sans-serif`}
      },
    },
  },
});

export default createSystem(defaultConfig, config);