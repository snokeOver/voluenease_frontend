import { createContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const nsAxios = useAxios();
  const { user } = useAuth();
  const [pageLoading, setPageLoading] = useState(false);
  const defaultTheme = "dark";
  const [currTheme, setCurrTheme] = useState(defaultTheme);
  const [services, setServices] = useState([]);
  const [checkOutId, setCheckOutId] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  // function to Save the user preferences like theme-mood into MongoDb
  const storeUserPreference = async () => {
    const postData = {
      uid: user.uid,
      theme: currTheme,
    };
    try {
      const { data } = await nsAxios.post(`/api/user-preference`, postData, {
        withCredentials: true,
      });
      if (data) {
        // console.log(data);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  // setUserpreference based on user action
  useEffect(() => {
    if (user) storeUserPreference();
  }, [currTheme]);

  // function to Save the user preferences like theme-mood into MongoDb
  const getUserPreference = async () => {
    try {
      const { data } = await nsAxios.get(`/api/user-preference/${user.uid}`, {
        withCredentials: true,
      });
      if (data) {
        setCurrTheme(data.theme);
      } else {
        console.log(data);
        setCurrTheme("dark");
      }
    } catch (err) {
      console.log(err.response);
      setCurrTheme("dark");
    }
  };

  // Update the User preference
  useEffect(() => {
    if (user) {
      getUserPreference();
    }

    // // Get all the tourist spot from the database
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(`${baseURL}/api/spots`);
    //     if (response.data) {
    //       setSpotsArr(response.data);
    //       setPageLoading(false);
    //     } else {
    //       console.log(response.data);
    //       setPageLoading(false);
    //     }
    //   } catch (err) {
    //     console.log(err.response);
    //     setPageLoading(false);
    //   }
    // };
    // if (!pageLoading) {
    //   setPageLoading(true);
    //   fetchData();
    // }
  }, [user]);

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
    storeUserPreference,
  };

  return (
    <DataContext.Provider value={dataItems}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
