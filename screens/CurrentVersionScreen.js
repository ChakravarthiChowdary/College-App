import React from "react";
import { View } from "react-native";

import Text from "../components/Text";

const CurrentVersionScreen = () => {
  return (
    <View>
      <Text>In Current version Screen</Text>
    </View>
  );
};

export const currentVersionScreenOptions = (navData) => {
  return {
    headerTitle: "What's new?",
  };
};

export default CurrentVersionScreen;
