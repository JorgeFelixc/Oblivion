import react from "react";
import dynamic from "next/dynamic";
const Sketch = dynamic(() => import("../components/templates/Sketch"), {
  ssr: false,
});

const Dijkstra = (props: any) => {
  return (
    <div>
      <Sketch variant="dijkstra" customClass="p-0" />
    </div>
  );
};

export default Dijkstra;
