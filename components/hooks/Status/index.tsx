/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  url: string;
  fetchProvider?: Function;
}

const Status = {
  success: 0,
  error: 1,
  loading: 2,
  empty: 3,
};
const useStatus = ({ url, fetchProvider }: Props) => {
  const [state, setState] = useState({
    status: Status.loading,
    data: null,
  });

  const Manager = useMemo(() => StateManager(state), [state]);
  const handleChangeStatus = (newStatus: number) =>
    setState((prev) => ({
      ...prev,
      status: newStatus,
    }));

  const handleFetchData = useCallback(async () => {
    if (!url) return;

    const serviceProvider = fetchProvider || fetch;

    try {
      const fetchData = await serviceProvider(url);
      if (!fetchData) {
        handleChangeStatus(Status.empty);
        return;
      }

      const parsedData = await fetchData.json();
      setState((prev) => ({
        ...prev,
        status: Status.success,
        data: parsedData,
      }));
    } catch (ex) {
      handleChangeStatus(Status.error);
    }
  }, [url, fetchProvider]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return { StateManager: Manager };
};

interface StateManagerProps {
  Success: React.ComponentType<any>;
  Error: React.ComponentType<any>;
  Loading: React.ComponentType<any>;
  Empty: React.ComponentType<any>;
}

const StateManager =
  ({ status, data }: any) =>
  (props: StateManagerProps) => {
    const { Success, Empty, Error, Loading } = props;
    // console.log("State:", status, data);
    switch (status) {
      case Status.empty:
        return <Empty data={data} />;
      case Status.error:
        return <Error data={data} />;
      case Status.success:
        return <Success data={data} />;
      default:
        return <Loading data={data} />;
    }
  };

export default useStatus;
