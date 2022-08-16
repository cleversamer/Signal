import { StyleSheet, TouchableOpacity } from "react-native";

const withTouchableOpacity = (Content, options) => (props) => {
  return (
    <TouchableOpacity {...options} style={styles.container}>
      <Content {...props} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default withTouchableOpacity;
