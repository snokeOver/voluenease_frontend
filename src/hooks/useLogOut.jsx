import useAuth from "./useAuth";
import useData from "./useData";
import Swal from "sweetalert2";

const useLogOut = () => {
  const { logOut, setUser } = useAuth();
  const { setPageLoading, currTheme } = useData();
  const userLogOut = () => {
    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Log Me Out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
      }
    });
  };

  return userLogOut;
};

export default useLogOut;
