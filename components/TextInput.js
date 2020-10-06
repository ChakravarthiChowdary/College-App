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
          primary: Colors.primary,
          underlineColor: "transparent",
        },
      }}
    />
  );
};

export default TextInputComponent;
