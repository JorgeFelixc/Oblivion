import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { BiX } from "react-icons/bi";

import dynamic from "next/dynamic";
import { Nav } from "../components/templates/Nav";
import { CardMe } from "../components/templates/IndexComponents/Card";
import { Parallax } from "react-scroll-parallax";
import { ActiveIndexAnimation } from "../graphics/Animations";
import Algorithms from "../components/templates/Algorithms";
import Script from "next/script";
import useSound from "../components/hooks/useSound";
import About from "../components/templates/About";
const Sketch = dynamic(() => import("../components/templates/Sketch"), {
  ssr: false,
});

const WavePath = `
M0,160L40,160C80,160,160,160,240,149.3C320,139,400,117,480,128C560,139,640,181,720,192C800,203,880,181,960,149.3C1040,117,1120,75,1200,69.3C1280,64,1360,96,1400,112L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z
`;

const TechStack = [
  "Reactjs/Nextjs",
  "MantineUI",
  "Git/Github",
  "Typescript",
  "P5.js",
  "Three.js",
  "Animejs",
];

const Home: NextPage = (props: any) => {
  const element = useRef<HTMLHeadingElement>(null);
  useSound("hover-sound");

  useEffect(() => {
    if (!!element.current) {
      ActiveIndexAnimation();
    }
  }, [element]);

  return (
    <div ref={element}>
      <Head>
        <title>Jorge Felix | HUB</title>
        <meta name="Jorge HUB" content="Jorge felix Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="manifest" href="/pwa.webmanifest" /> */}
      </Head>

      <main>
        <div className="wrapper-presentation">
          <h1 className="clear-initial">Welcome</h1>
        </div>
        <Nav />
        <section className="main-container">
          <Sketch variant="flow" customClass="p-0" />
          <div className="blured"></div>
          <div className="wrapper-content">
            <div className="row">
              <div className="column">
                <h1 className="text-8xl">Jorge Felix</h1>
                <h2 className="text-6xl font-light">Software Developer</h2>
              </div>
              {/* <PokeSearch pokemons={props.pokemons} /> */}
              <div className="absolute bottom-0 left-0 flex p-6 w-full space-x-5">
                <SectionButton description="Exercises" mlauto>
                  <Algorithms />
                </SectionButton>
                <SectionButton description="About me" mlauto>
                  <About />
                </SectionButton>
                <SectionButton description="Examples" mlauto />
              </div>
            </div>
          </div>
        </section>
        {/* <DemoDashboard /> */}
      </main>
    </div>
  );
};

const SectionButton = ({ description, mlauto, children }: any) => {
  const [uiState, setUiState] = useState({
    isMenuOpen: false,
  });

  const handleOpenMenu = () => {
    setUiState((prev) => ({ ...prev, isMenuOpen: true }));
    const audio = new Audio("/click.wav");
    audio.play();
  };
  const handleCloseMenu = () => {
    setUiState((prev) => ({ ...prev, isMenuOpen: false }));
    const audio = new Audio("/click.wav");
    audio.play();
  };

  const principalClass = mlauto ? "ml-auto btn-exotic" : "btn-exotic";

  return (
    <>
      <div className={principalClass} onClick={handleOpenMenu}>
        <p>{description}</p>
      </div>
      <div
        className={
          uiState.isMenuOpen
            ? "wrapper-section-button"
            : "wrapper-section-button-closed"
        }
      >
        <button
          className="absolute top-5 right-5 text-2xl "
          onClick={handleCloseMenu}
        >
          <BiX />
        </button>
        {children}
      </div>
    </>
  );
};

const AboutMeSection = () => (
  <section className="wrapper-sect">
    <svg viewBox="0 0 1440 320">
      <path fill="#0f0f0f" d={WavePath} />
    </svg>
    <div className="p-6 flex self-center h-full">
      <Parallax translateX={["-50px", "0px"]} rotate={[0, 0]}>
        <WhyMySiteRender />
      </Parallax>
      <Parallax speed={90} translateX={["50px", "0px"]}>
        <CardMe
          tech={TechStack}
          name="Jorge E. Felix Cazarez"
          image="/me.jpg"
        />
      </Parallax>
    </div>
  </section>
);

const WhyMySiteRender = () => (
  <div className="column-middle h-full">
    <h1 className="text-6xl">Why my site?</h1>
    <p className="text-5xl px-5 font-light">
      I want to share my work history more dynamically and show a little better
      my skills
    </p>
  </div>
);

export async function getStaticProps() {
  // const pokemonsUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  // const pokemonService = await fetch(pokemonsUrl);
  // const pokemonData = await pokemonService.json();

  return {
    props: {
      // pokemons: pokemonData.results.map((val: any) => ({
      //   ...val,
      //   value: val.name,
      // })),
      // pokemonsService: pokemonData,
    },
  };
}

export default Home;
