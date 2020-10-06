import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavigationOptions } from "./DefaultNavOptions";
import LoginScreen, { loginScreenOptions } from "../screens/LoginScreen";
import ForgotPasswordScreen, {
  forgotPasswordScreenOptions,
} from "../screens/ForgotPasswordScreen";
import { useSelector } from "react-redux";

const LoginStack = createStackNavigator();

export const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator screenOptions={defaultNavigationOptions}>
      <LoginStack.Screen
        name="loginstack"
        component={LoginScreen}
        options={loginScreenOptions}
      />
      <LoginStack.Screen
        name="forgotpassword"
        component={ForgotPasswordScreen}
        options={forgotPasswordScreenOptions}
      />
    </LoginStack.Navigator>
  );
};
