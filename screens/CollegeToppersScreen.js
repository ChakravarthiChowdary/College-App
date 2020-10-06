import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { useDispatch, useSelector } from "react-redux";

import { getCollegeToppers } from "../store/actions/resultsActions";
import { TabContext } from "../utils/Context";
import Snackbar from "../components/SnackBar";
import { Colors } from "../constants/Colors";
import Loading from "../components/Loading";
import Text from "../components/Text";

const CollegeToppersScreen = () => {
  const resultData = useContext(TabContext);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const { toppersLoading, toppersError, toppers } = useSelector(
    (state) => state.results
  );
  const dispatch = useDispatch();

  const tableHead = ["StudentID", "Name", "Department", "Rank"];
  const tableData = [];

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    dispatch(getCollegeToppers(resultData));
  }, []);

  useEffect(() => {
    if (toppersError) {
      setVisible(true);
      setMessage(toppersError.message);
    }
  }, [toppersError]);

  if (toppersLoading) {
    return <Loading size="small" color={Colors.secondary} />;
  }

  for (let key in toppers) {
    tableData.push([
      toppers[key].id,
      toppers[key].firstname + "\n" + toppers[key].lastname,
      toppers[key].department,
      parseInt(key) + 1,
    ]);
  }

  return (
    <View style={styles.OuterView}>
      <View style={styles.Heading}>
        <Text style={{ fontFamily: "RobotoBold", fontSize: 20 }}>
          COLLEGE TOPPERS OF {resultData.semester.toUpperCase()}
        </Text>
      </View>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={tableHead}
            flexArr={[2, 2, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={tableData}
              flexArr={[2, 2, 1, 1]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
      <Snackbar
        visible={visible}
        message={message}
        onDismissSnackBar={onDismissSnackBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  OuterView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  wrapper: { flexDirection: "row" },
  Heading: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default CollegeToppersScreen;
