import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";

import { Colors } from "../constants/Colors";
import Text from "../components/Text";

const ProfileSection = () => {
  const studentData = useSelector((state) =>
    state.auth.studentInfo ? state.auth.studentInfo : {}
  );
  return (
    <View style={styles.ProfileView}>
      <View>
        <Avatar.Text
          size={64}
          label={studentData.firstname[0] + studentData.lastname[0]}
          style={{ backgroundColor: Colors.secondary }}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.ProfileName}>
          {studentData.firstname + " " + studentData.lastname}
        </Text>
        <Text style={styles.ProfileId}>({studentData.id})</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProfileView: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  ProfileName: { fontFamily: "RobotoBold", fontSize: 18, marginBottom: 5 },
  ProfileId: { fontSize: 14, textAlign: "center" },
});

export default ProfileSection;
