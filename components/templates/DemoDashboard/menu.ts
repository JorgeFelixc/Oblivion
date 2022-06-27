import React, { JSXElementConstructor } from "react";
import { BiBuildingHouse, BiBulb } from "react-icons/bi";
import { IconType } from "react-icons/lib";
import PokeSearch from "../Pokesearch";
import NotFoundDashboard from "./NotFound";
import Tasks from "./Tasks";

export interface Sections {
  title: string;
  id: string;
  Icon: IconType;
  Page?: () => JSX.Element;
  notificationId?: string;
}

export interface GroupSections {
  title: string;
  sections: Sections[];
}

const notificationGroup: GroupSections = {
  title: "Notifications",
  sections: [
    {
      id: "Activities",
      title: "Activities",
      Icon: BiBulb,
      notificationId: "activities",
    },
    {
      id: "Tasks",
      title: "My tasks",
      Page: Tasks,
      Icon: BiBuildingHouse,
    },
  ],
};

const ApplicationGroup: GroupSections = {
  title: "Application",
  sections: [
    {
      id: "Gasoline",
      title: "MX Gasoline",
      Icon: BiBuildingHouse,
    },
    {
      id: "uieffects",
      title: "UI Effects",
      Icon: BiBuildingHouse,
    },
    {
      id: "blogs",
      title: "Blogs",
      Icon: BiBuildingHouse,
    },
  ],
};

const Menu = [notificationGroup, ApplicationGroup];

const sectionsOfGroups = Menu.flatMap((group) => group.sections);

// Method to get the current id
export const getSectionComponent = (
  selectedId: string
): (() => JSX.Element) => {
  const selectedSection = sectionsOfGroups.find((sec) => sec.id === selectedId);
  if (!selectedSection) {
    console.warn("Your component is not valid");
    return NotFoundDashboard;
  }

  return selectedSection.Page || NotFoundDashboard;
};

export default Menu;
