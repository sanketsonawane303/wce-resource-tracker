import "react-native-gesture-handler";

import { StyleSheet, Text, View } from 'react-native';
import MakeRequest from './app/screens/MakeRequest';
import ViewRequest from './app/screens/ViewRequest';
import AllRequests from "./app/screens/AllRequests";
import Drawer from "./app/navigation/Drawer";
import AddRemarks from "./app/screens/AddRemarks";
import { statusbar } from "./app/configs/variables";

export default function App() {
  return (
    <View style={styles.container}>
      <MakeRequest />
      {/* <ViewRequest /> */}
      {/* <AddRemarks/> */}
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
