import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { useSelector } from "react-redux";
import { Divider } from "react-native-paper";

import FloatingButton from "../components/FloatingButton";
import Text from "../components/Text";
import { Colors } from "../constants/Colors";

const ResultsScreen = () => {
  //Redux level state
  const result = useSelector((state) => state.results.resultOfStudent);
  const studentData = useSelector((state) => state.results.studentData);
  const tableHead = ["Sno", "Subject", "Grade", "Points", "Status"];
  const tableNameHead = [
    "Name",
    studentData.firstname + " " + studentData.lastname,
  ];
  const tableStudentIdHead = ["Student ID", studentData.id];
  const tableCGPAHead = [`CGPA: ${result.CGPA} `, `SGPA: ${result.SGPA} `];
  const tableTotalResultHead = [
    `Result :  ${result.SGPA > 6 ? "PASS" : "FAIL"}`,
  ];

  let resultTableData;

  resultTableData = [];
  let count = 0;
  let grade = "";
  for (let key in result) {
    if (key.length === 8) {
      count = count + 1;
      if (result[key] === 10) grade = "Ex";
      else if (result[key] === 9) grade = "A+";
      else if (result[key] === 8) grade = "A";
      else if (result[key] === 7) grade = "B";
      else if (result[key] === 6) grade = "C";
      else if (result[key] === 5) grade = "D";
      else grade = "E";
      resultTableData.push([
        count,
        key,
        grade,
        result[key],
        result[key] >= 6 ? "Pass" : "Fail",
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Result for {studentData.id}</Text>
      <Divider style={styles.divider} />
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row data={tableNameHead} style={styles.head} textStyle={styles.text} />
        <Row
          data={tableStudentIdHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <Row
          data={tableHead}
          style={styles.head}
          textStyle={styles.text}
          flexArr={[1, 3, 2, 2, 3]}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={resultTableData}
            textStyle={styles.text}
            flexArr={[1, 3, 2, 2, 3]}
          />
        </TableWrapper>
        <Row data={tableCGPAHead} style={styles.head} textStyle={styles.text} />
        <Row
          data={tableTotalResultHead}
          style={styles.head}
          textStyle={{ ...styles.text, fontSize: 18, color: "green" }}
        />
      </Table>
      <FloatingButton name={result.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: Dimensions.get("screen").height / 12,
    paddingHorizontal: 10,
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { marginVertical: 5, marginHorizontal: 2, paddingHorizontal: 3 },
  wrapper: { flexDirection: "row" },
  divider: {
    borderWidth: 1,
    width: 100,
    borderColor: Colors.secondary,
    marginVertical: 20,
  },
  heading: { fontSize: 16, fontFamily: "RobotoBold" },
});

export const resultsScreenOptions = {
  headerTitle: "Your Performance",
};

export default ResultsScreen;
