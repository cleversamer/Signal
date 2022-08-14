import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./app/navigation/RootNavigation";

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;
