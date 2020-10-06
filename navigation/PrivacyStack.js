import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavigationOptions } from "./DefaultNavOptions";
import PrivacyScreen from "../screens/PrivacyScreen";

const PrivacyStack = createStackNavigator();

export const PrivacyStackNavigator = () => {
  return (
    <PrivacyStack.Navigator screenOptions={defaultNavigationOptions}>
      <PrivacyStack.Screen name="privacy" component={PrivacyScreen} />
    </PrivacyStack.Navigator>
  );
};
