import { useContext } from "react";
import { DataContext } from "../providers/DataProvider";

const useData = () => {
  const dataItems = useContext(DataContext);
  return dataItems;
};

export default useData;
