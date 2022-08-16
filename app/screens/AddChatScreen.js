import { useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input, Icon, Button } from "@rneui/themed";
import Screen from "../components/Screen";
import useHeader from "../hooks/useHeader";
import chatService from "../services/chat";
import useAuth from "./../auth/useAuth";

const headerOptions = {
  headerBackVisible: false,
  headerStyle: { backgroundColor: "#2c6bed" },
  headerTintColor: { color: "#fff" },
  headerTitle: true,
  headerTitleStyle: { color: "#fff" },
  title: "Add a new chat",
};

const AddChatScreen = ({ navigation }) => {
  const { user } = useAuth();
  useHeader(navigation, { ...headerOptions, avatarUrl: user.photoURL });
  const [input, setInput] = useState("");

  const handleCreateChat = async () => {
    try {
      await chatService.createChat({ chatName: input, user });
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const renderLeftIcon = () => (
    <Icon
      color="#303030"
      name="wechat"
      size={24}
      style={styles.inputIcon}
      type="antdesign"
    />
  );

  return (
    <Screen style={styles.container}>
      <StatusBar style="light" />

      <Input
        autoFocus
        leftIcon={renderLeftIcon()}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={handleCreateChat}
        placeholder="Enter chat name"
        value={input}
      />

      <Button
        disabled={!input}
        onPress={handleCreateChat}
        title="Create new chat"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
  },
  inputIcon: {
    marginRight: 5,
  },
});

export default AddChatScreen;
