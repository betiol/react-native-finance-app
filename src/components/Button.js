import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Colors from "@shared/Colors";

const NoOutlineButton = ({ title, onPress }) => {
  return (
    <Button
      title={title}
      fontWeight="700"
      buttonStyle={{
        backgroundColor: "transparent"
      }}
      onPress={onPress}
    />
  );
};

const OutlinedButton = ({ title, onPress, borderColor, backgroundColor }) => {
  return (
    <Button
      title={title}
      fontWeight="700"
      buttonStyle={{
        backgroundColor,
        borderColor,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: 8
      }}
      onPress={onPress}
    />
  );
};

const OutlinedButtonPrimary = ({ title, onPress }) => {
  return (
    <OutlinedButton
      title={title}
      onPress={onPress}
      borderColor={Colors.lighterText}
      backgroundColor={Colors.primaryColor}
    />
  );
};

export { OutlinedButtonPrimary, OutlinedButton, NoOutlineButton };
