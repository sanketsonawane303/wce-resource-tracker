import { createStackNavigator } from '@react-navigation/stack';
import ApproveResource from '../screens/ApproveResource';
import AttachImage from '../screens/AttachImage';

const StackNavigator = createStackNavigator();

export default function ApprovalStack() {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen name="ApproveScreen" component={ApproveResource} options={
                {
                    headerShown: false
                }
            } />
            <StackNavigator.Screen
                name="AttachImage"
                component={AttachImage}
                options={{
                    headerTitle: "Attach Image"
                }}
            />
        </StackNavigator.Navigator>
    );
}