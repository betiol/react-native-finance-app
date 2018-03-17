import React from "react";
import { RenderDrawerMenu } from "@components/DrawerUtils";
import LoadingSpinner from "@components/LoadingSpinner";
import { fetchOccurrences } from "@actions/occurrence";
import { Icon, Card, Avatar, List, ListItem } from "react-native-elements";
import Colors from "@shared/Colors";

import { View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";

class Occurrences extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Lançamentos",
    drawerLabel: "Lançamentos",
    drawerIcon: ({ tintColor }) => (
      <Icon name="trending-up" color={tintColor} />
    ),
    headerLeft: RenderDrawerMenu(navigation)
  });

  componentDidMount = async () => {
    await this.props.fetchOccurrences();
  };

  renderList = () => {
    let { occurrences } = this.props;
    return (occurrences || []).map((o, i) => {
      return (
        <ListItem
          key={i}
          title={o.description || o.category.name}
          subtitle={o.category.name || ""}
          rightIcon={
            <View>
              <Text>{o.amount}</Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: o.status ? Colors.primaryColor : Colors.redColor
                }}
              >
                {o.status ? "recebido" : "pago"}
              </Text>
            </View>
          }
        />
      );
    });
  };

  render() {
    let { loading } = this.props;
    {
      loading && (
        <LoadingSpinner size={80} message="Carregando..." isVisible={loading} />
      );
    }
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ paddingTop: 40 }}>
          <List>{this.renderList()}</List>
        </View>
      </ScrollView>
    );
  }
}

const select = ({ occurrence }) => {
  let { loading, occurrences } = occurrence;
  return { loading, occurrences };
};

export default connect(select, { fetchOccurrences })(Occurrences);
