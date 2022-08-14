import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";

const globalScreenOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: "#fff",
  },
};

const Stack = createNativeStackNavigator();

const RootNavigation = () => (
  <Stack.Navigator screenOptions={globalScreenOptions}>
    <Stack.Screen name="Splash" component={WelcomeScreen} />
  </Stack.Navigator>
);

export default RootNavigation;
