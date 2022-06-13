import { Loader } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { BiSad, BiAngry } from "react-icons/bi";

const PokemonCard = ({ loading, error, pokemonInfo }: any) => {
  if (loading) return <LoadingState />;

  if (error) return <ErrorState />;

  if (!pokemonInfo) return <EmptyState />;

  return (
    <div className="blured wrapper-pokecard column-center">
      {/* <Image
        src={pokemonInfo.sprites.front_default}
        alt={pokemonInfo.name}
        width={50}
        height={50}
      /> */}
      <img src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
      <h2>{pokemonInfo.name}</h2>
    </div>
  );
};

const LoadingState = () => (
  <div className="blured wrapper-pokecard column-center ">
    <Loader />
  </div>
);

const ErrorState = () => (
  <div className="blured wrapper-pokecard column-center">
    <BiAngry className="text-8xl" />
    <h2>Pokemon do not exist</h2>
  </div>
);

const EmptyState = () => (
  <div className="blured wrapper-pokecard column-center">
    <BiSad className="text-8xl" />
    <h2>Not pokemon Searched</h2>
  </div>
);

export default PokemonCard;
