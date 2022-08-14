import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2c6bed" },
  headerTitleStyle: { color: "#fff" },
  headerTintColor: "#fff",
};

const Stack = createNativeStackNavigator();

const RootNavigation = () => (
  <Stack.Navigator screenOptions={globalScreenOptions}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default RootNavigation;
