import { useWindowScroll } from "@mantine/hooks";
import React, { useEffect, useRef, useState } from "react";

export const Nav = (props: any) => {
  const [scroll] = useWindowScroll();
  const [navMinimized, setNavMinimized] = useState(false);

  const NavElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isAfterMain = scroll.y > window.innerHeight - 28;
    setNavMinimized(isAfterMain);
  }, [scroll]);

  return (
    <nav ref={NavElement} className={navMinimized ? "nav-min" : ""}>
      <h3>勹口尺云巨　乍巳し王乂 {scroll.y}</h3>
      <a href="#" className="left-auto">
        About me
      </a>
      <a href="#">Works</a>
      <a href="#">Blog</a>
    </nav>
  );
};
