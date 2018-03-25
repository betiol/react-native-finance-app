import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Dashboard from "./Dashboard";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import Occurrences from "./Occurrences";
import Transference from "./Transference";

import Colors from "@shared/Colors";

export default StackNavigator(
  {
    Dashboard: { screen: Dashboard },
    Incomes: { screen: Incomes },
    Expenses: { screen: Expenses },
    Occurrences: { screen: Occurrences },
    Transference: { screen: Transference }
  },
  {
    mode: "modal",
    initialRouteName: "Dashboard",
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: Colors.lighterText,
      headerStyle: {
        position: "absolute",
        backgroundColor: "transparent",
        top: 0,
        left: 0,
        right: 0,
        elevation: 0,
        borderBottomWidth: 0
      }
    }
  }
);
