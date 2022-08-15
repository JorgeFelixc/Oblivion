import React from "react";
import Genoma from "./Genoma";

/* Button Variant style */
type LoaderVariantType = "genoma";
type LoaderVariant = {
  [key in LoaderVariantType]: (props: any) => JSX.Element;
};

const LoaderVariants: LoaderVariant = {
  genoma: Genoma,
};

interface Props {
  variant: LoaderVariantType;
}
const Loader = ({ variant }: Props) => {
  const Component = LoaderVariants[variant];

  return (
    <div className="items-center justify-center flex h-screen flex-col bg-black">
      <Component />
    </div>
  );
};
export default Loader;
