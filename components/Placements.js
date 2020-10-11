import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";

import Text from "../components/Text";
import { Colors } from "../constants/Colors";

const Placements = () => {
  const { objective, honestMessage } = useSelector((state) => state.common);
  return (
    <View style={{ paddingHorizontal: 5 }}>
      <Text style={styles.Placements}>Placement Panel</Text>
      <Divider style={styles.divider} />
      <Image
        source={require("../assets/placementPhoto.png")}
        style={styles.image}
      />
      <View>
        <Text style={styles.Placements}>Objective</Text>
        <Divider style={styles.divider} />
        <Text style={styles.messageText}>{objective}</Text>
        <Text style={styles.Placements}>We are honest</Text>
        <Divider style={styles.divider} />
        <Text style={styles.messageText}>{honestMessage}</Text>
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
