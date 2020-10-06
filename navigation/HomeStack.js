import React, { Fragment } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import { defaultNavigationOptions } from "./DefaultNavOptions";
import HomeScreen, { homeScreenOptions } from "../screens/HomeScreen";
import { PrivacyStackNavigator } from "./PrivacyStack";
import { ContactUsStackNavigator } from "./ContactUsStack";
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const HomeStack = createStackNavigator();

export const HomeStackNavigator = () => {
  const authInfo = useSelector((state) => state.auth.authInfo);
  return (
    <HomeStack.Navigator screenOptions={defaultNavigationOptions}>
      <HomeStack.Screen
        name="homestack"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <HomeStack.Screen
        name="privacystack"
        component={PrivacyStackNavigator}
        options={{ headerTitle: "Privacy Policy" }}
      />
      <HomeStack.Screen
        name="contactstack"
        component={ContactUsStackNavigator}
        options={{ headerTitle: "Contact us" }}
      />
      {!authInfo && (
        <Fragment>
          <HomeStack.Screen
            name="homeloginscreen"
            component={LoginScreen}
            options={{ headerTitle: "Authenticate" }}
          />
          <HomeStack.Screen
            name="homeforgotpassword"
            component={ForgotPasswordScreen}
            options={{ headerTitle: "Forgot Password?" }}
          />
        </Fragment>
      )}
    </HomeStack.Navigator>
  );
};
