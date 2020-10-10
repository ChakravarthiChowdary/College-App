import React, { useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Platform,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Divider } from "react-native-paper";

import { Colors } from "../constants/Colors";
import TextInput from "../components/TextInput";
import Text from "../components/Text";

const ForgotPasswordScreen = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <ImageBackground
      style={styles.image}
      source={require("../assets/backgroundimage.png")}
    >
      <View style={styles.backgroundBlack}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1, height: "100%" }}>
            <KeyboardAvoidingView behavior="position" style={styles.OuterView}>
              <Text style={styles.forgotPassword}>Get Password</Text>
              <View style={styles.dividerView}>
                <Divider style={styles.divider} />
              </View>
              <View style={styles.InnerView}>
                <View style={styles.inputInnerView}>
                  <TextInput
                    placeholder="StudentID@vrsec.com"
                    mode="flat"
                    style={styles.inputText}
                    textcolor="#fff"
                    placeholderColor="#fff"
                    colorprimary="#fff"
                  />
                </View>
                <TouchableOpacity onPress={() => setShow(true)}>
                  <View
                    style={{ marginVertical: 20, ...styles.inputInnerView }}
                  >
                    <TextInput
                      label="DOB"
                      value={date.toString().slice(0, 15)}
                      mode="flat"
                      style={styles.inputText}
                      textcolor="#fff"
                      placeholderColor="#fff"
                      colorprimary="#fff"
                      editable={false}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.inputInnerView}>
                  <TextInput
                    label="Phone number"
                    mode="flat"
                    style={styles.inputText}
                    textcolor="#fff"
                    placeholderColor="#fff"
                    colorprimary="#fff"
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
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
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
    padding: 10,
  },
  inputInnerView: { borderBottomWidth: 1, borderBottomColor: "#fff" },
  inputText: { backgroundColor: "transparent", fontSize: 16 },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
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
  backgroundBlack: { height: "100%", backgroundColor: "rgba(0,0,0,0.6)" },
  divider: { borderWidth: 1, borderColor: "#fff" },
  forgotPassword: {
    color: "#fff",
    fontSize: 23,
    textAlign: "center",
    marginBottom: 20,
  },
  dividerView: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: Dimensions.get("screen").width / 3,
  },
});

export const forgotPasswordScreenOptions = {
  headerTitle: "Forgot Password ?",
};

export default ForgotPasswordScreen;
