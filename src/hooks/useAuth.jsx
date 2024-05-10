import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
  const authItems = useContext(AuthContext);
  return authItems;
};

export default useAuth;
