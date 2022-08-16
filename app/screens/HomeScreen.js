import { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Text } from "@rneui/themed";
import Screen from "../components/Screen";
import CustomListItem from "../components/CustomListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import useHeader from "../hooks/useHeader";
import chatService from "../services/chat";

const headerOptions = {
  headerLeft: true,
  headerRight: true,
  headerStyle: { backgroundColor: "#fff" },
  headerTintColor: { color: "#303030" },
  headerTitleStyle: { color: "#303030" },
  title: "Signal",
};

const HomeScreen = ({ navigation }) => {
  useHeader(navigation, headerOptions);
  const [chats, setChats] = useState([]);

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
      {!chats.length && <Text style={styles.text}>No chats added.</Text>}

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        refreshing={false}
        renderItem={({ item }) => (
          <CustomListItem chat={item} onDelete={() => deleteChat(item.id)} />
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
