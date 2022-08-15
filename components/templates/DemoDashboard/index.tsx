import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { Parallax } from "react-scroll-parallax";
import create from "zustand";

import useDashboardComponent from "./DyamicContent";
import Menu, { GroupSections, Sections } from "./menu";
import NotFoundDashboard from "./NotFound";
import dynamic from "next/dynamic";
import { BiChevronLeft, BiChevronsLeft, BiCog } from "react-icons/bi";
import { ActionIcon } from "@mantine/core";

const useStore = create((set) => ({
  CurrentComponent: <NotFoundDashboard />,
  setComponent: (newComponent: () => JSX.Element) =>
    set((state) => ({ CurrentComponent: newComponent })),
}));

const DemoDashboard = () => {
  //Getting the current route...
  const { asPath } = useRouter();
  const componentId = useMemo(() => asPath.split("#")[1], [asPath]);

  const Dynamic = dynamic(() => import(`./${componentId}`), {
    ssr: false,
  });

  return (
    <Parallax opacity={[0, 2]} className="min-h-screen">
      <section className="wrapper-about">
        <SideNav />
        <div className="wrapper-dashboard">
          <Dynamic />
        </div>
      </section>
    </Parallax>
  );
};

const SideNav = () => {
  const [expanded, setExpanded] = useState(false);
  const classeBase = `wrapper-sidenav ${expanded ? "minimized-nav" : ""}`;

  const handleToggleMinimize = () => setExpanded((prev) => !prev);
  return (
    <div className={classeBase}>
      <SideNavMenu groups={Menu} />
      <div className="mt-auto">
        <div className="row space-x-2 justify-end ">
          {/* <ActionIcon variant="hover">
            <BiCog />
          </ActionIcon> */}
          <ActionIcon variant="hover" onClick={handleToggleMinimize}>
            <BiChevronsLeft className={`${expanded ? "rotate-180" : ""}`} />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};

interface SideNavMenuProps {
  groups: GroupSections[];
}

const SideNavMenu = ({ groups }: SideNavMenuProps) => {
  const handleMapSideNav = ({ sections, title }: GroupSections) => (
    <div key={title} className="wrapper-group">
      <h4>{title}</h4>
      <SideNavMenuSection sections={sections} />
    </div>
  );
  return <>{groups.map(handleMapSideNav)}</>;
};

const SideNavMenuSection = ({ sections }: { sections: Sections[] }) => {
  const { push, asPath } = useRouter();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const currentId = asPath.split("#")[1]?.trim();
    setCurrentPath(currentId);
  }, [asPath]);

  const handleChangeRoute = (id: string) => push(`#${id}`);

  return (
    <div className="column">
      {sections.map((item) => (
        <SideNavMenuSectionItem
          key={item.title}
          {...item}
          active={currentPath === item.id}
          onChangeRoute={handleChangeRoute}
        />
      ))}
    </div>
  );
};

const SideNavMenuSectionItem = ({
  title,
  Icon,
  id,
  active,
  onChangeRoute,
}: Sections & { active: boolean; onChangeRoute: (id: string) => void }) => {
  const baseClass = `space-x-2 row ${active ? "nav-selected" : ""}`;

  return (
    <a
      key={id}
      className={baseClass}
      id={id}
      href={`#${id}`}
      onClick={() => onChangeRoute(id)}
    >
      <Icon />
      {/* {console.log("Component ID:", componentId, id)} */}
      <p>{title}</p>
    </a>
  );
};

interface DemoDashboardContainer {
  children: any;
}

const DemoDashboardContainer = ({
  children,
  title,
  ...restProps
}: DemoDashboardContainer & React.AllHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...restProps}
      className={`wrapper-dashboard-item ${restProps.className || ""}`}
    >
      <h2 className="text-4xl">{title}</h2>
      {children}
    </div>
  );
};

DemoDashboard.Item = DemoDashboardContainer;

export default DemoDashboard;
