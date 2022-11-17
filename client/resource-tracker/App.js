import "react-native-gesture-handler";

import { StyleSheet, Text, View } from 'react-native';

import Drawer from "./app/navigation/Drawer";
export default function App() {
  return (
    <>
   <Drawer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
