import { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import useHeader from "../hooks/useHeader";
import withKeyboardAvoidingView from "../hoc/withKeyboardAvoidingView";
import chatService from "../services/chat";
import useAuth from "../auth/useAuth";
import { Avatar, Text } from "@rneui/themed";

const headerOptions = {
  headerBackVisible: false,
  headerStyle: { backgroundColor: "#2c6bed" },
  headerTintColor: { color: "#fff" },
  headerTitle: true,
};

const ChatScreen = ({ navigation, route }) => {
  const chat = route.params;
  const { user } = useAuth();
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  useHeader(navigation, {
    ...headerOptions,
    avatarUrl: chat.avatarUrl,
    title: chat.name,
    headerRight: {
      left: () => <FontAwesome name="video-camera" size={24} color="#fff" />,
      right: () => <Ionicons name="call" size={24} color="#fff" />,
    },
  });

  useEffect(() => {
    return chatService.subscribeToChat(setMessages, chat.id);
  }, []);

  const handleSend = async () => {
    if (!input) return;
    Keyboard.dismiss();

    try {
      await chatService.sendMessage(chat.id, {
        text: input,
        sender: {
          avatarUrl: user.photoURL,
          email: user.email,
          name: user.displayName,
        },
      });
    } catch (err) {
      console.log(err);
    }

    setInput("");
  };

  const renderMssgAvatar = (mssg) =>
    mssg.sender.avatarUrl
      ? { uri: mssg.sender.avatarUrl }
      : require("../assets/user.png");

  return (
    <Screen style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        style={{ paddingTop: 15 }}
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({ animated: true })
        }
      >
        {messages.map((mssg) =>
          mssg.sender.email === user.email ? (
            <View key={mssg.id} style={styles.sender.container}>
              <Avatar
                size={30}
                rounded
                source={renderMssgAvatar(mssg)}
                containerStyle={{
                  bottom: -15,
                  position: "absolute",
                  right: -5,
                }}
              />
              <Text style={styles.sender.text}>{mssg.text}</Text>
            </View>
          ) : (
            <View key={mssg.id} style={styles.receiver.container}>
              <Avatar
                size={30}
                rounded
                source={renderMssgAvatar(mssg)}
                containerStyle={{
                  bottom: -15,
                  left: -5,
                  position: "absolute",
                }}
              />
              <Text style={styles.receiver.text}>{mssg.text}</Text>
            </View>
          )
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TextInput
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={handleSend}
          placeholder="Send a message..."
          style={styles.textInput}
          value={input}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          disabled={!input}
          onPress={handleSend}
        >
          <Ionicons name="send" size={30} color="#2c6bed" />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    width: "100%",
  },
  textInput: {
    backgroundColor: "#ececec",
    borderColor: "transparent",
    borderRadius: 30,
    borderWidth: 1,
    bottom: 0,
    color: "#303030",
    flex: 1,
    height: 40,
    marginRight: 15,
    padding: 10,
  },
  sender: {
    container: {
      alignItems: "center",
      alignSelf: "flex-end",
      backgroundColor: "#2c6bed",
      borderRadius: 20,
      flexDirection: "row",
      marginBottom: 20,
      marginRight: 15,
      maxWidth: "80%",
      padding: 15,
      position: "relative",
    },
    text: {
      color: "#fff",
      fontSize: 13,
    },
  },
  receiver: {
    container: {
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: "#ececec",
      borderRadius: 20,
      flexDirection: "row",
      marginBottom: 20,
      marginLeft: 15,
      maxWidth: "80%",
      padding: 15,
      position: "relative",
    },
    text: {
      color: "#303030",
      fontSize: 13,
    },
  },
});

const keyboardOptions = {
  style: styles.container,
};

export default withKeyboardAvoidingView(ChatScreen, keyboardOptions);
