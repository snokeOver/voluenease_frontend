import axios from "axios";

const nonSecuredAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const useAxios = () => {
  return nonSecuredAxios;
};

export default useAxios;
