import { createContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const axios = useAxios();
  const [pageLoading, setPageLoading] = useState(false);
  const defaultTheme = "dark";
  const [currTheme, setCurrTheme] = useState(defaultTheme);
  const [services, setServices] = useState([]);
  const [checkOutId, setCheckOutId] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  // Fetch all the services from Database
  // useEffect(() => {
  //   setPageLoading(true);
  //   const fetchServices = async () => {
  //     try {
  //       const response = await axios.get("/api/services");
  //       if (response) {
  //         setServices(response.data);
  //         setPageLoading(false);
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //       setPageLoading(false);
  //     }
  //   };
  //   fetchServices();
  // }, []);

  const dataItems = {
    currTheme,
    setCurrTheme,
    pageLoading,
    setPageLoading,
    services,
    checkOutId,
    setCheckOutId,
    toastMsg,
    setToastMsg,
  };

  return (
    <DataContext.Provider value={dataItems}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
