

import { StyleSheet, Text } from 'react-native';


import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from '../screens/Home';
import Sidebar from '../components/Sidebar';

import MakeRequest from '../screens/MakeRequest';
import AllRequests from '../screens/AllRequests';
import ViewRequest from '../screens/ViewRequest';
import UserProfile from '../screens/UserProfile';

const AppDrawer = createDrawerNavigator();


export default function Drawer() {
  return (
    <>
      <NavigationContainer>
        <AppDrawer.Navigator
          drawerContent={(props) => <Sidebar {...props} />}
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
          <AppDrawer.Screen name='Home' component={Home} />
          <AppDrawer.Screen name='MakeRequest' component={MakeRequest} options={{
            headerTitle: 'Make Request',
            drawerLabel: 'Make Request'
          }} />
          <AppDrawer.Screen name='AllRequests' component={AllRequests} options={{
            headerTitle: 'All Requests',
            drawerLabel: 'All Requests'
          }} />

          <AppDrawer.Screen name='ViewRequest' component={ViewRequest} options={{
            headerTitle: 'View Request',
            drawerLabel: 'View Request'
          }} />

          <AppDrawer.Screen name='UserProfile' component={UserProfile} options={{
            headerTitle: 'User Profile',
            drawerLabel: 'User Profile'
          }} />


        </AppDrawer.Navigator>
      </NavigationContainer>
    </>
  );
}
