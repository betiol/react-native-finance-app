import React, { Component } from "react";
import { StatusBar, View } from "react-native";
import App from "./App";
import { Provider, connect } from "react-redux";
import Colors from "@shared/Colors";
import getStore from "@store/store";
const store = getStore();

const Root = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Colors.statusBarColor}
        barStyle="light-content"
      />
      <Provider store={store}>
        <App />
      </Provider>
    </View>
  );
};

export default function setup() {
  // console.disableYellowBox = true;
  return Root;
}
