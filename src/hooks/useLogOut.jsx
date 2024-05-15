import useAuth from "./useAuth";
import useData from "./useData";

const useLogOut = () => {
  const { logOut, setUser } = useAuth();
  const { setPageLoading } = useData();
  const userLogOut = () => {
    // Initiate Logout sequence
    setPageLoading(true);
    logOut()
      .then(() => {
        setPageLoading(false);
        setUser(null);
      })
      .catch((err) => {
        setPageLoading(false);
        console.log(err.message);
      });
  };

  return userLogOut;
};

export default useLogOut;
