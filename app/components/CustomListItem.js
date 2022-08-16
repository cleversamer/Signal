import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "@rneui/themed";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import chatService from "../services/chat";

const CustomListItem = ({ id, chat, onEnter, onDelete }) => {
  const [lastMssg, setLastMssg] = useState("");

  useEffect(() => {
    return chatService.subscribeToLastChat(setLastMssg, chat.id);
  }, []);

  const renderChatPhoto = () => {
    return chat.avatarUrl
      ? { uri: chat.avatarUrl }
      : require("../assets/user.png");
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => <ListItemDeleteAction onPress={onDelete} />}
      >
        <ListItem style={styles.container} onPress={onEnter}>
          <Avatar size={50} rounded source={renderChatPhoto()} />

          <ListItem.Content>
            <ListItem.Title style={styles.title} numberOfLines={1}>
              {chat.name}
            </ListItem.Title>

            <ListItem.Subtitle
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {lastMssg}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    color: "#303030",
    fontWeight: "800",
  },
  subtitle: {
    color: "#808080",
    fontSize: 13,
  },
});

export default CustomListItem;
