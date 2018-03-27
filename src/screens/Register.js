import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "@shared/Colors";
import { StyledContainerView } from "@shared/Styled";
import _ from "lodash";
import t from "tcomb-form-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import maskedInputTemplate from "@components/maskedInputTemplate";
import Api from "@shared/Api";
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
    username: {
      label: "Nome"
    },
    email: {
      label: "E-mail",
      autoCapitalize: "none",
      keyboardType: "email-address"
    },
    password: {
      label: "Senha",
      secureTextEntry: true
    }
  }
};

class Register extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Registrar",
    headerStyle: { backgroundColor: Colors.primaryColor }
  });

  handleRegister = async () => {
    let value = this.refs.form.getValue();
    let { username, password, email } = value;

    let account = {
      username,
      email,
      password
    };
    let register = await Api.register(account);
    this.props.screenProps.onUserUpdate &&
      this.props.screenProps.onUserUpdate(register);
    // this.props.navigation.navigate("Dashboard");
  };

  render() {
    var RegisterForm = t.struct({
      username: t.String,
      email: t.String,
      password: t.String
    });
    return (
      <StyledContainerView style={{ padding: 20 }}>
        <Form ref="form" options={formOptions} type={RegisterForm} />

        <View style={styles.buttons}>
          <Button
            medium
            onPress={this.handleRegister}
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

export default Register;
