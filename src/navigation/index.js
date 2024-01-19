const {NavigationContainer} = require('@react-navigation/native');
const {useState} = require('react');
const {useDispatch} = require('react-redux');
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useSelector} from 'react-redux';
import Home from '../screens/Home';

enableScreens();
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

const RootNavigator = () => {
  const [check, setcheck] = useState(false);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const {user} = useSelector(state => state.users);

  return <NavigationContainer>{MyStack()}</NavigationContainer>;
};
export default RootNavigator;
