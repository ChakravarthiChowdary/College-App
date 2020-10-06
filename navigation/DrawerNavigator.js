import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Alert, BackHandler, Platform, Share } from "react-native";
import { Drawer, Divider } from "react-native-paper";

import { HomeStackNavigator } from "./HomeStack";
import { LoginStackNavigator } from "./LoginStack";
import { ResultsStackNavigator } from "./ResultsStack";
import { SettingsStackNavigator } from "./SettingsStack";
import { Colors } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../store/actions/authActions";
import { ProfileStackNavigator } from "./ProfileStack";

const ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "App link",
        message:
          "Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en",
        url:
          "https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  onShare();
};

//Drawer navigator options
const homeDrawerNavOptions = ({ navigation }) => {
  return {
    drawerIcon: () => (
      <Ionicons
        name={Platform.OS === "android" ? "md-home" : "ios-home"}
        size={23}
        color={navigation.isFocused() ? "#fff" : "#000"}
      />
    ),
    drawerLabel: "Home",
  };
};

const loginDrawerNavOptions = ({ navigation }) => {
  return {
    drawerIcon: () => (
      <Ionicons
        name={Platform.OS === "android" ? "md-log-in" : "ios-log-in"}
        size={24}
        color={navigation.isFocused() ? "#fff" : "#000"}
      />
    ),
    drawerLabel: "Login",
  };
};

const profileDrawerNavOptions = ({ navigation }) => {
  return {
    drawerIcon: () => (
      <Ionicons
        name={Platform.OS === "android" ? "md-contact" : "ios-contact"}
        size={24}
        color={navigation.isFocused() ? "#fff" : "#000"}
      />
    ),
    drawerLabel: "My Profile",
  };
};

const resultsDrawerNavOptions = ({ navigation }) => {
  return {
    drawerIcon: () => (
      <Ionicons
        name={Platform.OS === "android" ? "md-paper" : "ios-paper"}
        size={24}
        color={navigation.isFocused() ? "#fff" : "#000"}
      />
    ),
    drawerLabel: "Results",
  };
};

const settingsDrawerNavOptions = ({ navigation }) => {
  return {
    drawerIcon: () => (
      <Ionicons
        name={Platform.OS === "android" ? "md-settings" : "ios-settings"}
        size={24}
        color={navigation.isFocused() ? "#fff" : "#000"}
      />
    ),
    drawerLabel: "Settings",
  };
};

//Default Drawer navigator options
const defaultDrawerNavOptions = {
  activeBackgroundColor: Platform.OS === "android" ? Colors.primary : "#fff",
  activeTintColor: Platform.OS === "android" ? "#fff" : Colors.primary,
};

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const authInfo = useSelector((state) => state.auth.authInfo);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Drawer.Section title="Application">
        <Divider style={{ marginTop: 10 }} />
        <Drawer.Item
          label="Rate this app"
          icon="star"
          onPress={() =>
            Alert.alert(
              "Do you want to rate?",
              "Please rate us in playstore.",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                { text: "OK" },
              ]
            )
          }
        />
        <Drawer.Item
          label="Share this app"
          icon="share-variant"
          onPress={ShareExample}
        />
        <Drawer.Item
          label="Contact us"
          icon="account-box"
          onPress={() => props.navigation.navigate("contactstack")}
        />
        <Drawer.Item
          label="Privacy policy"
          icon="lock"
          onPress={() => props.navigation.navigate("privacystack")}
        />
        {authInfo && (
          <Drawer.Item
            label="Log Out"
            icon="location-exit"
            onPress={() => dispatch({ type: LOG_OUT })}
          />
        )}
        <Drawer.Item
          label="Exit app"
          icon="exit-to-app"
          onPress={() => BackHandler.exitApp()}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const DrawerNav = createDrawerNavigator();

export const DrawerNavigator = () => {
  const authInfo = useSelector((state) => state.auth.authInfo);
  return (
    <DrawerNav.Navigator
      drawerContentOptions={defaultDrawerNavOptions}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      statusBarAnimation="fade"
      keyboardDismissMode="on-drag"
      drawerType="slide"
    >
      <DrawerNav.Screen
        name="homedrawer"
        component={HomeStackNavigator}
        options={homeDrawerNavOptions}
      />
      <DrawerNav.Screen
        name="resultsdrawer"
        component={ResultsStackNavigator}
        options={resultsDrawerNavOptions}
      />
      {!authInfo ? (
        <DrawerNav.Screen
          name="logindrawer"
          component={LoginStackNavigator}
          options={loginDrawerNavOptions}
        />
      ) : (
        <DrawerNav.Screen
          name="profiledrawer"
          component={ProfileStackNavigator}
          options={profileDrawerNavOptions}
        />
      )}
      <DrawerNav.Screen
        name="settingsdrawer"
        component={SettingsStackNavigator}
        options={settingsDrawerNavOptions}
      />
    </DrawerNav.Navigator>
  );
};
