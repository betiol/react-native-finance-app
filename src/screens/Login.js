import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  AsyncStorage,
  TouchableOpacity,
  Alert
} from "react-native";
import { SocialIcon, Header, Button } from "react-native-elements";
import { StackNavigator } from "react-navigation";

import t from "tcomb-form-native";
import cloneDeep from "lodash/fp/cloneDeep";

import Api from "@shared/Api";
import Colors from "@shared/Colors";
import { OutlinedButtonPrimary, NoOutlineButton } from "@components/Button";
import LoadingSpinner from "@components/LoadingSpinner";

const Form = t.form.Form;
const stylesheet = cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.backgroundColor = Colors.lighterText;
stylesheet.textbox.normal.color = Colors.primaryColor;
stylesheet.textbox.error.backgroundColor = Colors.lighterText;
stylesheet.textbox.error.color = Colors.errorColor;
stylesheet.textbox.normal.borderWidth = StyleSheet.hairlineWidth;
stylesheet.textbox.error.borderWidth = StyleSheet.hairlineWidth;

const LoginForm = t.struct({
  email: t.String,
  password: t.String
});

export class Login extends Component {
  static navigationOptions = {
    title: "Login",
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      loginForm: {
        email: {
          value: "",
          hasError: false,
          pristine: true,
          error: null
        },
        password: {
          value: "",
          hasError: false,
          pristine: true,
          error: null
        }
      },
      isFetching: false,
      error: null
    };
  }

  componentDidMount() {
    // TODO: Focus on email input
  }

  updateFormState(field, value, error) {
    let { loginForm } = this.state;
    this.setState({
      loginForm: {
        ...loginForm,
        [field]: {
          pristine: false,
          hasError: !!error,
          value,
          error
        }
      },
      error: null
    });
  }

  onChangeForm = value => {
    let { loginForm } = this.state;
    if (value.email !== loginForm.email.value) {
      let error = null;
      if (value.email.length === 0) {
        error = "Digite um email válido";
      }

      this.updateFormState("email", value.email, error);
    }

    if (value.password !== loginForm.password.value) {
      let error = null;
      if (value.password.length === 0) {
        error = "Digite sua senha";
      }

      this.updateFormState("password", value.password, error);
    }
  };

  goBack() {
    this.props.navigation.goBack();
  }

  login = async () => {
    let { loginForm } = this.state;
    if (
      !loginForm.email.pristine &&
      !loginForm.password.pristine &&
      !loginForm.email.hasError &&
      !loginForm.password.hasError
    ) {
      this.setState({ isFetching: true });

      try {
        let userForm = {
          email: loginForm.email.value,
          password: loginForm.password.value
        };

        let user = await Api.login(userForm);

        this.props.screenProps.onUserUpdate &&
          this.props.screenProps.onUserUpdate(user);

        this.goBack();
      } catch (error) {
        this.setState({
          error
        });
      }

      this.setState({ isFetching: false });
    } else {
      Alert.alert("Atenção", "Preencha email e senha");
    }
  };

  render() {
    let { loginForm, isFetching } = this.state;

    const options = {
      stylesheet,
      auto: "placeholders",
      fields: {
        email: {
          keyboardType: "email-address",
          editable: !isFetching,
          hasError: loginForm.email.hasError,
          error: loginForm.email.error,
          value: loginForm.email.value,
          autoCapitalize: "none",
          autoCorrect: false,
          clearButtonMode: "always",
          placeholder: "E-mail"
        },
        password: {
          placeholder: "Senha",
          secureTextEntry: true,
          editable: !isFetching,
          hasError: loginForm.password.hasError,
          error: loginForm.password.error,
          value: loginForm.password.value
        }
      }
    };

    const formValue = {
      email: loginForm.email.value,
      password: loginForm.password.value
    };

    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            resizeMode="contain"
            source={require("../resources/logo.png")}
            style={{ flex: 3, height: 300, width: 300 }}
          />
        </View>
        <View style={styles.formContainer}>
          <Form
            ref="form"
            type={LoginForm}
            options={options}
            value={formValue}
            onChange={this.onChangeForm}
          />
          <Text
            onPress={() => this.props.navigation.navigate("Register")}
            style={{ color: "#fff", textAlign: "center" }}
          >
            Ainda não tem conta? Crie aqui!
          </Text>
          {isFetching && (
            <LoadingSpinner
              color={"#fff"}
              size={80}
              message="Autenticando..."
            />
          )}
        </View>
        {this.state.error && (
          <Text style={styles.errorMessage}>{this.state.error.message}</Text>
        )}
        {!isFetching && (
          <View style={styles.buttons}>
            <OutlinedButtonPrimary title="Entrar" onPress={this.login} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.primaryColor
  },
  imgContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  formContainer: {
    flex: 2,
    marginHorizontal: 16,
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  forgotPasswordText: {
    color: Colors.lighterText,
    fontSize: 12,
    alignSelf: "center"
  },
  errorMessage: {
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.errorColor
  },
  buttons: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-end",
    marginBottom: 16
  }
});

export default Login;
