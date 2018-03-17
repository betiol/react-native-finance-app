import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { DrawerNavigator, DrawerItems } from "react-navigation";
import { Icon, List, ListItem, Text } from "react-native-elements";

import Colors from "@shared/Colors";

const CustomDrawerContentComponent = ({
  inactiveTintColor,
  itemsContainerStyle,
  ...props
}) => {
  const logout = () => {
    props.navigation.navigate("Login");
    props.screenProps.onUserUpdate && props.screenProps.onUserUpdate(null);
  };
  const { user } = props.screenProps;
  return (
    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, flex: 5 }}>
      <View style={styles.drawerHeader}>
        <View style={{ justifyContent: "center", marginHorizontal: 8 }}>
          <Image
            source={{
              uri:
                "https://scontent.fcgb2-1.fna.fbcdn.net/v/t1.0-9/18194963_1267364966693340_8092883810495307207_n.jpg?oh=9ed33c776fe500aceeb875142d3c1d20&oe=5AFFFCB3"
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30
            }}
          />
        </View>
        <View style={{ justifyContent: "center", marginHorizontal: 8 }}>
          <Text h4 style={styles.drawerHeaderText}>
            {user.username}
          </Text>
          <Text style={styles.drawerHeaderText}>{user.email}</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <DrawerItems {...props} />
        <View style={[styles.container, itemsContainerStyle]}>
          <TouchableOpacity onPress={logout}>
            <View style={styles.item}>
              <View style={styles.icon}>
                <Icon name="exit-to-app" color={Colors.darkText} />
              </View>
              <Text style={[styles.label, { color: inactiveTintColor }]}>
                Sair
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </List>
  );
};

export default DrawerNavigator(
  {
    Dashboard: { screen: require("@screens").default },
    Occurrences: { screen: require("@screens/Occurrences").default }
  },
  {
    initialRouteName: "Dashboard",
    headerMode: "screen",
    contentOptions: {
      activeTintColor: Colors.primaryColor
    },
    drawerBackgroundColor: Colors.primaryColor,
    contentComponent: CustomDrawerContentComponent
  }
);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginHorizontal: 16,
    width: 24,
    alignItems: "center"
  },
  label: {
    margin: 16,
    fontWeight: "bold",
    color: Colors.darkText
  },
  drawerHeader: {
    height: 120,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row"
  },
  drawerHeaderText: {
    color: Colors.lighterText
  }
});
