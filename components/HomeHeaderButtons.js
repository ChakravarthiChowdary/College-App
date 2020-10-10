import React from "react";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import { LOG_OUT } from "../store/actions/authActions";

const HomeHeaderButtons = ({ navigation }) => {
  const dispatch = useDispatch();
  const { authInfo } = useSelector((state) => state.auth);

  return (
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
  );
};

export default HomeHeaderButtons;
