import React, { useCallback, useEffect, useRef, useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// AIzaSyD_D__HCmukTBdKYVefOcvj9P2Ao1_6gQU

// const { } = ReactMapBoxGL;
// 25.740397434024132, -109.04286180666793
const GasolineDataUrl =
  "https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=200";
const GasolineFetch = () => fetch(GasolineDataUrl).then((res) => res.json());

const MapAccessToken =
  process.env.NEXT_PUBLIC_MAPBOX_PUBLIC ||
  "pk.eyJ1Ijoiam9yZ2VmYyIsImEiOiJja2phNTZqcHIwODVjMnJtYTNrMjlsN2VuIn0.iMOOrw5Jc5IaUqe2yW81ow";

interface Gasoline {
  calle: string;
  codigopostal: string;
  colonia: string;
  date_insert: string;
  diaesel: string;
  fechaaplicacion: string;
  latitude: string;
  longitude: string;
  numeropermiso: string;
  premium: string;
  razonsocial: string;
  regular: string;
  rfc: string;
  permisoid: string;
  _id: string;
}

interface UiState {
  gasolines: Gasoline[];
  popInfo: Gasoline | undefined;
}

const Gasoline = (props: any) => {
  const [uiState, setUiState] = useState<UiState>({
    gasolines: [],
    popInfo: undefined,
  });

  const onLoadGasolineData = useCallback(async () => {
    const service = await GasolineFetch();
    console.log("Gasolines Data:", service);
    setUiState((prev) => ({ ...prev, gasolines: service.results }));
  }, []);

  useEffect(() => {
    onLoadGasolineData();
  }, [onLoadGasolineData]);

  const handleSetPopUp = (gasoline: Gasoline) => {
    setUiState((prev) => ({ ...prev, popInfo: gasoline }));
    // console.log("Clicked !!!", gasoline);
  };

  return (
    <>
      <h1>Gasoline MX data</h1>
      <p>
        This data was provided by Mexico,{" "}
        <a
          target="__blank"
          href="https://api.datos.gob.mx/v1/precio.gasolina.publico"
        >
          Gasoline catalog
        </a>{" "}
      </p>
      <Map
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        initialViewState={{
          longitude: -106.4514,
          latitude: 31.71947,
          zoom: 5,
        }}
        mapboxAccessToken={MapAccessToken}
        // center={[11.93, 25.740397434024132]}
        style={{
          height: "80vh",
          width: "65vw",
          borderRadius: 4,
        }}
      >
        {uiState?.gasolines?.map((gasolines) => (
          <GasolineMarker
            key={gasolines._id}
            gasoline={gasolines}
            onClick={handleSetPopUp}
          />
        ))}
        <GasolinePopUp gasoline={uiState.popInfo} />
        <NavigationControl />
      </Map>
    </>
  );
};

// Gasoline PopUp..

interface GasolinePopUpProps {
  gasoline?: Gasoline;
}

const CurrencyFormat = {
  style: "currency",
  currency: "MXN",
};
const formater = new Intl.NumberFormat("es", CurrencyFormat);

const GasolinePrice = ({ price, title }: { price: string; title: string }) => (
  <div>
    <p>
      <strong>{title}</strong>
    </p>
    <p>{formater.format(Number(price || 0))}</p>
  </div>
);

const GasolinePopUp = ({ gasoline }: GasolinePopUpProps) => {
  if (!gasoline) return null;
  const {
    latitude,
    longitude,
    calle,
    razonsocial,
    premium,
    regular,
    date_insert,
    diaesel,
  } = gasoline;

  console.log("Rednered:", gasoline);
  return (
    <div className="float-info">
      <h3>{razonsocial}</h3>
      <div className="row">
        <p>{calle}</p>
        <p className="ml-auto">
          {new Intl.DateTimeFormat("en").format(new Date(date_insert))}
        </p>
      </div>
      <div className="row space-x-4">
        <GasolinePrice title="Premium" price={premium} />
        <GasolinePrice title="Regular" price={regular} />
        <GasolinePrice title="Diesel" price={diaesel} />
      </div>
    </div>
  );
};

/**
 * Marker components
 */
interface GasolineMarkerProps {
  onClick: (gasoline: Gasoline, e: mapboxgl.MapboxEvent<MouseEvent>) => void;
  gasoline: Gasoline;
}

const GasolineMarker = ({ gasoline, onClick }: GasolineMarkerProps) => {
  const { latitude, longitude } = gasoline;
  return (
    <>
      <Marker
        clickTolerance={4}
        onClick={(e) => onClick(gasoline, e)}
        latitude={Number(latitude)}
        longitude={Number(longitude)}
      ></Marker>
    </>
  );
};

export default Gasoline;
