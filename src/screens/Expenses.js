import React from "react";
import { View, Text, Dimensions, TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";
import t from "tcomb-form-native";
import { requestExpenseOccurrence } from "@actions/occurrence";
import { requestCategories } from "@actions/category";
import { requestAccounts } from "@actions/account";
import _ from "lodash";
import moment from "moment";
import { Icon, Button } from "react-native-elements";
import Colors from "@shared/Colors";
const { width, height } = Dimensions.get("window");
import { OutlinedButtonPrimary, NoOutlineButton } from "@components/Button";
import maskedInputTemplate from "@components/maskedInputTemplate";
import { requestTotalValue } from "@actions/account";
var Form = t.form.Form;

const amountStyle = _.cloneDeep(t.form.Form.stylesheet);
amountStyle.textbox.normal.fontSize = 50;
amountStyle.textbox.error.fontSize = 50;
amountStyle.textbox.normal.color = "#fff";
amountStyle.textbox.normal.borderWidth = 0;
amountStyle.textbox.normal.height = 120;
amountStyle.textbox.normal.width = width;
amountStyle.textbox.normal.textAlign = "right";
amountStyle.textbox.error.borderWidth = 0;
amountStyle.textbox.error.height = 120;
amountStyle.textbox.error.width = width;
amountStyle.textbox.error.textAlign = "right";
amountStyle.textbox.error.color = "#fff";

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

const dateFormat = (format, date) => {
  return moment(date).format(format);
};

const effectiveDate = {
  label: "Data",
  mode: "date",
  error: "Data é obrigatório",
  config: {
    format: date => dateFormat("DD/MM/YYYY", date)
  }
};

function incomesTemplate(locals) {
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: Colors.redColor,
          height: height / 4
        }}
      >
        {locals.inputs.amount}
      </View>
      <View style={{ padding: 10 }}>
        {locals.inputs.date}
        {locals.inputs.categoryId}
        {locals.inputs.accountId}
        {locals.inputs.description}
      </View>
    </View>
  );
}

class Expenses extends React.Component {
  static navigationOptions = {
    headerStyle: {
      position: "absolute",
      zIndex: -1,
      top: 0,
      left: 0,
      right: 0,
      elevation: 0,
      borderBottomWidth: 0
    }
  };

  componentDidMount = async () => {
    await this.props.requestAccounts();
    await this.props.requestCategories();
  };

  handleExpense = async () => {
    let value = this.refs.form.getValue();
    let { amount, date, accountId, categoryId, description } = value;
    let amountFormatted = amount.replace("R$", "");
    let expenseId = this.props.typeOccurrences.filter(
      type => type.name === "Despesa"
    )[0].id;
    if (value) {
      let occurrence = {
        amount: amountFormatted,
        date,
        account_id: accountId,
        category_id: categoryId,
        type_id: expenseId,
        description
      };

      await this.props.requestExpenseOccurrence(occurrence);
      this.goBack();
    }
  };

  goBack = async () => {
    this.props.navigation.navigate("Dashboard", {
      onGoBack: () => this.props.requestTotalValue()
    });
  };

  render() {
    const formOptions = {
      stylesheet: stylesheet,
      template: incomesTemplate,
      fields: {
        date: effectiveDate,
        amount: {
          auto: "none",
          editable: !loading,
          keyboardType: "phone-pad",
          placeholder: "0,00",
          stylesheet: amountStyle,
          template: maskedInputTemplate,
          config: {
            type: "money"
          },
          placeholderTextColor: "#fff"
        },
        categoryId: {
          label: "Categoria",
          editable: !loading,
          nullOption: { value: "", text: "Selecionar Categoria" }
        },
        accountId: {
          label: "Conta/Cartão",
          editable: !loading,
          nullOption: { value: "", text: "Selecionar Conta" }
        },

        description: {
          editable: !loading,
          label: "Descrição"
        }
      }
    };
    let { loading } = this.props;
    let accountsData = (this.props.accounts || []).reduce((acc, row) => {
      acc[row.id] = row.name;
      return acc;
    }, {});

    let categoriesData = (this.props.categories || []).reduce((acc, row) => {
      acc[row.id] = row.name;
      return acc;
    }, {});

    let Accounts = t.enums(accountsData, "Accounts");
    let Categories = t.enums(categoriesData, "Categories");
    var ExpensesForm = t.struct({
      amount: t.String,
      date: t.Date,
      accountId: Accounts,
      categoryId: Categories,
      description: t.maybe(t.String)
    });
    return (
      <View style={{ flex: 2, backgroundColor: "#fff" }}>
        <Form ref="form" options={formOptions} type={ExpensesForm} />
        <View style={styles.buttons}>
          <Button
            medium
            loading={loading}
            onPress={this.handleExpense}
            backgroundColor={Colors.redColor}
            iconRight={{ name: "check", size: 30 }}
          />
        </View>
      </View>
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

const select = ({ occurrence, account, category, typeOccurrence }) => {
  let { loading } = occurrence;
  let { accounts } = account;
  let { categories } = category;
  let { typeOccurrences } = typeOccurrence;
  return { loading, accounts, categories, typeOccurrences };
};

export default connect(select, {
  requestExpenseOccurrence,
  requestAccounts,
  requestCategories,
  requestTotalValue
})(Expenses);
