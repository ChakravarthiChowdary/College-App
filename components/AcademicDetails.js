import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";

import Text from "../components/Text";

const AcademicDetails = () => {
  const studentData = useSelector((state) =>
    state.auth.studentInfo ? state.auth.studentInfo : {}
  );
  const tableHeadAcademic = ["CGPA", "SGPA", "BACKLOGS", "RANK"];
  const tableDataAcademic = [
    [
      studentData.CGPA,
      studentData.SGPA,
      studentData.backlogs,
      studentData.rank,
    ],
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.AcademicProfile}>Academic Profile</Text>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={tableHeadAcademic}
          style={styles.head}
          textStyle={styles.text}
          flexArr={[1, 1, 2, 1]}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={tableDataAcademic}
            textStyle={styles.text}
            flexArr={[1, 1, 2, 1]}
          />
        </TableWrapper>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 10, backgroundColor: "#fff" },

  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: "center" },
  AcademicProfile: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "RobotoBold",
  },
  wrapper: { flexDirection: "row" },
});

export default AcademicDetails;
