import React from "react";
import { TouchableHighlight, View, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "@shared/Colors";
const { width, height } = Dimensions.get("window");

const ButtonsWithIcon = props => {
  return (
    <TouchableHighlight
      onPress={props.press}
      style={[styles.container, { backgroundColor: props.backgroundColor }]}
    >
      <Ionicons size={props.size} color={props.color} name={props.name} />
    </TouchableHighlight>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    height,
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 40
  }
};

export default ButtonsWithIcon;
