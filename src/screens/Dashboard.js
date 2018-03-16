/*
* @flow
*/

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Api from "@shared/Api";
import { connect } from "react-redux";
import Colors from "@shared/Colors";
import LoadingSpinner from "@components/LoadingSpinner";
import { RenderDrawerMenu } from "@components/DrawerUtils";
import { Icon, Card, Avatar } from "react-native-elements";
import { requestAccounts } from "@actions/account";
import {
  StyledContainerView,
  TextAmount,
  ContainerRowWithSpaceBetween
} from "@shared/Styled";
import ActionButton from "react-native-action-button";

class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => <Icon name="pie-chart" color={tintColor} />,
    headerLeft: RenderDrawerMenu(navigation)
  });

  componentDidMount = async () => {
    await this.props.requestAccounts();
  };

  renderAccount = () => {
    let { accounts } = this.props;
    return (accounts || []).map(acc => {
      return (
        <View key={acc.id}>
          <Card>
            <Text style={{ paddingBottom: 5, color: Colors.terciaryColor }}>
              Contas
            </Text>
            <ContainerRowWithSpaceBetween>
              <Avatar small rounded title="BB" />
              <Text style={{ paddingTop: 5 }}>{acc.name}</Text>
              <Text style={styles.accountAmount}>R$ {acc.amount}</Text>
            </ContainerRowWithSpaceBetween>
          </Card>
        </View>
      );
    });
  };

  render() {
    let { isFetching } = this.props;
    {
      isFetching && <LoadingSpinner isVisible={isFetching} />;
    }
    return (
      <StyledContainerView>
        <View style={styles.containerAccount}>
          <TextAmount>{"R$ 350,06"}</TextAmount>
        </View>
        <View style={{ flex: 2 }}>{this.renderAccount()}</View>
        <ActionButton size={45} buttonColor="#ff5a50">
          <ActionButton.Item
            buttonColor={Colors.primaryColor}
            title="receita"
            onPress={() => this.props.navigation.navigate("Incomes")}
          >
            <Icon name="add" color={"#fff"} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#ff5a50"
            title="despesa"
            onPress={() => {}}
          >
            <Icon name="add" color={"#fff"} />
          </ActionButton.Item>
        </ActionButton>
      </StyledContainerView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center"
  },

  containerAccount: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.primaryColor
  },
  accountAmount: {
    paddingTop: 5,
    color: "#3498db",
    fontWeight: "bold"
  },
  actionButtonIcon: {
    color: "#fff"
  }
});

const select = ({ account }) => {
  const { isFetching, accounts } = account;
  return { isFetching, accounts };
};

export default connect(select, { requestAccounts })(Dashboard);
