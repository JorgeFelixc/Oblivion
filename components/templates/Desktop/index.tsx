import { useMove } from "@mantine/hooks";
import React, { useEffect, useRef, useState } from "react";
import Observer from "../../../utils/Observer";
import Access from "./Access";
import { DesktopItems, getGridItems, GridItem } from "./util";

const Desktop = (props: any) => {
  const { grid, setGrid } = useDesktopGrid();
  const [cords, setCords] = useState({ x: 0, y: 0 });
  const { observable } = useObservable();

  const handleSetCord = (position: any) => {
    const movementObservable = observable.getObservable("movement");
    movementObservable && movementObservable.emit(position);
    setCords(position);
  };

  const { ref, active } = useMove(handleSetCord);

  const handleOnMove = (e: any) => {
    console.log(e);
    // e.preventDefault();
    // e.stopPropagation();

    observable.makeObservable("movement", (args) => {
      // const element: HTMLElement =
      //   e.target.tagName === "DIV" ? e.target : e.target.parentNode;
      // const position = args[0];
      // console.log("movement", element, position);
      // element.style.left = `calc(${position.x * 100}% - 8px) `;
      // element.style.top = `calc(${position.x * 100}% - 8px)`;
      // const style = {
      //   left: `calc(${position.x * 100}% - 8px) !important`,
      //   top: `calc(${position.y * 100}% - 8px) !important`,
      // };
      // element.setAttribute("style", JSON.stringify(style));
    });
    // mouseMovement = window.addEventListener("mousemove");
  };

  const handleOnFinish = () => {};

  return (
    <div className="wrapper-desktop" ref={ref}>
      {/* {grid.map((item) => (
        <Access
          {...item}
          key={item.id}
          parentRef={ref}
          onClick={handleOnMove}
          onFinish={handleOnFinish}
        />
      ))} */}
    </div>
  );
};

const useObservable = () => {
  const [observable] = useState(new Observer());

  return {
    observable,
  };
};

const useDesktopGrid = () => {
  const [grid, setGrid] = useState<GridItem[]>([]);

  useEffect(() => {
    setGrid(getGridItems());
  }, []);

  return { grid, setGrid };
};
export default Desktop;
