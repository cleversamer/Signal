import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import withScrollView from "../hoc/withScrollView";
import CustomListItem from "../components/CustomListItem";
import useHeader from "../hooks/useHeader";

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

  return (
    <Screen style={styles.container}>
      <CustomListItem />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerIcon: {
    marginRight: 15,
  },
});

export default withScrollView(HomeScreen);
