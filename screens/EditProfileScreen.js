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
import { changeProfile, CLEAR_ERROR_STATE } from "../store/actions/authActions";
import SnackBar from "../components/SnackBar";

const EditProfileScreen = () => {
  const dispatch = useDispatch();
  //Redux level state.
  const studentInfo = useSelector((state) =>
    state.auth.studentInfo ? state.auth.studentInfo : {}
  );
  const { loading, error } = useSelector((state) => state.auth);
  //Component level state.
  const [date, setDate] = useState(new Date(studentInfo.dob));
  const [show, setShow] = useState(false);
  const [firstname, setFirstname] = useState(studentInfo.firstname);
  const [lastname, setLastname] = useState(studentInfo.lastname);
  const [phone, setPhone] = useState(studentInfo.phone);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const saveChangesHandler = () => {
    Keyboard.dismiss();
    if (firstname !== "" && lastname !== "" && phone !== "") {
      if (phone.toString().length === 10) {
        if (
          firstname === studentInfo.firstname &&
          lastname === studentInfo.lastname &&
          phone.toString() === studentInfo.phone.toString() &&
          date.toString() === new Date(studentInfo.dob).toString()
        ) {
          setVisible(true);
          setMessage("Nothing changed !");
        } else {
          studentInfo.firstname = firstname;
          studentInfo.lastname = lastname;
          studentInfo.dob = date.toString();
          studentInfo.phone = parseInt(phone, 10);
          dispatch(changeProfile(studentInfo));
        }
      } else {
        setVisible(true);
        setMessage("Invalid phone number !");
      }
    } else {
      setVisible(true);
      setMessage("Cannot update with empty values !");
    }
  };

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage(null);
  };

  const focusHandler = () => {
    setVisible(false);
    setMessage(null);
  };

  useEffect(() => {
    if (error) {
      setVisible(true);
      setMessage(error.message);
      dispatch({ type: CLEAR_ERROR_STATE });
    }
  }, [error]);

  return (
    <ImageBackground
      style={styles.image}
      source={require("../assets/backgroundimage.png")}
    >
      <View style={styles.backgroundBlack}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1, height: "100%" }}>
            <KeyboardAvoidingView behavior="position" style={styles.OuterView}>
              <Text style={styles.editProfile}>Edit Your Profile</Text>
              <View style={styles.dividerView}>
                <Divider style={styles.divider} />
              </View>
              <View style={styles.InnerView}>
                <View style={styles.inputInnerView}>
                  <TextInput
                    placeholder="Firstname"
                    mode="flat"
                    style={styles.inputText}
                    textcolor="#fff"
                    placeholderColor="#fff"
                    colorprimary="#fff"
                    value={firstname ? firstname : ""}
                    onChangeText={(text) => setFirstname(text)}
                    onFocus={focusHandler}
                  />
                </View>
                <View style={styles.inputInnerView}>
                  <TextInput
                    placeholder="Lastname"
                    mode="flat"
                    style={styles.inputText}
                    textcolor="#fff"
                    placeholderColor="#fff"
                    colorprimary="#fff"
                    value={lastname ? lastname : ""}
                    onChangeText={(text) => setLastname(text)}
                    onFocus={focusHandler}
                  />
                </View>
                <TouchableOpacity onPress={() => setShow(true)}>
                  <View
                    style={{ marginVertical: 20, ...styles.inputInnerView }}
                  >
                    <TextInput
                      label="DOB"
                      value={date ? date.toString().slice(0, 15) : ""}
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
                    value={phone ? phone.toString() : ""}
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="number-pad"
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
                    onPress={saveChangesHandler}
                    loading={loading}
                  >
                    Save changes
                  </Button>
                </View>
              </View>
            </KeyboardAvoidingView>
            <SnackBar
              message={message}
              visible={visible}
              onDismissSnackBar={onDismissSnackBar}
              styles={{ marginBottom: 10 }}
            />
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
  editProfile: {
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

export const editProfileScreenOptions = {
  headerTitle: "Edit Profile",
};

export default EditProfileScreen;
