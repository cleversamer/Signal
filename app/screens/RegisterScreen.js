import { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "@rneui/themed";
import Screen from "../components/Screen";
import withKeyboardAvoidingView from "../hoc/withKeyboardAvoidingView";
import auth from "../auth";

const RegisterScreen = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
  });

  const handleChange = (key) => (value) => {
    setUser({ ...user, [key]: value });
  };

  const handleRegister = async () => {
    try {
      await auth.register(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Screen style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.heading}>Create a Signal account</Text>

      <View style={styles.inputContainer}>
        <Input
          autoFocus
          onChangeText={handleChange("name")}
          placeholder="Full Name"
          value={user.name}
        />

        <Input
          keyboardType="email-address"
          onChangeText={handleChange("email")}
          placeholder="Email"
          value={user.email}
        />

        <Input
          onChangeText={handleChange("password")}
          placeholder="Password"
          secureTextEntry
          value={user.password}
        />

        <Input
          keyboardType="url"
          onChangeText={handleChange("avatarUrl")}
          onSubmitEditing={handleRegister}
          placeholder="Avatar URL (Optional)"
          textContentType="URL"
          value={user.avatarUrl}
        />
      </View>

      <Button
        onPress={handleRegister}
        raised
        containerStyle={styles.button}
        title="Register"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
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

export default withKeyboardAvoidingView(RegisterScreen, styles.container);
