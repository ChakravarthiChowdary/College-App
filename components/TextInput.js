import React from "react";
import { TextInput } from "react-native-paper";

import { Colors } from "../constants/Colors";

const TextInputComponent = (props) => {
  return (
    <TextInput
      mode="outlined"
      label={props.label}
      {...props}
      theme={{
        colors: {
          primary: props.colorprimary ? props.colorprimary : Colors.primary,
          underlineColor: "transparent",
          text: props.textcolor ? props.textcolor : "#000",
          placeholder: props.placeholderColor ? props.placeholderColor : "#000",
          accent: "#fff",
        },
        roundness: 5,
      }}
      onFocus={props.onFocus}
    />
  );
};

export default TextInputComponent;
