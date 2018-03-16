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
import { requestTypes } from "@actions/typeOccurrence";

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
    await this.props.requestTypes();
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

  renderFabButton = () => {
    let { typeOccurrences } = this.props;
    console.log(typeOccurrences);
    return typeOccurrences.map(occurrence => {
      return (
        <ActionButton.Item
          buttonColor={
            occurrence.name == "Receita" ? Colors.primaryColor : "#ff5a50"
          }
          title={occurrence.name}
          onPress={() =>
            occurrence.name == "Receita"
              ? this.props.navigation.navigate("Incomes", {
                  typeId: occurrence.id
                })
              : this.props.navigation.navigate("Expenses", {
                  typeId: occurrence.id
                })
          }
        >
          <Icon name="add" color={"#fff"} />
        </ActionButton.Item>
      );
    });
  };

  render() {
    let { isFetching, typeOccurrences } = this.props;
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
          {this.renderFabButton()}
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

const select = ({ account, typeOccurrence }) => {
  const { isFetching, accounts } = account;
  const { typeOccurrences } = typeOccurrence;
  return { isFetching, accounts, typeOccurrences };
};

export default connect(select, { requestAccounts, requestTypes })(Dashboard);
