import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { Colors } from "../constants/Colors";

import Text from "./Text";

const ResultsItem = ({ navigation, resultItem }) => {
  const viewButtonPressedHandler = () => {
    //Navigate to tab navigator by passing params
    navigation.navigate("getresultsstack", {
      screen: "getresultstab",
      params: {
        result: resultItem,
      },
    });
  };
  return (
    <TouchableOpacity onPress={viewButtonPressedHandler}>
      <View style={styles.resultsItemView}>
        <Text style={styles.resultsItemText}>{resultItem.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  resultsItemView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    padding: 20,
    borderRadius: 8,
    borderColor: Colors.secondary,
    borderWidth: 2,
  },
  resultsItemText: {
    color: "#000",
    fontSize: 16,
  },
});

export default ResultsItem;
