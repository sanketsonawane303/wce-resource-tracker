import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import ResourceList from '../screens/ResourceList';
import EditResoure from '../screens/EditResource';
import { colors } from '../configs/variables';
const StackNavigator = createStackNavigator();
import HeaderItem from '../components/HeaderItem';
import AddResource from '../screens/AddResource';
import KeyHistory from '../screens/KeyHistory';


export default function ResourceStack() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="ManageResources" component={ResourceList} options={
        {
          header: (props) => <HeaderItem {...props} />,
          headerTitle: 'Manage Resources',
        }
      } />
      <StackNavigator.Screen
        name="EditResource"
        component={EditResoure}
        options={{
          headerStyle: {
          }
        }}
      />
      <StackNavigator.Screen
        name="AddResource"
        component={AddResource}
        options={{
          headerTitle: "Add Resource",
          headerStyle: {
          }
        }}
      />

      <StackNavigator.Screen name='KeyHistory' component={KeyHistory} options={{
        headerTitle: 'Key History',

      }} />
    </StackNavigator.Navigator>
  );
}