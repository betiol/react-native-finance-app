import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Accounts from "./Accounts";
import CreateAccount from "./CreateAccount";
import Settings from "./Settings";

import Colors from "@shared/Colors";

export default StackNavigator(
  {
    Settings: { screen: Settings },
    Accounts: { screen: Accounts },
    CreateAccount: { screen: CreateAccount }
  },
  {
    initialRouteName: "Settings",
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: Colors.lighterText,
      headerStyle: {
        backgroundColor: Colors.primaryColor
      }
    }
  }
);
