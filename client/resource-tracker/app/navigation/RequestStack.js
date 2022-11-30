import { createStackNavigator } from '@react-navigation/stack';

const StackNavigator = createStackNavigator();
import AllRequests from '../screens/AllRequests';
import ViewRequest from '../screens/ViewRequest';


export default function RequestStack() {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen name="AllRequests" component={AllRequests} options={
                {
                    headerTitle: 'All Requests',
                    headerShown: false
                }
            } />
            <StackNavigator.Screen
                name="ViewRequest"
                component={ViewRequest}
                options={{
                    headerTitle: "Request Details"
                }}
            />
        </StackNavigator.Navigator>
    );
}