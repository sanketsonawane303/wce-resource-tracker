import * as SecureStore from "expo-secure-store";

import jwtDecode from "jwt-decode";
import apiClient from "../apis/client";

const key = "authtoken";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.error("Error Storing Auth Token");
  }
};

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(key);
    return token;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async () => {
  const token = await getToken();
  if (token) {
    apiClient.setHeader('x-auth-token', token)
    return jwtDecode(token);
  }
  return null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(error);
  }
};

export default {
  storeToken,
  getUser,
  removeToken,
  getToken,
};
