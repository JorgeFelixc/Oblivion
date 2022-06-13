import React, { useState } from "react";
import { Autocomplete, Input } from "@mantine/core";

import { BiSearch } from "react-icons/bi";
import Debounce from "lodash/debounce";

import PokemonCard from "./PokemonCard";

const PokemonApi = "https://pokeapi.co/api/v2/pokemon/:name";

const PokeSearch = ({ pokemons }: any) => {
  const [uiState, setUiState] = useState({
    loading: false,
    error: false,
    pokemonInfo: null,
  });

  const setLoading = (flag: boolean, rest: object = {}) =>
    setUiState((prev) => ({ ...prev, loading: flag, ...rest }));

  const handleSelect = (data: any) => {
    console.log("new value:", data);
    setLoading(true);

    data && handleLoadPokemon(data);

    if (!data) {
      setUiState((prev) => ({ ...prev, loading: false, pokemonInfo: null }));
    }
  };

  const handleLoadPokemon = async (pokemon: string) => {
    try {
      const pokemonUrl = PokemonApi.replace(":name", pokemon);
      const pokemonService = await fetch(pokemonUrl);
      const pokemonData = await pokemonService.json();
      console.log(pokemonData);

      setUiState((prev) => ({
        ...prev,
        error: false,
        loading: false,
        pokemonInfo: pokemonData,
      }));
    } catch (ex) {
      setUiState((prev) => ({
        ...prev,
        error: true,
        loading: false,
        pokemonInfo: null,
      }));
    }
  };

  return (
    <div className="wrapper-components">
      <h1>Search your favorite pokemon</h1>
      <Autocomplete
        className="blured-input"
        data={pokemons}
        disabled={uiState.loading}
        icon={<BiSearch />}
        onChange={Debounce(handleSelect, 800)}
        transition="fade"
        transitionDuration={120}
        transitionTimingFunction="ease"
      />

      <PokemonCard {...uiState} />
    </div>
  );
};

export default PokeSearch;
