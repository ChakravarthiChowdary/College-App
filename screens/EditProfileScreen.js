import React from "react";
import { View } from "react-native";

import Text from "../components/Text";

const EditProfileScreen = () => {
  return (
    <View>
      <Text>In Edit Profile Screen</Text>
    </View>
  );
};

export const editProfileScreenOptions = (navData) => {
  return {
    headerTitle: "Edit Profile",
  };
};

export default EditProfileScreen;
