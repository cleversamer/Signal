import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "@rneui/themed";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem style={styles.container}>
      <Avatar rounded source={require("../assets/user.png")} />

      <ListItem.Content>
        <ListItem.Title style={styles.title}>YouTube chat</ListItem.Title>

        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          This is a subtitle and I try to make it as long as I can
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: "800",
  },
});

export default CustomListItem;
