import { createContext, useContext } from "react";

type DataContextType = {
  data: DataType[];
  setData: (data: DataType[]) => void;
};

export type DataType = {
  index: number;
  name: string;
  price: number;
}

export const DataContext = createContext<DataContextType>({
  data: [],
  setData: () => {},
});

export function useDataContext() {
  return useContext(DataContext);
}
