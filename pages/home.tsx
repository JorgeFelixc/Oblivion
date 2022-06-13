import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("../components/templates/Sketch"), {
  ssr: false,
});

const Home = () => {
  return (
    <div>
      <Sketch variant="flow" customClass="p-0" />
      <header className="absolute left-0 top-0 flex justify-center">
        <h1>Hello there</h1>
      </header>
    </div>
  );
};

export default Home;
