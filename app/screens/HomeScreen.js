import { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "@rneui/themed";
import Screen from "../components/Screen";
import CustomListItem from "../components/CustomListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import useHeader from "../hooks/useHeader";
import chatService from "../services/chat";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import useAuth from "./../auth/useAuth";

const headerOptions = {
  headerLeft: true,
  headerStyle: { backgroundColor: "#fff" },
  headerTintColor: { color: "#303030" },
  headerTitleStyle: { color: "#303030" },
  title: "Signal",
};

const HomeScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [chats, setChats] = useState([]);
  useHeader(navigation, {
    ...headerOptions,
    headerRight: {
      left: () => (
        <SimpleLineIcons
          color="#303030"
          name="pencil"
          onPress={() => navigation.navigate("AddChat")}
          size={24}
        />
      ),
      right: () => (
        <MaterialCommunityIcons
          color="#303030"
          name="logout"
          onPress={async () => await logout()}
          size={24}
        />
      ),
    },
  });

  useEffect(() => {
    try {
      return chatService.subscribeToChats(setChats);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteChat = async (chatId) => {
    try {
      await chatService.deleteChat(chatId);
      setChats(chats.filter((chat) => chat.id !== chatId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Screen style={styles.container}>
      <StatusBar style="dark" />

      {!chats.length && <Text style={styles.text}>No chats added.</Text>}

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        refreshing={false}
        renderItem={({ item }) => (
          <CustomListItem
            chat={item}
            onDelete={() => deleteChat(item.id)}
            onEnter={() => navigation.navigate("Chat", item)}
          />
        )}
        scrollEnabled
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  headerIcon: {
    marginRight: 15,
  },
  text: {
    color: "#303030",
    fontSize: 14,
    justifyContent: "center",
    marginTop: 15,
    textAlign: "center",
  },
});

export default HomeScreen;
