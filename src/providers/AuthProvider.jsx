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

  // Register with email and password
  const register = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

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
      if (currentUser?.uid) {
        setUser(currentUser);
        setLoading(false);
        try {
          const { data } = await nSAxios.post(
            "/api/jwt",
            { uid: currentUser.uid },
            { withCredentials: true }
          );
          setLoading(false);
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
  };
  return (
    <AuthContext.Provider value={authItems}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
