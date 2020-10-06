import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

import Text from "../components/Text";
import { Colors } from "../constants/Colors";

const Placements = () => {
  return (
    <View>
      <Text style={styles.Placements}>Placement Panel</Text>
      <Divider style={styles.divider} />
      <Image
        source={require("../assets/placementPhoto.png")}
        style={styles.image}
      />
      <View>
        <Text style={styles.Placements}>Objective</Text>
        <Divider style={styles.divider} />
        <Text style={styles.messageText}>
          The objective of Training & Placement Department is to equip students
          with globally employable skills through training and to help them
          attain their desired employment and career goals.
        </Text>
        <Text style={styles.Placements}>We are honest</Text>
        <Divider style={styles.divider} />
        <Text style={styles.messageText}>
          Placement Cell has a full time Placement Officer. The Cell is devoted
          to cater to the needs of the organizations in conducting campus
          interviews for placements. Interactions with organizations are
          regularly done for placement requirements. Placement cell also
          conducts career guidance cement requirements. Placement cell also
          conducts career guidance workshops to the final and pre final year
          students.
        </Text>
      </View>
      <View style={{ marginVertical: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.name}>V Vijay Marutibabu</Text>
          <Text style={styles.degrees}>M.Tech(IIT.Kgp),Ph.D.</Text>
        </View>
        <Text style={styles.designation}>
          Head- Industry Relations & Placements
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Placements: { fontSize: 20, marginBottom: 10 },
  divider: { borderWidth: 1, width: 100, borderColor: Colors.secondary },
  image: {
    width: "100%",
    height: Dimensions.get("screen").height / 3,
    marginVertical: 10,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "justify",
    marginVertical: 10,
  },
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

export default Placements;
