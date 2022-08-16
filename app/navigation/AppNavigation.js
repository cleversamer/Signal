import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddChatScreen from "../screens/AddChatScreen";

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2c6bed" },
  headerTitleStyle: { color: "#fff" },
  headerTintColor: "#fff",
};

const Stack = createNativeStackNavigator();

const AppNavigation = () => (
  <Stack.Navigator screenOptions={globalScreenOptions}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddChat" component={AddChatScreen} />
  </Stack.Navigator>
);

export default AppNavigation;
