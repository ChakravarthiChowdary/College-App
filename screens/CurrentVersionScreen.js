import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";

import Text from "../components/Text";
import { Colors } from "../constants/Colors";

const CurrentVersionScreen = () => {
  const updateText = useSelector((state) => state.common.updateText);
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <View style={{ padding: 10 }}>
        <Text style={styles.updateLog}>Update Log</Text>
        <View style={styles.dividerView}>
          <Divider style={styles.divider} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 16 }}>{updateText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: { borderWidth: 1, borderColor: Colors.secondary },
  updateLog: {
    color: "#000",
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "RobotoBold",
  },
  dividerView: {
    width: 80,
  },
});

export const currentVersionScreenOptions = (navData) => {
  return {
    headerTitle: "What's new?",
  };
};

export default CurrentVersionScreen;
