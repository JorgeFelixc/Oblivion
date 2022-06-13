import "../styles/globals.css";
import "../styles/ghibli.css";
import "../styles/desktop.css";

import type { AppProps } from "next/app";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";

const ThemeConfiguration: MantineThemeOverride = {
  colorScheme: "dark",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={ThemeConfiguration}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
