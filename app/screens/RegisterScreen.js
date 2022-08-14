import { useState, useLayoutEffect } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "@rneui/themed";
import Screen from "../components/Screen";

const RegisterScreen = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
  });

  const handleChange = (key) => (value) => setInfo({ ...info, [key]: value });

  const handleRegister = () => {
    alert("Register");
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar style="light" />

        <Text style={styles.heading}>Create a Signal account</Text>

        <View style={styles.inputContainer}>
          <Input
            autoFocus
            onChangeText={handleChange("name")}
            placeholder="Full Name"
            value={info.name}
          />

          <Input
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            placeholder="Email"
            value={info.email}
          />

          <Input
            onChangeText={handleChange("password")}
            placeholder="Password"
            secureTextEntry
            value={info.password}
          />

          <Input
            keyboardType="url"
            onChangeText={handleChange("avatarUrl")}
            onSubmitEditing={handleRegister}
            placeholder="Avatar URL (Optional)"
            textContentType="URL"
            value={info.avatarUrl}
          />
        </View>

        <Button
          onPress={handleRegister}
          raised
          containerStyle={styles.button}
          title="Register"
        />
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
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    width: 200,
  },
});

export default RegisterScreen;
