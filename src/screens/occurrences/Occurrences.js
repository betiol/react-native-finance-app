import React from "react";
import { RenderDrawerMenu } from "@components/DrawerUtils";
import LoadingSpinner from "@components/LoadingSpinner";
import { fetchOccurrences, deleteOccurrence } from "@actions/occurrence";
import { Icon, Card, Avatar, List, ListItem } from "react-native-elements";
import Colors from "@shared/Colors";
import moment from "moment";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import OccurrencesList from "@components/OccurrencesList";
import _ from "lodash";
import { ptBr } from "moment/locale/pt-br";

moment.locale(ptBr);

class Occurrences extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Lançamentos",
    drawerLabel: "Lançamentos",
    drawerIcon: ({ tintColor }) => (
      <Icon name="trending-up" color={tintColor} />
    ),
    headerLeft: RenderDrawerMenu(navigation),
    headerStyle: {
      position: "absolute",
      backgroundColor: Colors.primaryColor,
      top: 0,
      left: 0,
      right: 0,
      elevation: 0,
      borderBottomWidth: 0
    }
  });

  state = {
    refreshing: false
  };

  componentDidMount = () => {
    this.fetchOccurrences();
  };

  fetchOccurrences = () => {
    this.props.fetchOccurrences();
  };

  delete = async id => {
    await this.props.deleteOccurrence(id);
    await this.fetchOccurrences();
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.requestTotalValue();
    this.setState({ refreshing: false });
  };

  renderList = () => {
    let { occurrences } = this.props;
    var groups = _.groupBy(occurrences, function(date) {
      return moment(date.date).format();
    });
    var result = _.map(groups, function(group, day) {
      return {
        day: day,
        occurrence: group
      };
    });
    return result.map((r, idx) => {
      console.log("r", r);
      return (
        <OccurrencesList
          press={id => this.delete(id)}
          key={idx}
          date={r.day}
          occurrence={r.occurrence}
        />
      );
    });
  };

  render() {
    let { loading } = this.props;

    if (loading) {
      return <ActivityIndicator color={Colors.primaryColor} size={"large"} />;
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        contentContainerStyle={{ flex: 1, backgroundColor: "#fff" }}
      >
        <View style={{ paddingTop: 40 }}>
          <List>{this.renderList()}</List>
        </View>
      </ScrollView>
    );
  }
}

const select = ({ occurrence }) => {
  let { loading, deleteLoading, occurrences } = occurrence;
  return { loading, occurrences, deleteLoading };
};

export default connect(select, { fetchOccurrences, deleteOccurrence })(
  Occurrences
);
