import React, { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";
import { getSectionComponent } from "../menu";
import NotFoundDashboard from "../NotFound";
import { split } from "lodash";

const useDashboardComponent = () => {
  const { asPath, ...rest } = useRouter();
  const [DynamicComponent, setDynamicComponent] =
    useState<() => JSX.Element>(NotFoundDashboard);

  const componentId = useMemo(() => asPath.split("#")[1], [asPath]);

  useEffect(() => {
    const currentComponent = getSectionComponent(componentId);

    if (currentComponent) {
      setDynamicComponent(currentComponent);
    }
  }, [componentId]);

  return { DynamicComponent, componentId };
};

export default useDashboardComponent;
