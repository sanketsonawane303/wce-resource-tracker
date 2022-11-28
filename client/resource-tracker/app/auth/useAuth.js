import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";
import apiClient from "../apis/client";

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    apiClient.setHeader('x-auth-token', authToken)
    const newUser = jwtDecode(authToken);
    setUser(newUser);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    apiClient.setHeader('x-auth-token', "")
    setUser(null);
    authStorage.removeToken();
  };

  const result = { user, logIn, logOut };
  return result;
}
