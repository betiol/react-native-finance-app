/*
* @flow
*/

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
  ActivityIndicator
} from "react-native";
import Api from "@shared/Api";
import { connect } from "react-redux";
import Colors from "@shared/Colors";
import LoadingSpinner from "@components/LoadingSpinner";
import { RenderDrawerMenu } from "@components/DrawerUtils";
import { Icon, Card, Avatar } from "react-native-elements";
import { requestAccounts, requestTotalValue } from "@actions/account";
import { requestTypes } from "@actions/typeOccurrence";
import { fetchOccurrences } from "@actions/occurrence";
import {
  StyledContainerView,
  TextAmount,
  ContainerRowWithSpaceBetween
} from "@shared/Styled";
import ActionButton from "react-native-action-button";
import AccountCard from "@components/AccountCard";
const { height } = Dimensions.get("window");

class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => <Icon name="pie-chart" color={tintColor} />,
    headerLeft: RenderDrawerMenu(navigation)
  });

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount = async () => {
    await this.props.requestAccounts();
    await this.props.requestTypes();
    this.props.requestTotalValue();
    this.props.fetchOccurrences();
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.requestTotalValue();
    this.setState({ refreshing: false });
  };

  renderAccount = () => {
    let { accounts } = this.props;
    return (accounts || []).map(acc => {
      return <AccountCard key={acc.id} name={acc.name} amount={acc.amount} />;
    });
  };

  renderFabButton = () => {
    let { typeOccurrences } = this.props;
    return typeOccurrences.map(occurrence => {
      return (
        <ActionButton.Item
          key={occurrence.id}
          buttonColor={
            occurrence.name == "Receita" ? Colors.primaryColor : Colors.redColor
          }
          title={occurrence.name}
          onPress={() => {
            if (occurrence.name == "Receita") {
              return this.props.navigation.navigate("Incomes", {
                typeId: occurrence.id
              });
            }
            if (occurrence.name == "Despesa") {
              return this.props.navigation.navigate("Expenses", {
                typeId: occurrence.id
              });
            }
            if (occurrence.name == "Transferencia") {
              return this.props.navigation.navigate("Transference", {
                typeId: occurrence.id
              });
            }
          }}
        >
          <Icon name="add" buttonColor={"#ccc"} color={"#fff"} />
        </ActionButton.Item>
      );
    });
  };

  render() {
    let { isFetching, typeOccurrences, totalValue, loadingTotal } = this.props;
    const loadAll = loadingTotal || !totalValue || isFetching;
    return (
      <StyledContainerView>
        <ScrollView
          flex={1}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <View
            style={[
              styles.containerAccount,
              {
                backgroundColor:
                  totalValue >= 0 ? Colors.primaryColor : Colors.redColor
              }
            ]}
          >
            {loadAll && <ActivityIndicator color={"#fff"} size={"small"} />}
            <TextAmount>R$ {totalValue.toFixed(2) || 0.0}</TextAmount>
          </View>
          <View style={{ flex: 2 }}>{this.renderAccount()}</View>
        </ScrollView>
        <ActionButton
          buttonColor={Colors.terciaryColor}
          size={45}
          buttonColor={Colors.redColor}
        >
          <ActionButton.Item
            buttonColor={Colors.primaryColor}
            title={"Receita"}
            onPress={() => this.props.navigation.navigate("Incomes")}
          >
            <Icon name="add" color={"#fff"} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Colors.redColor}
            title={"Despesa"}
            onPress={() => this.props.navigation.navigate("Expenses")}
          >
            <Icon name="add" color={"#fff"} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Colors.terciaryColor}
            title={"Transferência"}
            onPress={() => this.props.navigation.navigate("Transference")}
          >
            <Icon name="add" buttonColor={"#ccc"} color={"#fff"} />
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
    height: height / 3,
    justifyContent: "center"
    // backgroundColor: Colors.primaryColor
  },

  actionButtonIcon: {
    color: "#fff"
  }
});

const select = ({ account, typeOccurrence }) => {
  const { isFetching, accounts, totalValue, loadingTotal } = account;
  const { typeOccurrences } = typeOccurrence;
  return { isFetching, accounts, typeOccurrences, totalValue, loadingTotal };
};

export default connect(select, {
  requestAccounts,
  requestTotalValue,
  requestTypes,
  fetchOccurrences
})(Dashboard);
