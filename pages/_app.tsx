import "../styles/globals.css";
import "../styles/ghibli.css";
import "../styles/desktop.css";

import type { AppProps } from "next/app";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { ParallaxProvider } from "react-scroll-parallax";
import { useEffect } from "react";

const ThemeConfiguration: MantineThemeOverride = {
  colorScheme: "dark",
  colors: {
    dark: [
      "#FFFFFF",
      "#FFFFFF",
      "#8c8fa3",
      "#666980",
      "#4d4f66",
      "#34354a",
      "#2b2c3d",
      "#1d1e30",
      "#0c0d21",
      "#01010a",
    ],
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ParallaxProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={ThemeConfiguration}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </ParallaxProvider>
  );
}

export default MyApp;
