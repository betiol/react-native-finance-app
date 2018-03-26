import React from "react";
import { View, Text } from "react-native";
import Colors from "@shared/Colors";
import { StyledContainerView } from "@shared/Styled";

export default class CreateAccount extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Criar Nova Conta",
    headerStyle: { backgroundColor: Colors.primaryColor }
  });
  render() {
    return (
      <StyledContainerView>
        <Text>WWW</Text>
      </StyledContainerView>
    );
  }
}
