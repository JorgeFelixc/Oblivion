import { useMemo, useState } from "react";

interface Props {
  name: string;
}

interface BaseIdentifier {
  id?: number;
}

const initialValue = {};
const useList = <T>({ name }: Props) => {
  const [list, setList] = useState<Record<string, T>>({});

  const allList = useMemo(
    () => Object.entries(list).map(([key, value]) => ({ _id: key, ...value })),
    [list]
  );

  console.log(list);
  const addItem = (item: any, key: string = "title") => {
    const allNumbers = allList.flatMap((each) => Number(each._id)).flat();
    console.log(allNumbers);
    !allNumbers.length && allNumbers.push(-1);
    const number = Math.max(...allNumbers) + 1;
    setList((prev) => ({ ...prev, [number]: item }));
  };

  const removeItem = (identifier: string) => {
    setList((prev) => {
      delete prev[identifier];
      return prev;
    });
  };

  const updateItem = (item: T & { _id: string }) => {
    setList((prev) => ({ ...prev, [item._id]: item }));
  };

  return { allList, addItem, removeItem, updateItem };
};

export default useList;
