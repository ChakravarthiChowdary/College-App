import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Platform,
  BackHandler,
  AppState,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-community/async-storage";

import HeaderButton from "../components/HeaderButton";
import PrincipalMessage from "../components/PrincipalMessage";
import Placements from "../components/Placements";
import {
  autoLogin,
  BIOMETRIC_VERIFIED_ERROR,
  BIOMETRIC_VERIFIED_SUCCESS,
  LOG_OUT,
} from "../store/actions/authActions";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const { authInfo, biometric } = useSelector((state) => state.auth);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  let isNotCancelled = true;

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  useEffect(() => {
    const autoLoginFunc = async () => {
      const authStorage = await AsyncStorage.getItem("auth");
      if (authStorage) {
        dispatch(autoLogin());
        AppState.addEventListener("change", _handleAppStateChange);
      }
    };

    autoLoginFunc();

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName={
              Platform.OS === "android"
                ? authInfo
                  ? "md-exit"
                  : "md-contact"
                : authInfo
                ? "ios-exit"
                : "ios-contact"
            }
            iconSize={23}
            onPress={
              authInfo
                ? () => dispatch({ type: LOG_OUT })
                : () =>
                    navigation.navigate("homeloginscreen", {
                      fromScreen: "home",
                    })
            }
          />
        </HeaderButtons>
      ),
    });
  }, [authInfo]);

  useEffect(() => {
    const authenticate = async () => {
      try {
        if (
          LocalAuthentication.hasHardwareAsync() &&
          LocalAuthentication.isEnrolledAsync()
        ) {
          const res = await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate",
          });

          if (res.error) {
            dispatch({ type: BIOMETRIC_VERIFIED_ERROR });
            dispatch({ type: LOG_OUT });
            BackHandler.exitApp();
          } else {
            dispatch({ type: BIOMETRIC_VERIFIED_SUCCESS });
          }
        }
      } catch (error) {
        console.log("from catch", error);
      }
    };

    if (authInfo && !biometric && appStateVisible === "active") authenticate();
  }, [appStateVisible, authInfo]);

  return (
    <View style={{ margin: 10 }}>
      <ScrollView>
        <PrincipalMessage />
        <Placements />
      </ScrollView>
    </View>
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
