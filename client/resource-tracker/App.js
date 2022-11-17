import "react-native-gesture-handler";

import { StyleSheet, Text, View } from 'react-native';
import MakeRequest from './app/screens/MakeRequest';
import ViewRequest from './app/screens/ViewRequest';
import AllRequests from "./app/screens/AllRequests";
import Drawer from "./app/navigation/Drawer";
import AddRemarks from "./app/screens/AddRemarks";
import UserProfile from "./app/screens/UserProfile";
import { statusbar } from "./app/configs/variables";
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
<<<<<<< HEAD
    marginTop: statusbar
    // alignItems: 'center',
    // justifyContent: 'center',
=======
    backgroundColor: '#fff',
    marginTop: statusbar,
>>>>>>> 3d26e1f93d2cf594f72360d5a24704e94afdd575
  },
});
