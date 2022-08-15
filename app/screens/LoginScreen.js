import { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Screen from "../components/Screen";
import { Button, Input, Image } from "@rneui/themed";
import useAuth from "../auth/useAuth";

const LoginScreen = ({ navigation }) => {
  const auth = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    try {
      await auth.login(credentials);
    } catch (err) {
      console.log(err);
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
