import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Colors } from "../constants/Colors";

import Text from "./Text";

const Error = ({ error, action }) => {
  const dispatch = useDispatch();
  const tryAgainPressedHandler = () => {
    dispatch(action());
  };
  return (
    <View style={styles.outerView}>
      <Text style={styles.errorText}>{error.slice(0, 50)}</Text>
      <Button
        onPress={tryAgainPressedHandler}
        color={Colors.secondary}
        mode="contained"
      >
        Try Again
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  outerView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("screen").height - 200,
  },
  errorText: {
    fontFamily: "RobotoBold",
    marginBottom: 20,
    fontSize: 16,
  },
});

export default Error;
