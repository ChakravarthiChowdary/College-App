import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Platform, AppState, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-community/async-storage";

import HeaderButton from "../components/HeaderButton";
import PrincipalMessage from "../components/PrincipalMessage";
import Placements from "../components/Placements";
import HomeHeaderButtons from "../components/HomeHeaderButtons";
import {
  autoLogin,
  BIOMETRIC_VERIFIED_ERROR,
  BIOMETRIC_VERIFIED_SUCCESS,
  LOG_OUT,
} from "../store/actions/authActions";
import SnackBar from "../components/SnackBar";
import { Colors } from "../constants/Colors";
import { getAppData } from "../store/actions/commonActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const { authInfo, biometric } = useSelector((state) => state.auth);
  const { loading, error, principalMessage } = useSelector(
    (state) => state.common
  );
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState(null);

  const onDismissSnackBar = () => {
    setVisible(false);
    setMessage("");
  };

  const _handleAppStateChange = (nextAppState) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  useEffect(() => {
    dispatch(getAppData());
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HomeHeaderButtons navigation={navigation} />,
    });
  }, [authInfo]);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const hasHardwareAndEnrolled =
          (await LocalAuthentication.hasHardwareAsync()) &&
          (await LocalAuthentication.isEnrolledAsync());

        if (hasHardwareAndEnrolled) {
          const hasAuthInfo = await AsyncStorage.getItem("auth");
          if (hasAuthInfo) {
            const res = await LocalAuthentication.authenticateAsync({
              promptMessage: "Authenticate",
            });

            if (res.error) {
              dispatch({ type: BIOMETRIC_VERIFIED_ERROR });
              dispatch({ type: LOG_OUT });
              setVisible(true);
              setMessage("You are logged out !");
            } else {
              dispatch(autoLogin());
              dispatch({ type: BIOMETRIC_VERIFIED_SUCCESS });
              setVisible(true);
              setMessage("You are logged in !");
              setColor(Colors.primary);
            }
          }
        } else {
          dispatch({ type: LOG_OUT });
        }
      } catch (error) {
        console.log("from catch", error);
      }
    };

    if (!biometric && appStateVisible === "active") authenticate();
  }, [appStateVisible]);

  if (loading) {
    return <Loading size="small" color={Colors.primary} />;
  }

  if (error) {
    return <Error error={error.message} action={getAppData} />;
  }
  return (
    principalMessage !== "" && (
      <View style={{ padding: 10, backgroundColor: "#fff" }}>
        <ScrollView>
          <PrincipalMessage />
          <Placements />
        </ScrollView>
        <SnackBar
          message={message}
          visible={visible}
          onDismissSnackBar={onDismissSnackBar}
          color={color}
          styles={{ marginBottom: 10 }}
        />
      </View>
    )
  );
};

export const homeScreenOptions = (navData) => {
  return {
    headerTitle: "VRSEC",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          iconSize={23}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default HomeScreen;
