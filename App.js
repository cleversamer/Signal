import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./app/navigation/AuthNavigation";
import AppNavigation from "./app/navigation/AppNavigation";
import AuthContext from "./app/auth/context";
import firebase from "./firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return firebase.auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user }}>
      <NavigationContainer>
        {user ? <AppNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
