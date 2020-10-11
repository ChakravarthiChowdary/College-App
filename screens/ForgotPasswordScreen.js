import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import { Colors } from "../constants/Colors";
import TextInput from "../components/TextInput";
import Text from "../components/Text";
import SnackBar from "../components/SnackBar";
import {
  CLEAR_FORGOT_PASSWORD,
  forgotPassword,
} from "../store/actions/authActions";

const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();
  //Component level state
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [requestClicked, setRequestClicked] = useState(false);
  //Redux level state
  const { loading, forgotSuccess, forgotError } = useSelector(
    (state) => state.auth
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const requestPasswordPressedHandler = () => {
    Keyboard.dismiss();
    setRequestClicked(true);
    if (studentId !== "" && phone !== "") {
      if (studentId.length === 20) {
        const studentInfo = {
          id: studentId.split("@")[0],
          dob: date.toString(),
          phone: phone,
        };
        dispatch(forgotPassword(studentInfo));
      } else {
        setVisible(true);
        setError("Incorrect student mail id");
      }
    } else {
      setVisible(true);
      setError("All fields are mandatory !");
    }
  };

  const focusHandler = () => {
    setError(null);
    setVisible(false);
  };

  useEffect(() => {
    if (requestClicked) {
      if (forgotError) {
        setVisible(true);
        setError(forgotError.message);
      } else if (forgotSuccess) {
        setVisible(true);
        setDate(new Date());
        setPhone("");
        setStudentId("");
        setError(forgotSuccess);
      } else {
        setVisible(false);
        setError(null);
      }
      setRequestClicked(false);
    }
  }, [forgotError, forgotSuccess]);

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
                    value={studentId}
                    onChangeText={(text) => setStudentId(text)}
                    onFocus={focusHandler}
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
                      onFocus={focusHandler}
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
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    onFocus={focusHandler}
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
                  <Button
                    mode="contained"
                    color={Colors.secondary}
                    onPress={requestPasswordPressedHandler}
                    loading={loading}
                  >
                    Request Password
                  </Button>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
        {error && (
          <SnackBar
            visible={visible}
            onDismissSnackBar={() => setVisible(false)}
            message={error}
            color={forgotSuccess ? Colors.primary : Colors.secondary}
            styles={{ marginBottom: 10 }}
          />
        )}
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
