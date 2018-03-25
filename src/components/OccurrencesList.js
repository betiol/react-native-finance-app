import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { Icon, Card, Avatar, List, ListItem } from "react-native-elements";
import moment from "moment";
import Colors from "@shared/Colors";
import { ptBr } from "moment/locale/pt-br";
import Swipeable from "react-native-swipeable";
import Ionicons from "react-native-vector-icons/Ionicons";
import ButtonsWithIcon from "@components/ButtonsWithIcon";
import { connect } from "react-redux";

const OccurrenceList = props => {
  console.log(props.press);
  return (
    <View>
      <View style={styles.containerTextDate}>
        <Text style={styles.textDate}>
          {moment(props.date).format("DD MMMM")}
        </Text>
      </View>
      {props.occurrence.map(o => {
        const rightButtons = [
          <ButtonsWithIcon
            size={30}
            color={"#fff"}
            backgroundColor={Colors.blueColor}
            name={"md-create"}
          />,
          <ButtonsWithIcon
            size={30}
            press={() => props.press(o.id)}
            color={"#fff"}
            backgroundColor={Colors.redColor}
            name={"md-trash"}
          />
        ];
        return (
          <Swipeable rightButtonWidth={100} rightButtons={rightButtons}>
            <View>
              <ListItem
                subtitleStyle={{ color: "#bdc3c7" }}
                containerStyle={{ paddingTop: 5, borderBottomColor: "#ccc" }}
                key={o.id}
                title={o.description || o.category.name}
                subtitle={o.category.name}
                rightIcon={
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color:
                          o.type.name == "Receita"
                            ? Colors.primaryColor
                            : Colors.redColor
                      }}
                    >
                      R$ {o.amount || 0}
                    </Text>
                    <Text style={{ textAlign: "right" }}>
                      {o.type.name == "Receita" ? "recebido" : "pago"}
                    </Text>
                  </View>
                }
              />
            </View>
          </Swipeable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  textDate: {
    padding: 5,
    fontSize: 12,
    color: "#95a5a6"
  },
  containerTextDate: {
    borderBottomWidth: 1,
    borderColor: "#ccc"
  }
});

export default OccurrenceList;
