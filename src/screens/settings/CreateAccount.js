import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "@shared/Colors";
import { StyledContainerView } from "@shared/Styled";
import _ from "lodash";
import t from "tcomb-form-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { requestAccountType, handleAccountCreate } from "@actions/account";
import maskedInputTemplate from "@components/maskedInputTemplate";

var Form = t.form.Form;

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.normal.borderBottomWidth = 1;
stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.marginBottom = 0;
stylesheet.textbox.normal.height = 34;
stylesheet.controlLabel.normal.fontWeight = "normal";
stylesheet.controlLabel.normal.fontSize = 15;
stylesheet.controlLabel.normal.color = Colors.terciaryColor;
stylesheet.controlLabel.normal.marginBottom = 0;
stylesheet.textboxView.normal.borderRadius = 2;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderColor = "#ccc";
stylesheet.textboxView.error.borderColor = Colors.errorColor;
stylesheet.dateValue.normal.borderColor = "#ccc";
stylesheet.dateValue.normal.alignItems = "center";
stylesheet.dateValue.normal.justifyContent = "center";
stylesheet.dateValue.normal.borderRadius = 4;
stylesheet.dateValue.normal.height = 34;
stylesheet.dateValue.normal.borderBottomWidth = 1;
stylesheet.dateValue.normal.fontSize = 15;

const formOptions = {
  stylesheet: stylesheet,
  fields: {
    amount: {
      auto: "none",
      keyboardType: "phone-pad",
      placeholder: "0,00",
      template: maskedInputTemplate,
      config: {
        type: "money"
      },
      placeholderTextColor: "#fff"
    },
    accountType: {
      label: "Tipo da Conta",
      nullOption: { value: "", text: "Selecionar Tipo da Conta" }
    },
    description: {
      label: "Descrição"
    },
    amount: {
      label: "Valor Inicial"
    }
  }
};

class CreateAccount extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Criar Nova Conta",
    headerStyle: { backgroundColor: Colors.primaryColor }
  });

  componentDidMount = async () => {
    await this.props.requestAccountType();
  };

  handleAccount = async () => {
    let value = this.refs.form.getValue();
    let { description, name, accountType, amount } = value;

    let account = {
      description,
      name,
      account_types_id: accountType,
      amount
    };
    await this.props.handleAccountCreate(account);
    this.props.navigation.navigate("Accounts");
  };

  render() {
    let accountsData = (this.props.accountTypes || []).reduce((acc, row) => {
      console.log(row);
      acc[row.id] = row.name;
      return acc;
    }, {});
    let Accounts = t.enums(accountsData, "Accounts");
    console.log(accountsData);
    var AccountForm = t.struct({
      accountType: Accounts,
      name: t.String,
      description: t.String,
      amount: t.String
    });
    return (
      <StyledContainerView style={{ padding: 20 }}>
        <Form ref="form" options={formOptions} type={AccountForm} />
        <View style={styles.buttons}>
          <Button
            medium
            loading={this.props.isFetching}
            onPress={this.handleAccount}
            backgroundColor={Colors.primaryColor}
            iconRight={{ name: "check", size: 30 }}
          />
        </View>
      </StyledContainerView>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-end",
    marginBottom: 16
  }
});

const select = ({ account }) => {
  let { isFetching, accountTypes } = account;
  return { isFetching, accountTypes };
};

export default connect(select, { requestAccountType, handleAccountCreate })(
  CreateAccount
);
