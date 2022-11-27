import "react-native-gesture-handler";

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

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MakeRequest /> */}
      {/* <ViewRequest /> */}
      {/* <AddRemarks/> */}
      {/* <AllRequests /> */}
      {/* <UserProfile /> */}
      {/* <Text>Hello</Text> */}
      <Drawer />
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
