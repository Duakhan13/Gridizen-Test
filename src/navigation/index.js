const {NavigationContainer} = require('@react-navigation/native');
const {useState} = require('react');
const {useDispatch} = require('react-redux');
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useSelector} from 'react-redux';
import Home from '../screens/Home';
import AddPost from '../screens/AddPost';
import InitialScreen from '../screens/InitialScreen';

enableScreens();
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          presentation: Platform.OS == 'ios' ? '' : 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          headerShown: false,
          presentation: Platform.OS == 'ios' ? '' : 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
function InitialStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{
          headerShown: false,
          presentation: Platform.OS == 'ios' ? '' : 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          presentation: Platform.OS == 'ios' ? '' : 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}

const RootNavigator = () => {
  const [check, setcheck] = useState(false);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const {user} = useSelector(state => state.users);

  return (
    <NavigationContainer>
      {user ? MyStack() : InitialStack()}
    </NavigationContainer>
  );
};
export default RootNavigator;
