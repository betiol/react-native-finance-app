import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Occurrences from "./Occurrences";

import Colors from "@shared/Colors";

export default StackNavigator(
  {
    Occurrences: { screen: Occurrences }
  },
  {
    initialRouteName: "Occurrences",
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: Colors.lighterText,
      headerStyle: {
        backgroundColor: Colors.primaryColor
      }
    }
  }
);
