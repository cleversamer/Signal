import { View, StyleSheet } from "react-native";

const ListItemSeparator = () => {
  return <View style={styles.separator}></View>;
};

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#efefef",
  },
});

export default ListItemSeparator;
