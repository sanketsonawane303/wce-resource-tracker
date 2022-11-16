import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MakeRequest from './app/screens/MakeRequest';
import ViewRequest from './app/screens/ViewRequest';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MakeRequest/> */}
      <ViewRequest/>
    </View>
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
