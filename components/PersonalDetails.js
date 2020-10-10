import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";

import { Colors } from "../constants/Colors";

const PersonalDetails = () => {
  const studentData = useSelector((state) =>
    state.auth.studentInfo ? state.auth.studentInfo : {}
  );
  return (
    <View style={styles.PersonalDetailsOuterView}>
      <Text style={styles.Title}>Personal Details: </Text>
      <Divider
        style={{
          marginVertical: 10,
          borderWidth: 1,
          borderColor: Colors.secondary,
        }}
      />
      <View style={styles.PersonalDetailsView}>
        <View>
          <Text style={styles.PersonalHeading}>Name</Text>
        </View>
        <View>
          <Text>{studentData.firstname + "  " + studentData.lastname}</Text>
        </View>
      </View>
      <View style={styles.PersonalDetailsView}>
        <View>
          <Text style={styles.PersonalHeading}>Phone</Text>
        </View>
        <View>
          <Text>{studentData.phone}</Text>
        </View>
      </View>
      <View style={styles.PersonalDetailsView}>
        <View>
          <Text style={styles.PersonalHeading}>Parents Contact</Text>
        </View>
        <View>
          <Text>{studentData.parentsPhone}</Text>
        </View>
      </View>
      <View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.PersonalHeading}>Address:</Text>
        </View>
        <View>
          <Text>{studentData.address}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PersonalDetailsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  PersonalDetailsOuterView: {
    padding: 16,
    paddingTop: 10,
    backgroundColor: "#fff",

    margin: 10,
  },
  Title: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "RobotoBold",
    color: Colors.secondary,
  },
  PersonalHeading: { fontFamily: "RobotoBold" },
});

export default PersonalDetails;
