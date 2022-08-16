import { StyleSheet, KeyboardAvoidingView } from "react-native";

const withKeyboardAvoidingView = (Content, style) => (props) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={[styles.container, style]}>
      <Content {...props} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
});

export default withKeyboardAvoidingView;
