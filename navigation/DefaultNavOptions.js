import { Platform } from "react-native";

import { Colors } from "../constants/Colors";

export const defaultNavigationOptions = {
  headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primary,
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "#fff",
  },
};
