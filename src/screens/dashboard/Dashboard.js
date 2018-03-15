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
import { requestAccount } from "@actions/account";

class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => <Icon name="pie-chart" color={tintColor} />,
    headerLeft: RenderDrawerMenu(navigation)
  });

  componentDidMount = async () => {
    await this.props.requestAccount();
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Avatar
                small
                rounded
                title="BB"
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <Text style={{ paddingTop: 5 }}>{acc.name}</Text>
              <Text
                style={{
                  paddingTop: 5,
                  color: "#3498db",
                  fontWeight: "bold"
                }}
              >
                R$ {acc.amount}
              </Text>
            </View>
          </Card>
        </View>
      );
    });
  };

  render() {
    let { isFetching, accounts } = this.props;
    {
      isFetching && <LoadingSpinner isVisible={isFetching} />;
    }
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: Colors.primaryColor
          }}
        >
          <Text
            style={{
              fontSize: 40,
              paddingTop: 40,
              color: "#fff",
              textAlign: "center"
            }}
          >
            R$ {"350,06"}
          </Text>
        </View>
        <View style={{ flex: 2 }}>{this.renderAccount()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const select = ({ account }) => {
  const { isFetching, accounts } = account;
  return { isFetching, accounts };
};

export default connect(select, { requestAccount })(Dashboard);
