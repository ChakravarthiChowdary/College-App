import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loading = (props) => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
