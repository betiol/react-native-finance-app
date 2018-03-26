import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import Colors from "@shared/Colors";
import { Icon } from "react-native-elements";
import { StyledContainerView } from "@shared/Styled";
import { connect } from "react-redux";
import { fetchAccounts } from "@actions/account";
import t from "tcomb-form-native";
import AccountCard from "@components/AccountCard";

class Accounts extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Contas",
    headerStyle: { backgroundColor: Colors.primaryColor },
    headerRight: (
      <Icon
        component={TouchableOpacity}
        onPress={() => navigation.navigate("CreateAccount")}
        name={"add"}
        size={40}
        color={"#fff"}
      />
    )
  });

  renderAccount = () => {
    let { accounts } = this.props;
    return (accounts || []).map(acc => {
      return <AccountCard key={acc.id} name={acc.name} amount={acc.amount} />;
    });
  };

  render() {
    return <StyledContainerView>{this.renderAccount()}</StyledContainerView>;
  }
}

const select = ({ account }) => {
  let { isFetching, accounts } = account;
  return { isFetching, accounts };
};

export default connect(select, {})(Accounts);
