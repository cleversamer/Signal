import { useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar } from "@rneui/themed";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import useAuth from "../auth/useAuth";

const HeaderLeft = ({ photoURL }) => {
  const renderIcon = () =>
    photoURL ? { uri: photoURL } : require("../assets/user.png");

  return (
    <TouchableOpacity style={styles.headerLeft} activeOpacity={0.5}>
      <Avatar rounded source={renderIcon()} />
    </TouchableOpacity>
  );
};

const HeaderRight = () => (
  <View style={styles.headerRight}>
    <TouchableOpacity activeOpacity={0.5}>
      <AntDesign name="camerao" size={24} color="#303030" />
    </TouchableOpacity>

    <TouchableOpacity activeOpacity={0.5}>
      <SimpleLineIcons name="pencil" size={24} color="#303030" />
    </TouchableOpacity>
  </View>
);

const useHeader = (navigation, options) => {
  const { user } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      ...options,
      headerLeft: () =>
        options.headerLeft && <HeaderLeft photoURL={user.photoURL} />,
      headerRight: () => options.headerRight && <HeaderRight />,
    });
  }, []);
};

const styles = StyleSheet.create({
  headerLeft: {
    marginRight: 15,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    width: 80,
  },
});

export default useHeader;
