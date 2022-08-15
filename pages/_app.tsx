import "../styles/globals.css";
import "../styles/ghibli.css";
import "../styles/desktop.css";

import type { AppProps } from "next/app";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { ParallaxProvider } from "react-scroll-parallax";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/templates/Loading";
import useSound from "../components/hooks/useSound";

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

const DefaultLoader = <Loader variant="genoma" />;
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [uiState, setUiState] = useState({
    isLoading: false,
    isError: false,
  });

  const handleSetLoading = (actived: boolean) =>
    setUiState((prev) => ({ ...prev, isLoading: actived, isError: false }));
  const handleSetError = () =>
    setUiState((prev) => ({ ...prev, isError: true, isLoading: false }));

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname
        ? handleSetLoading(true)
        : handleSetLoading(false);
    };
    const handleComplete = () =>
      setTimeout(() => handleSetLoading(false), 2000);
    const handleError = () => handleSetError();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);
  }, [router]);

  const RenderComponent = () => {
    const { isError, isLoading } = uiState;
    if (!isError && !isLoading) return <Component {...pageProps} />;

    if (isError) return <Loader variant="genoma" />;

    return <Loader variant="genoma" />;
  };

  return (
    <ParallaxProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={ThemeConfiguration}
      >
        {RenderComponent()}
      </MantineProvider>
    </ParallaxProvider>
  );
}

export default MyApp;
