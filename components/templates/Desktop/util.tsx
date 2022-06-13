export interface GridItem {
  id: number;
  cords: {
    x: number;
    y: number;
  };
  title: string;
  icon: any;
}

export const DesktopItems: GridItem[] = [
  {
    id: 0,
    cords: {
      x: 0.03,
      y: 0.02,
    },
    title: "example 1",
    icon: <i></i>,
  },
  {
    id: 1,
    cords: {
      x: 0.03,
      y: 0.12,
    },
    title: "example 2",
    icon: <i></i>,
  },
  {
    id: 2,
    cords: {
      x: 0.03,
      y: 0.22,
    },
    title: "example 3",
    icon: <i></i>,
  },
];

const DesktopId = "desktop-grid";
export const getGridItems = (): GridItem[] => {
  const savedItems = localStorage.getItem(DesktopId);
  if (!savedItems) {
    localStorage.setItem(DesktopId, JSON.stringify(DesktopItems));
    return DesktopItems;
  }
  return JSON.parse(savedItems);
};
