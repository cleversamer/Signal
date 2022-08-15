import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useContext, useEffect } from "react";
import AuthContext from "./context";
import firebase from "../../firebase";

const useAuth = () => {
  const { user } = useContext(AuthContext);

  const login = async (credentials) => {
    try {
      await signInWithEmailAndPassword(
        firebase.auth,
        credentials.email,
        credentials.password
      );
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(firebase.auth);
    } catch (err) {
      throw err;
    }
  };

  return { user, login, logout };
};

export default useAuth;
