import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { useDispatch, useSelector } from "react-redux";

import {
  CLEAR_TOPPERS,
  getCollegeToppers,
} from "../store/actions/resultsActions";
import { TabContext } from "../utils/Context";
import Snackbar from "../components/SnackBar";
import { Colors } from "../constants/Colors";
import Loading from "../components/Loading";
import Text from "../components/Text";
import Error from "../components/Error";

const CollegeToppersScreen = () => {
  const resultData = useContext(TabContext);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [toppersList, setToppersList] = useState(null);
  const { toppersLoading, toppersError, toppers } = useSelector(
    (state) => state.results
  );
  const dispatch = useDispatch();

  const tableHead = ["StudentID", "Name", "Department", "Rank"];
  const tableData = [];

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    if (!toppers) dispatch(getCollegeToppers(resultData));
  }, []);

  useEffect(() => {
    if (toppersError) {
      setVisible(true);
      setMessage(toppersError.message);
    } else if (toppers) {
      setToppersList(toppers);
      dispatch({ type: CLEAR_TOPPERS });
    }
  }, [toppersError, toppers]);

  if (toppersLoading) {
    return <Loading size="small" color={Colors.secondary} />;
  }

  for (let key in toppersList) {
    tableData.push([
      toppersList[key].id,
      toppersList[key].firstname + "\n" + toppersList[key].lastname,
      toppersList[key].department,
      parseInt(key) + 1,
    ]);
  }

  if (toppersError) {
    return (
      <Error
        error={toppersError.message}
        action={() => getCollegeToppers(resultData)}
      />
    );
  }

  return (
    toppersList && (
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
    )
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
