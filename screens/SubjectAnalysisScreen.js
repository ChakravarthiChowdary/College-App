import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { useSelector } from "react-redux";

import Text from "../components/Text";
import { Colors } from "../constants/Colors";

const SubjectAnalysisScreen = () => {
  const subjectanalysis = useSelector((state) => state.results.analysisSubject);
  const tableHead = ["SNO", "Student ID", "Score", "Grade", "Result"];
  let tableData = [
    ["1", "2", "3", "4"],
    ["a", "b", "c", "d"],
    ["1", "2", "3", "456\n789"],
    ["a", "b", "c", "d"],
  ];
  tableData = [];
  let count = 0;
  let grade = "";
  for (let studentScore in subjectanalysis) {
    count = count + 1;
    if (subjectanalysis[studentScore].score === 10) grade = "Ex";
    else if (subjectanalysis[studentScore].score === 9) grade = "A+";
    else if (subjectanalysis[studentScore].score === 8) grade = "A";
    else if (subjectanalysis[studentScore].score === 7) grade = "B";
    else if (subjectanalysis[studentScore].score === 6) grade = "C";
    else if (subjectanalysis[studentScore].score === 5) grade = "D";
    else grade = "E";
    tableData.push([
      count,
      subjectanalysis[studentScore].id,
      subjectanalysis[studentScore].score,
      grade,
      subjectanalysis[studentScore].score >= 6 ? "PASS" : "FAIL",
    ]);
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleView}>
          <Text style={styles.heading}>
            {subjectanalysis[0].subject} ANALYSIS
          </Text>
          <Divider style={styles.divider} />
        </View>
      </View>
      <ScrollView>
        <View>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={tableHead}
              style={styles.head}
              flexArr={[1, 2, 1, 1, 1]}
              textStyle={styles.text}
            />
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={tableData}
                flexArr={[1, 2, 1, 1, 1]}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 10, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 5, fontSize: 16 },
  wrapper: { flexDirection: "row" },
  titleView: {
    marginHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  divider: {
    borderColor: Colors.secondary,
    borderWidth: 1,
    width: 100,
    marginVertical: 15,
  },
  heading: { fontSize: 18, color: "#000", fontFamily: "RobotoBold" },
});

export default SubjectAnalysisScreen;
