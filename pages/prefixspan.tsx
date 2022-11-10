import { Autocomplete } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import Loader from "../components/templates/Loading";

const containerClass =
  "h-screen w-screen flex flex-col justify-center items-center bg-black ";
const ApiUrl = "https://secuentialpattern.herokuapp.com/";
const fetchApiUlr = () => fetch(ApiUrl).then((res) => res.json());
const PrefixSpan = () => {
  const [uiState, setUiState] = useState({
    isLoading: true,
    isError: false,
    data: [],
  });

  useEffect(() => {
    (async () => {
      console.log("FEtching;;;");
      try {
        const result = await fetchApiUlr();
        console.log([result.data]);
        setUiState((prev) => ({
          ...prev,
          isLoading: false,
          data: result.data,
        }));
      } catch (ex) {
        setUiState((prev) => ({ ...prev, isLoading: false, isError: true }));
      }
    })();
  }, []);

  const getAutocompleteData = useMemo(() => {
    const filtered = uiState.data.map((item) => item[0][0][0]);
    return Array.from(new Set(filtered));
  }, [uiState.data]);

  console.log(getAutocompleteData);

  if (uiState.isError) {
    return (
      <div className={containerClass}>
        <h3>Error :(</h3>
      </div>
    );
  }

  if (uiState.isLoading) {
    return (
      <div className={containerClass}>
        <Loader variant="genoma" />
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <h1>This is Data</h1>
      <Autocomplete
        data={getAutocompleteData || []}
        label="Search your thing"
        size="xs"
        className="w-64 mb-8"
      />
      <div className="flex flex-col">
        <RenderPaths pathData={uiState.data} />
      </div>
    </div>
  );
};

interface RenderPathsProps {
  pathData: Array<[string[], number]>;
}
const RenderPaths = ({ pathData }: RenderPathsProps) => {
  return (
    <div className="flex flex-col max-h-96 overflow-y-auto">
      {pathData.map((item, index) => (
        <div key={"ind" + index}>
          <span className="font-bold">{item[0].map((i) => `${i},`)}</span>
          <span>({item[1]})</span>
        </div>
      ))}
    </div>
  );
};

export default PrefixSpan;
