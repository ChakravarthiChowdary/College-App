import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

import Text from "../components/Text";
import { Colors } from "../constants/Colors";

const PrincipalMessage = () => {
  return (
    <View>
      <Text style={styles.principalMessage}>Principle's Message</Text>
      <Divider style={styles.divider} />
      <Image
        source={require("../assets/principlePhoto.png")}
        style={styles.image}
      />
      <View>
        <Text style={styles.messageText}>
          The goal of the college is to train the students acquire the skills
          set and social consciousness to make them industry ready professionals
          who can with stand the global competition and can emerge successful in
          their chosen professional career and offer technologically innovative
          solutions to real time challenges.
        </Text>
      </View>
      <View style={{ marginVertical: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.name}>Dr. A.V.Ratna Prasad,</Text>
          <Text style={styles.degrees}>M.Tech(IIT.Kgp),Ph.D.</Text>
        </View>
        <Text style={styles.designation}>Principal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  principalMessage: { fontSize: 20, marginBottom: 10 },
  divider: { borderWidth: 1, width: 100, borderColor: Colors.secondary },
  image: {
    width: "100%",
    height: Dimensions.get("screen").height / 3,
    marginVertical: 10,
  },
  messageText: { fontSize: 16, lineHeight: 23, textAlign: "justify" },
  name: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "justify",
    marginRight: 5,
    color: "#002884",
    fontFamily: "RobotoBold",
  },
  degrees: { fontSize: 16, lineHeight: 23, textAlign: "justify" },
  designation: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "justify",
    fontFamily: "RobotoBold",
  },
});

export default PrincipalMessage;
