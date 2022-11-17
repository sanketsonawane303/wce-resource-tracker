

import { StyleSheet, Text} from 'react-native';


import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from '../screens/Home';

const AppDrawer = createDrawerNavigator();


export default function Drawer() {
  return (
    <>
        <NavigationContainer>
        <AppDrawer.Navigator
          drawerContent={Home}
          screenOptions={{
            headerShown: true,
            drawerLabelStyle: {
              marginLeft: -20,
              fontSize: 18,
              color: "#00aced",
            },
            drawerStyle: {
              //   padding: 10,
            },
            drawerItemStyle: {
              paddingLeft: 20,
            },
          }}
        >
        <AppDrawer.Screen name='home' component={Home}/>
      </AppDrawer.Navigator>
        </NavigationContainer>
    </>
  );
}
