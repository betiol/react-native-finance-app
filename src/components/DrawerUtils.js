import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import Colors from "@shared/Colors";

const RenderDrawerMenu = navigation => {
  return (
    <View style={{ marginLeft: 10 }}>
      <Icon
        name="menu"
        component={TouchableOpacity}
        color={Colors.lighterText}
        size={32}
        onPress={() => navigation.navigate("DrawerToggle")}
      />
    </View>
  );
};

export { RenderDrawerMenu };
