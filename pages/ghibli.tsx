/* eslint-disable @next/next/no-img-element */
import { Title } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import useStatus from "../components/hooks/Status";

const fetchParameters = {
  url: "https://ghibliapi.herokuapp.com/films",
};

// JorgeFc123.
// Eduardo Cazarez123.
// dbkoserver123
//192.168.1.66
const GhibliPage = (props: any) => {
  const { StateManager } = useStatus(fetchParameters);

  return (
    <div>
      <StateManager
        Success={(data) => <GhibliFilms {...data} />}
        Error={() => <h1>Error :</h1>}
        Loading={() => <h2>Loading...</h2>}
        Empty={() => <h2>Vacio...</h2>}
      />
    </div>
  );
};

const GhibliFilms = ({ data }: any) => {
  const [selectedMovie, setSelectedMovie] = useState(data[0]);

  const filterSelectedMovie = (item: any) => selectedMovie.id !== item.id;

  const handleSelectMovie = (item: any) => {
    console.log(item.t);
    setSelectedMovie(item);
  };

  console.log("data", data);
  return (
    <div className="wrapper-ghi">
      {/* <h1>Ghibli art</h1> */}
      <div className="flex flex-row h-4/6">
        <div className="wrapper-ghi-selected w-4/5">
          <h1>{selectedMovie.title}</h1>
          <p>{selectedMovie.director}</p>
          <img
            src={selectedMovie.movie_banner}
            alt={selectedMovie.title}
            className="w-full"
          />

          <p>{selectedMovie.description}</p>
        </div>
        <div className="wrapper-extras">
          <h3>Select one</h3>
          <div className="grid grid-cols-2">
            {data &&
              data
                .filter(filterSelectedMovie)
                .map((item: any) => (
                  <GhibliArt
                    onSelect={handleSelectMovie}
                    key={item.id}
                    {...item}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GhibliArt = (props: any) => {
  return (
    <div
      key={props.id}
      className="m-6 rounded overflow-hidden relative"
      onClick={() => props.onSelect(props)}
    >
      <img
        src={props.movie_banner}
        alt={props.title}
        className="h-60 object-cover"
      />
      <div className="absolute left-0 top-0">
        <h2>{props.title}</h2>
      </div>
    </div>
  );
};

export default GhibliPage;
