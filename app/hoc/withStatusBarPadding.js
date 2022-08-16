import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

const withStatusBarPadding = (Content, style) => (props) => {
  return (
    <View style={[styles.container, style]}>
      <Content {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});

export default withStatusBarPadding;
