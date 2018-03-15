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
import { Icon } from "react-native-elements";
import { Card } from "@components/Card";
class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => <Icon name="pie-chart" color={tintColor} />,
    headerLeft: RenderDrawerMenu(navigation)
  });

  render() {
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
            R$ 350,06
          </Text>
        </View>
        <View style={{ flex: 2, backgroundColor: "#fff" }} />
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

// export default connect(select, { pendingVehicles, fetchVehicleById })(Live);
export default Dashboard;
