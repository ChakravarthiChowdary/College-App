import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Switch } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Text from "../components/Text";
import HeaderButton from "../components/HeaderButton";
import TextInput from "../components/TextInput";
import { Colors } from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Snackbar from "../components/SnackBar";
import { loginUser } from "../store/actions/authActions";

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  //Redux level state.
  const { loading, error, authInfo } = useSelector((state) => state.auth);
  //Component level state.
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const loginPressedHandler = () => {
    Keyboard.dismiss();
    if (email !== "" && password !== "") {
      dispatch(
        loginUser({ email: email, password: password, returnSecureToken: true })
      );
    } else {
      setVisible(true);
      setMessage("Fill all fields !");
    }
  };

  useEffect(() => {
    if (error) {
      setMessage(error.message);
      setVisible(true);
    }
  }, [error]);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.OuterView}>
          <View style={styles.InnerView}>
            <View style={styles.InputView}>
              <TextInput
                label="StudentID@vrsec.com"
                mode="flat"
                style={{ backgroundColor: "#fff" }}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.InputView}>
              <TextInput
                label="Password"
                mode="flat"
                style={{ backgroundColor: "#fff" }}
                secureTextEntry={!isSwitchOn}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View style={styles.ShowPassword}>
              <Text style={{ fontFamily: "RobotoBold" }}>Show Password</Text>
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                color={Colors.primary}
              />
            </View>
            <TouchableOpacity
              style={styles.ForgotPassword}
              onPress={
                route.params
                  ? route.params.fromScreen
                    ? () => navigation.navigate("homeforgotpassword")
                    : () => navigation.navigate("forgotpassword")
                  : () => navigation.navigate("forgotpassword")
              }
            >
              <View>
                <Text>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.ButtonView}>
              <Button
                mode="contained"
                color={Colors.secondary}
                onPress={loginPressedHandler}
                loading={loading}
              >
                LOGIN
              </Button>
            </View>
          </View>
          <Snackbar
            visible={visible}
            message={message}
            onDismissSnackBar={() => setVisible(false)}
            styles={{ marginBottom: 0 }}
          />
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
    marginTop: 20,
  },
  InputView: {
    marginBottom: 10,
  },
  ShowPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ForgotPassword: {
    marginVertical: 10,
  },
});

export const loginScreenOptions = (navData) => {
  return {
    headerTitle: "Authenticate",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="md-menu"
          iconSize={23}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default LoginScreen;
