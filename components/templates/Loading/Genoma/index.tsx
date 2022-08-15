import React, { useCallback, useEffect, useState } from "react";

const genSize = 13;
const primaryColor = "#35C2E0";
const secondaryColor = "#34D49B";

function* factor(index: number) {
  let factor = true;
  while (index < genSize) {
    if (index < genSize / 2 && factor) {
      index++;
    } else {
      factor = false;
      index--;
    }
    yield index;
  }
}
const topFactor = factor(0);
const bottomFactor = factor(0);

const GenLoader = (props: any) => {
  const [loader, setLoader] = useState<JSX.Element[]>([]);

  const completion = (qs: number, total: number) =>
    Math.round(((100 * qs) / total) * (2 - qs / total));

  const renderGenoma = useCallback(() => {
    let allRules = "";
    Array(genSize)
      .fill(null)
      .forEach((value, index) => {
        allRules += `
      .wrapper-genoma-loader .pair-genoma:nth-child(${index}) > div:nth-child(1){
        -webkit-animation-delay: ${index / 11}s;
      }
      .wrapper-genoma-loader .pair-genoma:nth-child(${index}) > div:nth-child(2){
        -webkit-animation-delay: ${index / 11}s;
      }
      `;
      });

    const styleSheet = document.createElement("style");
    styleSheet.innerText = allRules;
    document.head.appendChild(styleSheet);

    return Array(genSize)
      .fill(null)
      .map((value, index) => (
        <div className="pair-genoma" key={index}>
          <div
            style={{
              left: index * 5,
              top: completion(Number(topFactor.next().value), 10),
              backgroundColor: primaryColor,
            }}
          ></div>
          <div
            style={{
              left: index * 5,
              bottom: completion(Number(bottomFactor.next().value), 10),
              backgroundColor: secondaryColor,
            }}
          ></div>
        </div>
      ));
  }, []);

  useEffect(() => {
    setLoader(renderGenoma());
  }, [renderGenoma]);

  return <div className="wrapper-genoma-loader">{loader}</div>;
};

export default GenLoader;
