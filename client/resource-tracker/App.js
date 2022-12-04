import "react-native-gesture-handler";
import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MakeRequest from './app/screens/MakeRequest';
import ViewRequest from './app/screens/ViewRequest';
import AllRequests from "./app/screens/AllRequests";
import Drawer from "./app/navigation/Drawer";
import AddRemarks from "./app/screens/AddRemarks";
import UserProfile from "./app/screens/UserProfile";
import { statusbar } from "./app/configs/variables";
import Requests from "./app/screens/Requests";
import AddResource from "./app/screens/AddResource";
import ResourceList from "./app/screens/ResourceList";
import QRCode from "./app/screens/ApproveResource";
import AuthContext from "./app/auth/context";
import Login from "./app/screens/Login";
import authStorage from './app/auth/storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Network from 'expo-network';
import InternetError from "./app/animations/InternetError";


export default function App() {
  const [user, setUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [network, setNetwork] = useState(true);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) Promise.all([]);
    setUser(user);
    return Promise.all([]);
  }
  useEffect(() => {
    async function prepare() {
      try {
        // Preload Account
        const user = await authStorage.getUser()

        setUser(user)
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render

      }
    }

    async function getNetworkState() {
      const networkState = await Network.getNetworkStateAsync();
      if (networkState.isInternetReachable) {
        setAppIsReady(true);
      } else {
        setNetwork(false);
        setAppIsReady(true);
      }
    }

    prepare();
    getNetworkState();

  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!network) {
    return (<>
      <InternetError />
    </>);
  }


  return (
    <View style={styles.container}>
      {user ? (

        <AuthContext.Provider value={{ user, setUser }}>
          <Drawer />
        </AuthContext.Provider>
      ) : (

        <AuthContext.Provider value={{ user, setUser }}>
          <Login />
        </AuthContext.Provider>
      )}

      {/* <MakeRequest /> */}
      {/* <ViewRequest /> */}
      {/* <AddRemarks/> */}
      {/* <AllRequests /> */}
      {/* <UserProfile /> */}
      {/* <Text>Hello</Text> */}
      {/* <Drawer /> */}
      {/* <MakeRequest /> */}
      {/* <Requests /> */}
      {/* <AddResource /> */}
      {/* <ResourceList /> */}
      {/* <QRCode /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: statusbar,
  },
});
