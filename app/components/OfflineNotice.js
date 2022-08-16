import { View, StyleSheet } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { Text } from "@rneui/themed";

const OfflineNotice = () => {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No internet connection.</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ff5252",
    height: 30,
    justifyContent: "center",
    width: "100%",
    zIndex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 13,
  },
});

export default OfflineNotice;
