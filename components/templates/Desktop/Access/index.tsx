import { useMove } from "@mantine/hooks";
import react, { useState } from "react";

import { GiAtom } from "react-icons/gi";
const Access = ({ cords, active, onClick, onFinish, id }: any) => {
  const handleMouseUp = () => {};

  const handleFinishiUp = () => {};
  return (
    <div
      className="wrapper-icon blured"
      style={{
        left: `calc(${cords.x * 100}% - 8px)`,
        top: `calc(${cords.y * 100}% - 8px)`,
      }}
      onMouseDown={handleMouseUp}
      onMouseUp={onFinish}
    >
      <GiAtom />
      <p>Example Name</p>
    </div>
  );
};

export default Access;
