import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavigationOptions } from "./DefaultNavOptions";
import SettingsScreen, {
  settingsScreenOptions,
} from "../screens/SettingsScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import CurrentVersionScreen, {
  currentVersionScreenOptions,
} from "../screens/CurrentVersionScreen";

const SettingsStack = createStackNavigator();

export const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator screenOptions={defaultNavigationOptions}>
      <SettingsStack.Screen
        name="settings"
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
      <SettingsStack.Screen
        name="settingsprivacy"
        component={PrivacyScreen}
        options={{ headerTitle: "Privacy policy" }}
      />
      <SettingsStack.Screen
        name="settingscontact"
        component={ContactUsScreen}
        options={{ headerTitle: "Contact us" }}
      />
      <SettingsStack.Screen
        name="settingscurrentversion"
        component={CurrentVersionScreen}
        options={currentVersionScreenOptions}
      />
    </SettingsStack.Navigator>
  );
};
