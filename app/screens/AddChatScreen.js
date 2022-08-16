import { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import Screen from "../components/Screen";
import useHeader from "../hooks/useHeader";
import chatService from "../services/chat";

const headerOptions = {
  headerLeft: false,
  headerRight: false,
  headerStyle: { backgroundColor: "#2c6bed" },
  headerTintColor: { color: "#fff" },
  headerTitleStyle: { color: "#fff" },
  title: "Add a new chat",
};

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  useHeader(navigation, headerOptions);

  const handleCreateChat = async () => {
    try {
      if (!input) return;
      await chatService.createChat(input);
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
      <Input
        autoFocus
        leftIcon={renderLeftIcon()}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={handleCreateChat}
        placeholder="Enter chat name"
        value={input}
      />

      <Button title="Create new chat" onPress={handleCreateChat} />
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
