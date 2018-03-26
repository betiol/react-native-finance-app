import React from "react";

import { View, Text } from "react-native";
import Colors from "@shared/Colors";
import { ContainerRowWithSpaceBetween } from "@shared/Styled";
import { Card, Avatar } from "react-native-elements";

const AccountCard = props => (
  <View key={props.id}>
    <Card>
      <Text style={{ paddingBottom: 5, color: Colors.terciaryColor }}>
        Contas
      </Text>
      <ContainerRowWithSpaceBetween>
        <Avatar small rounded title="BB" />
        <Text style={{ paddingTop: 5 }}>{props.name}</Text>
        <Text
          style={[
            styles.accountAmount,
            {
              color: props.amount > 0 ? Colors.primaryColor : Colors.redColor
            }
          ]}
        >
          R$ {props.amount}
        </Text>
      </ContainerRowWithSpaceBetween>
    </Card>
  </View>
);

const styles = {
  accountAmount: {
    paddingTop: 5,
    fontWeight: "bold"
  }
};

export default AccountCard;
