import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Icon, Card, Avatar, List, ListItem } from "react-native-elements";
import moment from "moment";
import Colors from "@shared/Colors";
import { ptBr } from "moment/locale/pt-br";

const OccurrenceList = props => {
  return (
    <View>
      <View style={styles.containerTextDate}>
        <Text style={styles.textDate}>
          {moment(props.date).format("DD MMMM")}
        </Text>
      </View>
      {props.occurrence.map(o => {
        return (
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
                  R$ {o.amount.toFixed(2).replace(".", ",") || 0}
                </Text>
                <Text style={{ textAlign: "right" }}>
                  {o.type.name == "Receita" ? "recebido" : "pago"}
                </Text>
              </View>
            }
          />
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
