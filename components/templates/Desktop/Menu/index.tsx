import { useClickOutside } from "@mantine/hooks";
import React, { useState } from "react";

interface Props {
  title: string;
  icon?: any;
}

const NavItem = ({ icon, title }: Props) => {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  const handleOpenDropdown = (e: any) => {
    e.preventDefault();
    setOpened(true);
  };

  return (
    <div ref={ref} className="menu flex" onClick={handleOpenDropdown}>
      <h2>{icon}</h2>
      <p>{title}</p>
      <div className={opened ? "sub-menu blured" : "sub-menu blured closed"}>
        <p>Preferences</p>
        <p>Menu things</p>
        <p>Everything english</p>
        <p>Menu things</p>
        <p>Everything english</p>
        <p>Menu things</p>
      </div>
    </div>
  );
};

export default NavItem;
