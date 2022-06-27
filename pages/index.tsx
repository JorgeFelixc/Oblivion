import { useEffect, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { GiAnimalSkull } from "react-icons/gi";
import { AiOutlineMail } from "react-icons/ai";
import { TiSocialLinkedin } from "react-icons/ti";
import { BiBulb } from "react-icons/bi";

import anime from "animejs";
import Desktop from "../components/templates/Desktop";
import NavItem from "../components/templates/Desktop/Menu";
import dynamic from "next/dynamic";
import { ActionIcon, Badge, Button, Image, Input } from "@mantine/core";
import PokeSearch from "../components/templates/Pokesearch";
import { useWindowScroll } from "@mantine/hooks";
import { Nav } from "../components/templates/Nav";
import { CardMe } from "../components/templates/IndexComponents/Card";
import { Parallax } from "react-scroll-parallax";
import DemoDashboard from "../components/templates/DemoDashboard";
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

  useEffect(() => {
    if (!!element.current) {
      const tl = anime.timeline({
        duration: 1000,
        easing: "easeOutExpo",
      });

      tl.add({
        targets: ".clear-initial",
        opacity: 1,
        translateY: {
          value: [-100, 0],
          duration: 800,
        },
      });

      tl.add(
        {
          targets: ".wrapper-presentation",
          height: 50,
          width: 50,
          left: "50%",
          top: "50%",
          // opacity: 0,
          color: "#FFF",
          backgroundColor: "#FFF",
          borderRadius: 360,
          duration: 1000,
        },
        "+=800"
      );

      tl.add({
        targets: ".wrapper-presentation",
        translateY: -2000,
        opacity: 0,
        easing: "easeOutElastic(1, .8)",
        loop: true,
      });
    }
  }, [element]);

  return (
    <div ref={element}>
      <Head>
        <title>Pagina</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="wrapper-presentation">
          <h1 className="clear-initial">Welcome</h1>
        </div>
        <Nav />
        <section className="main-container">
          {/* <Sketch variant="flow" customClass="p-0" /> */}
          <div className="blured"></div>
          <div className="wrapper-content">
            <div className="row">
              <div className="column">
                <h1 className="text-8xl">Jorge Felix</h1>
                <h2 className="text-6xl font-light">Software Developer</h2>
              </div>
              {/* <PokeSearch pokemons={props.pokemons} /> */}
            </div>
          </div>
        </section>

        <DemoDashboard />
      </main>
    </div>
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
  const pokemonsUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  const pokemonService = await fetch(pokemonsUrl);
  const pokemonData = await pokemonService.json();

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
