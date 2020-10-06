import React from "react";
import { StyleSheet, View } from "react-native";

import { useSelector } from "react-redux";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";

import Text from "../components/Text";

const AttendanceDetails = () => {
  const studentData = useSelector((state) =>
    state.auth.studentInfo ? state.auth.studentInfo : {}
  );

  const tableHeadAttendance = ["SNO", "SEMESTER", "ATTENDANCE"];
  const tableDataAttendance = [];
  let attendanceCount = 0;
  for (let key in studentData.attendance) {
    attendanceCount = attendanceCount + 1;
    tableDataAttendance.push([
      attendanceCount,
      key.toUpperCase(),
      studentData.attendance[key] + "%",
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.AcademicProfile}>Attendance</Text>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={tableHeadAttendance}
          style={styles.head}
          textStyle={styles.text}
          flexArr={[1, 2, 3]}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={tableDataAttendance}
            textStyle={styles.text}
            flexArr={[1, 2, 3]}
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

export default AttendanceDetails;
