

import { StyleSheet, Text } from 'react-native';


import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Sidebar from '../components/Sidebar';
import { colors } from 'react-native-elements';

import ResourceStack from './ResourceStack';
import MakeRequest from '../screens/MakeRequest';
import AllRequests from '../screens/AllRequests';
import ViewRequest from '../screens/ViewRequest';
import UserProfile from '../screens/UserProfile';
import ResourceList from '../screens/ResourceList';
import EditResoure from '../screens/EditResource';
import AddResource from '../screens/AddResource';
import ApproveResource from '../screens/ApproveResource';
import Login from '../screens/Login';
import AddUser from '../screens/AddUser';
const AppDrawer = createDrawerNavigator();

const drawerStyles = {
  drawerItemStyle: {
    backgroundColor: colors.grey5,
  },
  drawerLabelStyle: {
    color: "black",
    fontSize: 18
  }
}

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
            },
            drawerItemStyle: {
              paddingLeft: 20,
            },

          }}
        >
          <AppDrawer.Screen name='AllRequests' component={AllRequests} options={{
            headerTitle: 'All Requests',
            drawerLabel: 'All Requests',
            ...drawerStyles
          }} />
          <AppDrawer.Screen name='MakeRequest' component={MakeRequest} options={{
            headerTitle: 'Make Request',
            drawerLabel: 'Make Request',
            ...drawerStyles

          }} />


          <AppDrawer.Screen name='ViewRequest' component={ViewRequest} options={{
            headerTitle: 'View Request',
            drawerLabel: 'View Request',
            ...drawerStyles
          }} />

          <AppDrawer.Screen name='UserProfile' component={UserProfile} options={{
            headerTitle: 'User Profile',
            drawerLabel: 'User Profile',
            ...drawerStyles
          }} />

          <AppDrawer.Screen name='ApproveScreen' component={ApproveResource} options={{
            headerTitle: 'Resource Operations',
            drawerLabel: 'Resource Operations',
            ...drawerStyles
          }} />

          <AppDrawer.Screen name='ResourcesStack' component={ResourceStack} options={{
            headerTitle: 'Manage Resources',
            drawerLabel: 'Manage Resources',
            header: () => null,
            ...drawerStyles
          }} />

          <AppDrawer.Screen name='Login' component={Login} options={{
            headerTitle: 'Login',
            drawerLabel: 'Login',
            ...drawerStyles
          }} />

          <AppDrawer.Screen name='AddUser' component={AddUser} options={{
            headerTitle: 'Add User',
            drawerLabel: 'Add User',
            ...drawerStyles
          }} />



        </AppDrawer.Navigator>
      </NavigationContainer>
    </>
  );
}
