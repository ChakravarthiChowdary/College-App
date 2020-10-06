import React from "react";
import { Dimensions } from "react-native";
import { Snackbar } from "react-native-paper";

import { Colors } from "../constants/Colors";

const SnackBar = ({ message, onDismissSnackBar, visible, styles }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      duration={3000}
      action={{
        label: "Close",
        onPress: () => onDismissSnackBar(),
      }}
      style={{
        marginBottom: Dimensions.get("screen").height / 11,
        ...styles,
        backgroundColor: Colors.secondary,
      }}
      theme={{ colors: { accent: "white" } }}
    >
      {message}
    </Snackbar>
  );
};

export default SnackBar;
