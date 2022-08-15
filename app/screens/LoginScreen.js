import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Screen from "../components/Screen";
import { Button, Input, Image } from "@rneui/themed";

import auth from "../services/auth";
import firebase from "../../firebase";

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (!user) {
        return;
      }

      console.log("listener", user);
      navigation.replace("Home");
    });

    return unsubscribe;
  }, []);

  const handleSubmit = async () => {
    const res = await auth.login(credentials);
    if (!res.ok) {
      return console.log("err", res.err.message);
    }
  };

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
            onSubmitEditing={handleSubmit}
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
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
    marginVertical: 20,
  },
  logo: {
    borderRadius: 7,
    height: 150,
    width: 150,
  },
  button: {
    alignSelf: "center",
    marginBottom: 20,
    width: 200,
  },
});

export default LoginScreen;
