import "react-native-gesture-handler";
import { useState } from 'react'
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

export default function App() {
  const [user, setUser] = useState(null);

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
    marginTop: statusbar,
  },
});
