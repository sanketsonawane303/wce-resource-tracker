

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
import RequestStack from './RequestStack';
import ApprovalStack from './ApprovalStack';
import ServerError from '../animations/ServerError';
import InternetError from '../animations/InternetError';
import useAuth from '../auth/useAuth';
import Home from '../screens/Home';
import KeyHistory from '../screens/KeyHistory';
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
  const { user } = useAuth();
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
              paddingLeft: 20
            },

          }}
        >

          {/* <AppDrawer.Screen name='KeyHistory' component={KeyHistory} options={{
            headerTitle: 'Key History',
            drawerLabel: 'Key History',
            ...drawerStyles
          }} /> */}

          <AppDrawer.Screen name='Home' component={Home} options={{
            headerTitle: 'Home',
            drawerLabel: 'Home',
            ...drawerStyles
          }} />
          <AppDrawer.Screen name='ApprovalStack' component={ApprovalStack} options={{
            headerTitle: 'Resource Operations',
            drawerLabel: 'Resource Operations',
            ...drawerStyles
          }} />
          {
            !user.role.includes("admin") && !user.role.includes("helper") &&
            <AppDrawer.Screen name='RequestStack' component={RequestStack} options={{
              headerTitle: 'Requests',
              drawerLabel: 'Requests',
              ...drawerStyles
            }} />
          }



          {
            user.role.includes("representative") &&
            <AppDrawer.Screen name='MakeRequest' component={MakeRequest} options={{
              headerTitle: 'Make Request',
              drawerLabel: 'Make Request',
              ...drawerStyles

            }} />
          }

          <AppDrawer.Screen name='UserProfile' component={UserProfile} options={{
            headerTitle: 'User Profile',
            drawerLabel: 'User Profile',
            ...drawerStyles
          }} />


          {
            user.role.includes("admin") &&
            <AppDrawer.Screen name='ResourcesStack' component={ResourceStack} options={{
              headerTitle: 'Manage Resources',
              drawerLabel: 'Manage Resources',
              header: () => null,
              ...drawerStyles
            }} />
          }

          {
            user.role.includes("admin") &&
            <AppDrawer.Screen name='AddUser' component={AddUser} options={{
              headerTitle: 'Add User',
              drawerLabel: 'Add User',
              ...drawerStyles
            }} />

          }
          <AppDrawer.Screen name="InternetError" component={InternetError}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' },
            }}
          />

          <AppDrawer.Screen name="ServerError" component={ServerError}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' },
            }}
          />
        </AppDrawer.Navigator>
      </NavigationContainer>
    </>
  );
}
