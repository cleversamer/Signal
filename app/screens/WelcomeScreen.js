import { StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";

const WelcomeScreen = (props) => {
  return (
    <Screen style={styles.container}>
      <Text>Hello world!</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default WelcomeScreen;
