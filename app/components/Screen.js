import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
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
