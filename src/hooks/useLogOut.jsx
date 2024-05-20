import useAuth from "./useAuth";
import useData from "./useData";

const useLogOut = () => {
  const { logOut, setUser } = useAuth();
  const { setPageLoading, setToastMsg } = useData();
  const userLogOut = () => {
    // Initiate Logout sequence
    setPageLoading(true);
    logOut()
      .then(() => {
        setPageLoading(false);
        setUser(null);
        setToastMsg("LogOut Success !");
      })
      .catch((err) => {
        setPageLoading(false);
        console.log(err.message);
      });
  };

  return userLogOut;
};

export default useLogOut;
