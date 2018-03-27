import { StackNavigator } from "react-navigation";
import Colors from "@shared/Colors";

const RouteConfigMap = {
  Home: {
    path: "/",
    screen: require("./Home").default,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    path: "/login",
    screen: require("@screens/Login").default,
    mode: "modal",
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Register: {
    path: "/register",
    screen: require("@screens/Register").default,
    mode: "modal",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
};

const StackConfig = {
  initialRouteName: "Home",
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: Colors.lighterText,
    headerStyle: {
      backgroundColor: Colors.primaryColor
    }
  }
};

const LoggedInRoutes = StackNavigator(RouteConfigMap, StackConfig);
const LoggedOutRoutes = StackNavigator(RouteConfigMap, {
  ...StackConfig,
  initialRouteName: "Login"
});

export { LoggedInRoutes, LoggedOutRoutes };
