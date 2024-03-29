import { Autocomplete, Badge, NumberInput, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useMemo, useState } from "react";
import Loader from "../components/templates/Loading";

const containerClass =
  "min-h-screen min-w-screen flex flex-col justify-center items-center bg-black ";
// const ApiUrl = "http://localhost:5000/?threshold=";
const ApiUrl = "https://secuentialpattern.herokuapp.com/?threshold=";
const fetchApiUlr = (value: string) =>
  fetch(`${ApiUrl}${value}`).then((res) => res.json());
const PrefixSpan = () => {
  const [tag, setTag] = useState("");
  const [debounced] = useDebouncedValue(tag, 600);

  const [treshold, setTreshold] = useState<any>("500");
  const [tresholdDebounce] = useDebouncedValue(treshold, 800);

  const [uiState, setUiState] = useState({
    isLoading: true,
    isError: false,
    data: [],
  });

  useEffect(() => {
    (async () => {
      setUiState((prev) => ({
        ...prev,
        isLoading: true,
        isError: false,
      }));
      console.log("Fetching..");
      try {
        const result = await fetchApiUlr(tresholdDebounce);
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
  }, [tresholdDebounce]);

  const RecomendedData = useMemo(() => {
    const data = uiState.data.filter((item) => debounced === item[0][0][0]);
    const shifted = data
      .map((item) => {
        const ref = [...item[0]];
        ref.shift();
        return ref;
      })
      .filter((i) => i.length > 0)
      .join()
      .split(",");

    const filtered = Array.from(new Set(shifted)).filter(
      (res) => res.length > 0
    );
    console.log("data:", filtered);
    return filtered;
  }, [debounced, uiState.data]);

  const getAutocompleteData = useMemo(() => {
    const filtered = uiState.data.map((item) => item[0][0][0]);
    return Array.from(new Set(filtered));
  }, [uiState.data]);

  if (uiState.isError) {
    return (
      <div className={containerClass}>
        <h3>Error :(</h3>
        <div className="fixed left-5 bottom-5">
          <NumberInput
            label="Treshold"
            onChange={setTreshold}
            defaultValue={parseInt(treshold)}
          />
        </div>
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
      <h1>Secuencias Cargadas {uiState.data.length}</h1>
      <Autocomplete
        data={getAutocompleteData || []}
        label="Busca tu Secuencia"
        onChange={setTag}
        size="xs"
        className="w-64 mb-8 "
      />
      <div className="flex flex-col">
        <RecomendedPaths pathData={RecomendedData} />
        <RenderPaths pathData={uiState.data} />
      </div>

      <div className="fixed left-5 bottom-5">
        <NumberInput
          label="Treshold"
          onChange={setTreshold}
          defaultValue={parseInt(treshold)}
        />
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

const RecomendedPaths = ({ pathData }: { pathData: string[] }) => {
  if (pathData.length === 0)
    return (
      <div className="mb-10 text-slate-500">
        <h3>Not matches to recomendations</h3>
      </div>
    );
  return (
    <div className="grid grid-cols-3 gap-6 mb-10">
      {pathData.map((item, index) => (
        <Badge key={item} title={item}>
          {item}
        </Badge>
      ))}
    </div>
  );
};

export default PrefixSpan;
