import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "@rneui/themed";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

const CustomListItem = ({ id, chat, enterChat, onDelete }) => {
  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => <ListItemDeleteAction onPress={onDelete} />}
      >
        <ListItem style={styles.container}>
          <Avatar rounded source={require("../assets/user.png")} />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{chat.name}</ListItem.Title>
            <ListItem.Subtitle
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              This is a subtitle and I try to make it as long as I can
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
    textTransform: "capitalize",
  },
  subtitle: {
    color: "#808080",
  },
});

export default CustomListItem;
