import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Divider, Switch } from "react-native-paper";
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
      setMessage("All fields are mandatory !");
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
    <ImageBackground
      style={styles.image}
      source={require("../assets/backgroundimage.png")}
    >
      <View style={styles.backgroundBlack}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1, height: "100%" }}>
            <KeyboardAvoidingView behavior="position" style={styles.OuterView}>
              <Text style={styles.verifyYourself}>Verify Yourself</Text>
              <View style={styles.dividerView}>
                <Divider style={styles.divider} />
              </View>
              <View style={styles.InnerView}>
                <View style={styles.InputView}>
                  <TextInput
                    mode="flat"
                    style={styles.inputText}
                    textcolor="#fff"
                    placeholderColor="#fff"
                    colorprimary="#fff"
                    onChangeText={(text) => setEmail(text)}
                    placeholder="StudentID@vrsec.com"
                  />
                </View>
                <View style={styles.InputView}>
                  <TextInput
                    placeholder="Password"
                    mode="flat"
                    textcolor="#fff"
                    placeholderColor="#fff"
                    colorprimary="#fff"
                    style={styles.inputText}
                    secureTextEntry={!isSwitchOn}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>
                <View style={styles.ShowPassword}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                    }}
                  >
                    Show Password
                  </Text>
                  <Switch
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                    color="#fff"
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
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                      }}
                    >
                      Forgot Password?
                    </Text>
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
            </KeyboardAvoidingView>
            <Snackbar
              visible={visible}
              message={message}
              onDismissSnackBar={() => setVisible(false)}
              styles={{
                marginBottom: Dimensions.get("screen").height / 20,
                marginHorizontal: 20,
              }}
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
    padding: 15,
  },
  ButtonView: {
    marginTop: 20,
  },
  InputView: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  ShowPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ForgotPassword: {
    marginVertical: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  backgroundBlack: { height: "100%", backgroundColor: "rgba(0,0,0,0.6)" },
  inputText: { backgroundColor: "transparent", fontSize: 16 },
  divider: { borderWidth: 1, borderColor: "#fff" },
  verifyYourself: {
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
