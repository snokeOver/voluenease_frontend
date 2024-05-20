import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxios from "../hooks/useAxios";
import auth from "../helper/GAuth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const nSAxios = useAxios();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [regiSuccess, setRegiSuccess] = useState(false);
  const [logOutSuccess, setLogOutSuccess] = useState(false);
  const [tokenPresent, setTokenPresent] = useState(false);

  // Register with email and password
  const register = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  // Check if the token is present in the cookies

  // Login with email and Password
  const signIn = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };
  // Register with Google
  const googleRegister = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // Register with Github
  const githubRegister = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  // Update user Info
  const updateUser = (user, payLoad) => {
    return updateProfile(user, payLoad);
  };

  // Log out User
  const logOut = () => {
    return signOut(auth);
  };

  // Observer for the change in User
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser?.uid) {
        setUser(currentUser);
        try {
          const { data } = await nSAxios.post(
            "/api/jwt",
            { uid: currentUser.uid },
            { withCredentials: true }
          );
          if (data.success === true) {
            // Hypothetical delay to make sure the token is present at the broser's cookies
            setTimeout(() => {
              setTokenPresent(true);
              setLoading(false);
            }, 2000);
          } else {
            setTokenPresent(false);
            setLoading(false);
          }
        } catch (err) {
          console.log(err.message);
          setLoading(false);
        }
      } else {
        setLoading(false);
        try {
          const { data } = await nSAxios.post(
            "/api/logout",
            {
              uid: currentUser?.uid,
            },
            { withCredentials: true }
          );
          setUser(null);
          setLoading(false);
        } catch (err) {
          console.log("Error logging out:", err.message);
          setLoading(false);
        }
      }
    });
    return () => unSubscribe();
  }, []);

  const authItems = {
    user,
    register,
    updateProfile,
    loading,
    setLoading,
    signIn,
    logOut,
    setUser,
    updateUser,
    googleRegister,
    githubRegister,
    regiSuccess,
    setRegiSuccess,
    logOutSuccess,
    setLogOutSuccess,
    tokenPresent,
  };
  return (
    <AuthContext.Provider value={authItems}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
