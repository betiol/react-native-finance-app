import React from "react";

import { View, Text } from "react-native";

import { List, ListItem, Icon } from "react-native-elements";
import Colors from "@shared/Colors";
import { RenderDrawerMenu } from "@components/DrawerUtils";
import { StyledContainerView } from "@shared/Styled";
const data = [
  { name: "Contas", press: "Accounts", icon: "account-balance" },
  { name: "Categorias", press: "Categories", icon: "folder" }
];

class Settings extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Configurações",
    drawerIcon: ({ tintColor }) => <Icon name="settings" color={tintColor} />,
    headerLeft: RenderDrawerMenu(navigation),
    headerStyle: { backgroundColor: Colors.primaryColor }
  });

  renderList = () => {
    return data.map((list, idx) => {
      return (
        <ListItem
          hideChevron
          containerStyle={styles.containerStyle}
          key={idx}
          title={list.name}
          leftIcon={{ name: list.icon }}
          onPress={() => this.props.navigation.navigate(list.press)}
        />
      );
    });
  };

  render() {
    return (
      <StyledContainerView style={{ padding: 10 }}>
        <List containerStyle={styles.containerStyle}>{this.renderList()}</List>
      </StyledContainerView>
    );
  }
}

const styles = {
  containerStyle: {
    borderTopColor: Colors.grayColor,
    borderColor: Colors.grayColor,
    borderBottomColor: Colors.grayColor
  }
};

export default Settings;
