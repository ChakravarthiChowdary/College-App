import React, { useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";

import { Colors } from "../constants/Colors";
import TextInput from "../components/TextInput";

const ForgotPasswordScreen = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{ flex: 1, paddingTop: 20 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.OuterView}>
          <View style={styles.InnerView}>
            <View>
              <TextInput
                label="StudentID@vrsec.com"
                mode="outlined"
                style={{ backgroundColor: "#fff" }}
              />
            </View>
            <TouchableOpacity onPress={() => setShow(true)}>
              <View style={{ marginVertical: 20 }}>
                <TextInput
                  label="DOB"
                  value={date.toString().slice(0, 15)}
                  mode="outlined"
                  style={{ backgroundColor: "#fff" }}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
            <View>
              <TextInput
                label="Phone number"
                mode="outlined"
                style={{ backgroundColor: "#fff" }}
              />
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
                textColor={Colors.primary}
              />
            )}
            <View style={styles.ButtonView}>
              <Button mode="contained" color={Colors.secondary}>
                Request Password
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  OuterView: {
    flexDirection: "column",
    justifyContent: "center",
    height: Dimensions.get("screen").height - 150,
    margin: 10,
  },
  InnerView: {
    elevation: 5,
    shadowColor: "#ccc",
    shadowOpacity: 5,
    backgroundColor: "#fff",
    padding: 10,
  },
  ButtonView: {
    marginVertical: 20,
  },
  getResultsErrorText: {
    color: Colors.secondary,
  },
  getResultsErrorView: {
    marginTop: 10,
  },
  getResultsLoadingView: {
    margin: 20,
  },
});

export const forgotPasswordScreenOptions = {
  headerTitle: "Forgot Password ?",
};

export default ForgotPasswordScreen;
