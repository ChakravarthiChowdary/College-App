import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";

import Text from "../components/Text";
import { Colors } from "../constants/Colors";
import { getPrivacyUpdateLog } from "../store/actions/commonActions";

const PrivacyScreen = () => {
  const { privacyText, error, loading } = useSelector((state) => state.common);
  if (loading) {
    return <Loading size="small" color={Colors.primary} />;
  }
  return (
    <View style={styles.privacyScreenOuterView}>
      <View>
        <Text style={styles.privacyHeading}>Privacy Policy</Text>
        <Divider style={styles.divider} />
      </View>
      {error ? (
        <Error error={error.message} action={getPrivacyUpdateLog} />
      ) : (
        <ScrollView>
          <Text>{privacyText}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  privacyScreenOuterView: {
    margin: 10,
    padding: 10,
  },
  divider: {
    borderWidth: 1,
    width: 100,
    borderColor: Colors.secondary,
    marginVertical: 10,
  },
  privacyHeading: {
    fontSize: 20,
    fontFamily: "RobotoBold",
  },
});

export default PrivacyScreen;
