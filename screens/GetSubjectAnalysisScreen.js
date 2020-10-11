import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-community/picker";

import { Colors } from "../constants/Colors";
import { SubjectAnalysisContext } from "../utils/Context";
import {
  CLEAR_SUBJECT_ANALYSIS_ERROR_STATE,
  getSubjectAnalysis,
  getDepartmentSubject,
} from "../store/actions/resultsActions";
import Loading from "../components/Loading";
import Text from "../components/Text";
import SnackBar from "../components/SnackBar";

const GetSubjectAnalysisScreen = ({ navigation }) => {
  //Get the data from the subject analysis context in Navigator.js
  const params = useContext(SubjectAnalysisContext);
  const dispatch = useDispatch();
  //Redux level state.
  const {
    subjectsLoading,
    subjectsError,
    subjects,
    analysis,
    analysisError,
    analysisLoading,
  } = useSelector((state) => state.results);
  //Component level state
  const [department, setDepartment] = useState("EEE");
  const [subject, setSubject] = useState("Select Subject");
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    dispatch({ type: CLEAR_SUBJECT_ANALYSIS_ERROR_STATE });
    dispatch(getDepartmentSubject(params));
  }, [dispatch]);

  useEffect(() => {
    if (analysis) {
      navigation.navigate("subjectanalysisresult");
      dispatch({ type: CLEAR_SUBJECT_ANALYSIS_ERROR_STATE });
    } else if (analysisError) {
      setVisible(true);
    }
  }, [analysis, analysisError]);

  const getPressedHandler = () => {
    dispatch(getSubjectAnalysis(params, subject));
  };

  const filteredSubjects = subjects.filter(
    (subject) => subject.branch === department
  );

  useEffect(() => {
    if (subjects.length > 0) setSubject(filteredSubjects[0].subject);
  }, [subjects, department]);

  return (
    <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.subjectAnalysisOuterView}>
          <View style={styles.subjectAnalysisInnerView}>
            <Text style={styles.verifyYourself}>Get Analysis</Text>
            <View style={styles.dividerView}>
              <Divider style={styles.divider} />
            </View>
            <View style={styles.subjectAnalysisPickerView}>
              <Picker
                mode="dropdown"
                onValueChange={(itemValue) => setDepartment(itemValue)}
                selectedValue={department}
              >
                <Picker.Item label="EEE" value="EEE" />
                <Picker.Item label="MEC" value="MEC" />
                <Picker.Item label="ECE" value="ECE" />
                <Picker.Item label="CSE" value="CSE" />
              </Picker>
            </View>
            {subjectsLoading ? (
              <Loading size="small" color={Colors.primary} />
            ) : (
              subjects && (
                <View style={styles.subjectAnalysisPickerView}>
                  <Picker
                    mode="dropdown"
                    onValueChange={(itemValue) => setSubject(itemValue)}
                    selectedValue={subject}
                  >
                    {filteredSubjects.map((subject) => (
                      <Picker.Item
                        label={subject.subject}
                        value={subject.subject}
                        key={subject.subject}
                      />
                    ))}
                  </Picker>
                </View>
              )
            )}
            <View style={styles.subjectAnalysisButtonView}>
              <Button
                mode="contained"
                color={Colors.secondary}
                onPress={getPressedHandler}
                loading={analysisLoading}
              >
                Get Analysis
              </Button>
            </View>
          </View>
          <SnackBar
            visible={visible}
            onDismissSnackBar={onDismissSnackBar}
            message="Error Occured! Try again later"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  subjectAnalysisOuterView: {
    flexDirection: "column",
    justifyContent: "center",
    height: Dimensions.get("screen").height - 150,
    margin: 10,
  },
  subjectAnalysisInnerView: {
    elevation: 5,
    shadowColor: "#ccc",
    shadowOpacity: 5,
    backgroundColor: "#fff",
    padding: 20,
    minHeight: 200,
  },
  subjectAnalysisButtonView: {
    marginTop: 20,
  },
  subjectAnalysisPickerView: {
    borderColor: Colors.primary,
    borderWidth: 1,
    marginBottom: 20,
  },
  divider: { borderWidth: 1, borderColor: Colors.secondary },
  verifyYourself: {
    color: "#000",
    fontSize: 23,
    textAlign: "center",
    marginBottom: 20,
  },
  dividerView: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: Dimensions.get("screen").width / 3,
    marginBottom: 20,
  },
});

export default GetSubjectAnalysisScreen;
