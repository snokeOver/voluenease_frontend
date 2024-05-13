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
  const [checkOutId, setCheckOutId] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [slidderImages, setSlidderImages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalPost, setTotalPost] = useState(0);
  const [totalRequest, setTotalRequest] = useState(0);

  const [loadedPosts, setLoadedPosts] = useState([]);
  const [loadedRequests, setLoadedRequests] = useState([]);

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

  // Get the Posts that this organizer added
  const getAllVolunteerRequests = async () => {
    try {
      setPageLoading(true);
      const { data } = await nsAxios.get(
        `/api/volunteer-requests/${user.uid}`,
        { withCredentials: true }
      );
      setLoadedRequests(data);
      setTotalRequest(data.length);
      setPageLoading(false);
    } catch (err) {
      console.log(err.response);
      setPageLoading(false);
    }
  };

  // Get the Posts that this organizer added
  const getPostsOfOrganizer = async () => {
    try {
      setPageLoading(true);
      const { data } = await nsAxios.get(`/api/organizer-posts/${user.uid}`, {
        withCredentials: true,
      });
      if (data) {
        setLoadedPosts(data);
        setTotalPost(data.length);
        setPageLoading(false);
      } else {
        console.log(data);
        setPageLoading(false);
      }
    } catch (err) {
      console.log(err.response);
      setPageLoading(false);
    }
  };

  // Get the Volunteers post from DB for Need volunteers section at home page
  const getPosts = async () => {
    try {
      setPageLoading(true);
      const { data } = await nsAxios.get(`/api/posts`);
      if (data) {
        setPosts(data);
        setPageLoading(false);
      } else {
        console.log(data);
        setPageLoading(false);
      }
    } catch (err) {
      console.log(err.response);
      setPageLoading(false);
    }
  };
  // Get the banner images from DB for banner, login and join pages
  const getBannerImages = async () => {
    try {
      setPageLoading(true);
      const { data } = await nsAxios.get(`/api/banner-images`);
      if (data) {
        setSlidderImages(data);
        setPageLoading(false);
      } else {
        console.log(data);
        setPageLoading(false);
      }
    } catch (err) {
      console.log(err.response);
      setPageLoading(false);
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

  // On First Render get Banner Images, Volunters need post for Home page
  useEffect(() => {
    getBannerImages();
    getPosts();
  }, []);

  // Update the User preference
  useEffect(() => {
    if (user) {
      getUserPreference();
    }
  }, [user]);

  const dataItems = {
    currTheme,
    setCurrTheme,
    pageLoading,
    setPageLoading,
    checkOutId,
    setCheckOutId,
    toastMsg,
    setToastMsg,
    storeUserPreference,
    slidderImages,
    posts,
    getPosts,
    totalPost,
    totalRequest,
    loadedPosts,
    setLoadedPosts,
    loadedRequests,
    setLoadedRequests,
    getAllVolunteerRequests,
    getPostsOfOrganizer,
  };

  return (
    <DataContext.Provider value={dataItems}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
