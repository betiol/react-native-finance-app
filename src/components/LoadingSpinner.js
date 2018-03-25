"use strict";

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Spinner from "react-native-spinkit";

import Colors from "@shared/Colors";

type Props = {
  message?: string,
  size?: number,
  isVisible?: boolean,
  color?: string
};

export default class LoadingSpinner extends Component {
  props: Props;

  render() {
    return (
      <View style={styles.spinner}>
        <Spinner
          size={this.props.size || 80}
          type={"Wave"}
          color={this.props.color}
        />
        <Text style={{ color: Colors.lighterText }}>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center"
  }
});
