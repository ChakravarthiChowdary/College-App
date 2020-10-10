import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import PersonalDetails from "../components/PersonalDetails";
import ResultsDetails from "../components/ResultsDetails";
import AttendanceDetails from "../components/AttendanceDetails";
import AcademicDetails from "../components/AcademicDetails";
import ProfileSection from "../components/ProfileSection";
import { Colors } from "../constants/Colors";

const ProfileScreen = () => {
  return (
    <View style={styles.OuterView}>
      <ProfileSection />
      <Divider />
      <ScrollView>
        <View>
          <AcademicDetails />
          <Divider />
          <AttendanceDetails />
          <Divider />
          <ResultsDetails />
          <PersonalDetails />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  OuterView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export const profileScreenOptions = (navData) => {
  return {
    headerTitle: "My Profile",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          iconSize={23}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          iconSize={23}
          onPress={() => navData.navigation.navigate("editprofile")}
        />
      </HeaderButtons>
    ),
  };
};

export default ProfileScreen;
