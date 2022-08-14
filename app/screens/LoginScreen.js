import { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Screen from "../components/Screen";
import { Button, Input, Image } from "@rneui/themed";

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = () => {};

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, alignItems: "center" }}
      >
        <StatusBar style="light" />

        <Image style={styles.logo} source={require("../assets/logo.png")} />

        <View style={styles.inputContainer}>
          <Input
            autoFocus
            keyboardType="email-address"
            onChangeText={(email) => setCredentials({ ...credentials, email })}
            placeholder="Email"
            value={credentials.email}
          />

          <Input
            onChangeText={(password) =>
              setCredentials({ ...credentials, password })
            }
            placeholder="Password"
            secureTextEntry
            value={credentials.password}
          />
        </View>

        <Button
          containerStyle={styles.button}
          onPress={handleSubmit}
          title="Login"
        />

        <Button
          containerStyle={styles.button}
          onPress={() => navigation.navigate("Register")}
          title="Register"
          type="outline"
        />

        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
    marginVertical: 20,
  },
  logo: {
    borderRadius: 7,
    height: 200,
    width: 200,
  },
  button: {
    alignSelf: "center",
    marginBottom: 20,
    width: 200,
  },
});

export default LoginScreen;
