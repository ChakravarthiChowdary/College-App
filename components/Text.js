import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const TextComponent = (props) => {
  return (
    <Text {...props} style={{ ...styles.textStyle, ...props.style }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Roboto",
  },
});

export default TextComponent;
