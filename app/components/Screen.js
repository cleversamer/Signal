import { SafeAreaView, StyleSheet, View } from "react-native";
import OfflineNotice from "./OfflineNotice";

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <OfflineNotice />
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default Screen;
