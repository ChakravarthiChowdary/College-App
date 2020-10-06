import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";

import Text from "../components/Text";
import { Colors } from "../constants/Colors";
import { privacyText } from "../constants/PrivacyPolicyText";

const PrivacyScreen = () => {
  return (
    <View style={styles.privacyScreenOuterView}>
      <View>
        <Text style={styles.privacyHeading}>Privacy Policy</Text>
        <Divider style={styles.divider} />
      </View>
      <ScrollView>
        <Text>{privacyText}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  privacyScreenOuterView: {
    margin: 10,
  },
  divider: {
    borderWidth: 1,
    width: 100,
    borderColor: Colors.secondary,
    marginVertical: 10,
  },
  privacyHeading: {
    fontSize: 16,
    fontFamily: "RobotoBold",
  },
});

export default PrivacyScreen;
