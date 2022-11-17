import "react-native-gesture-handler";

import { StyleSheet, Text, View } from 'react-native';
import MakeRequest from './app/screens/MakeRequest';
import ViewRequest from './app/screens/ViewRequest';
import AllRequests from "./app/screens/AllRequests";
import Drawer from "./app/navigation/Drawer";
import AddRemarks from "./app/screens/AddRemarks";
import UserProfile from "./app/screens/UserProfile";
import { statusbar } from "./app/configs/variables";
export default function App() {
  return (
    <View style={styles.container}>
      {/* <MakeRequest /> */}
      {/* <ViewRequest/> */}
      {/* <AddRemarks/> */}
      {/* <AllRequests /> */}
      <UserProfile />
      {/* <Text>Hello</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: statusbar
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
