import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";

import Text from "../components/Text";

const ResultsDetails = () => {
  const studentData = useSelector((state) =>
    state.auth.studentInfo ? state.auth.studentInfo : {}
  );

  const tableHeadResults = ["SNO", "SEMESTER", "CGPA", "SGPA"];
  const tableDataResults = [];
  let resultsCount = 0;
  for (let key in studentData.results) {
    resultsCount = resultsCount + 1;
    tableDataResults.push([
      resultsCount,
      key.toUpperCase(),
      studentData.results[key].CGPA,
      studentData.results[key].SGPA,
    ]);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.AcademicProfile}>Semester wise results</Text>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={tableHeadResults}
          style={styles.head}
          textStyle={styles.text}
          flexArr={[1, 2, 1, 1]}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={tableDataResults}
            textStyle={styles.text}
            flexArr={[1, 2, 1, 1]}
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

export default ResultsDetails;
