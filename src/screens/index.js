import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Dashboard from "./Dashboard";
import Incomes from "./Incomes";

import Colors from "@shared/Colors";

export default StackNavigator(
  {
    Dashboard: { screen: Dashboard },
    Incomes: { screen: Incomes }
  },
  {
    mode: "modal",
    initialRouteName: "Dashboard",
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: Colors.lighterText,
      headerStyle: {
        position: "absolute",
        backgroundColor: Colors.primaryColor,
        top: 0,
        left: 0,
        right: 0,
        elevation: 0,
        borderBottomWidth: 0
      }
    }
  }
);
