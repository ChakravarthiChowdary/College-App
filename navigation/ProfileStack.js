import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultNavigationOptions } from "./DefaultNavOptions";
import ProfileScreen, { profileScreenOptions } from "../screens/ProfileScreen";
import EditProfileScreen, {
  editProfileScreenOptions,
} from "../screens/EditProfileScreen";

const ProfileStack = createStackNavigator();

export const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={defaultNavigationOptions}>
      <ProfileStack.Screen
        name="profile"
        component={ProfileScreen}
        options={profileScreenOptions}
      />
      <ProfileStack.Screen
        name="editprofile"
        component={EditProfileScreen}
        options={editProfileScreenOptions}
      />
    </ProfileStack.Navigator>
  );
};
