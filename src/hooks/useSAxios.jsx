// This secured axios can not be used insite the AuthProvider because the element is defined such as loading, user, logOut is somehow accessed in this custom hooks and re-calling this custom hooks inside the AuthProvider makes a Paradox

import axios from "axios";
import { useEffect } from "react";
import useLogOut from "./useLogOut";

const securedAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

const useSAxios = () => {
  const logOut = useLogOut();
  useEffect(() => {
    securedAxios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          // Log out the user
          logOut();
        }
      }
    );
  }, []);
  return securedAxios;
};

export default useSAxios;
