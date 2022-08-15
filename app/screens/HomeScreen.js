import { Button } from "react-native";
import { StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";

const HomeScreen = (props) => {
  const auth = useAuth();

  const handleLogout = async () => {
    try {
      await auth.logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Screen style={styles.container}>
      <Text>This is the home screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
