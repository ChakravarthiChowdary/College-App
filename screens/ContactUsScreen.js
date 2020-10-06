import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "../components/TextInput";
import { Colors } from "../constants/Colors";
import Snackbar from "../components/SnackBar";
import { sendMessage } from "../store/actions/contactActions";
import { CLEAR_SEND_ERROR } from "../store/actions/contactActions";

const ContactUsScreen = () => {
  const dispatch = useDispatch();
  //Component level state.
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  //Redux level state
  const loading = useSelector((state) => state.contact.loading);
  const sendError = useSelector((state) => state.contact.error);
  const success = useSelector((state) => state.contact.success);

  const onDismissSnackBar = () => {
    setVisible(false);
    setError(null);
  };

  const sendPressedHandler = () => {
    Keyboard.dismiss();
    if (name !== "" && email !== "" && message !== "") {
      if (message.length > 20) {
        dispatch(sendMessage({ email: email, name: name, message: message }));
      } else {
        setError("Message should have atleast 20 characters");
        setVisible(true);
      }
    } else {
      setError("All fields are mandatory");
      setVisible(true);
    }
  };

  useEffect(() => {
    if (sendError) {
      setVisible(true);
      setError(sendError.message);
    }
    if (success) {
      setEmail("");
      setName("");
      setMessage("");
      setVisible(true);
      setError("Message sent. We will contact you soon!");
    }
    dispatch({ type: CLEAR_SEND_ERROR });
  }, [sendError, success]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.contactusOuterView}>
        <KeyboardAvoidingView
          behavior="position"
          style={{ flex: 1, paddingTop: 18 }}
        >
          <View style={styles.contactusInnerView}>
            <View style={styles.contactusIconView}>
              <Ionicons
                name={Platform.OS === "android" ? "md-mail" : "ios-mail"}
                size={128}
                color="#ccc"
              />
            </View>
            <View style={styles.contactusInputView}>
              <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.contactusInputView}>
              <TextInput
                mode="outlined"
                label="Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.contactusInputView}>
              <TextInput
                mode="outlined"
                label="Message"
                multiline
                numberOfLines={5}
                value={message}
                onChangeText={(text) => setMessage(text)}
              />
            </View>
            <View style={styles.contactusButtonView}>
              <Button
                mode="contained"
                color={Colors.secondary}
                onPress={sendPressedHandler}
                loading={loading}
              >
                Send Message
              </Button>
            </View>
          </View>

          <View>
            <Snackbar
              visible={visible}
              onDismissSnackBar={onDismissSnackBar}
              message={error}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contactusOuterView: {
    flex: 1,
  },
  contactusInnerView: {
    margin: 10,
    height: "100%",
    padding: 20,
  },
  contactusIconView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("screen").height / 6,
    borderWidth: 2,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  contactusButtonView: {
    marginTop: 20,
  },
  contactusInputView: {
    marginBottom: 10,
  },
});

export default ContactUsScreen;
