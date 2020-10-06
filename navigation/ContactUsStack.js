import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavigationOptions } from "./DefaultNavOptions";
import ContactUsScreen from "../screens/ContactUsScreen";

const ContactUsStack = createStackNavigator();

export const ContactUsStackNavigator = () => {
  return (
    <ContactUsStack.Navigator screenOptions={defaultNavigationOptions}>
      <ContactUsStack.Screen name="contactus" component={ContactUsScreen} />
    </ContactUsStack.Navigator>
  );
};
