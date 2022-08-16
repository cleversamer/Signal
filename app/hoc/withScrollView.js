import { ScrollView } from "react-native";

const withScrollView = (Content, style) => (props) => {
  return (
    <ScrollView style={[styles.container, style]}>
      <Content {...props} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default withScrollView;
