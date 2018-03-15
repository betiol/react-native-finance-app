import React, { Component } from "react";
import { AppState, StyleSheet, Text, View, StatusBar } from "react-native";
import { Button } from "react-native-elements";

import { LoggedInRoutes, LoggedOutRoutes } from "./Routes";

import Api from "@shared/Api";
import Colors from "@shared/Colors";
import UserStorage from "@shared/UserStorage";

class App extends Component {
  state = {
    user: null,
    loaded: false
  };

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    StatusBar.setBarStyle("light-content");
    this.loadUser();
  }

  async loadUser() {
    try {
      let user = await UserStorage.getUser();
      this.setState({
        loaded: true,
        user
      });
    } catch (e) {
      this.setState({
        loaded: true
      });
    }
  }

  onUserUpdate(user) {
    this.setState({
      user
    });
    UserStorage.updateUser(user);
  }

  render() {
    let { user, loaded } = this.state;
    if (!loaded) {
      return null;
    }

    let Routes = LoggedInRoutes;
    if (!user) {
      Routes = LoggedOutRoutes;
    }
    return (
      <Routes
        initialRouteName="Login"
        screenProps={{
          user,
          onUserUpdate: this.onUserUpdate.bind(this)
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
