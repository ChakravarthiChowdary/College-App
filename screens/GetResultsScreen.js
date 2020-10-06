import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { Colors } from "../constants/Colors";
import { getResult } from "../store/actions/resultsActions";
import { GetResultsContext } from "../utils/Context";
import { CLEAR_RESULT_STATE } from "../store/actions/resultsActions";
import TextInput from "../components/TextInput";
import Snackbar from "../components/SnackBar";

const GetResultsScreen = ({ navigation }) => {
  //Get the data from the Get results context in Navigator.js
  const params = useContext(GetResultsContext);
  const dispatch = useDispatch();
  //Component level state.
  const [hallticket, setHallticket] = useState("");
  const [inputError, setInputError] = useState(null);
  const [visible, setVisible] = useState(false);
  //Redux level state.
  const { resultLoading, resultError, result } = useSelector(
    (state) => state.results
  );

  const getResultPressedHandler = () => {
    setInputError(null);
    Keyboard.dismiss();
    if (hallticket !== "" && hallticket.length === 10) {
      dispatch(getResult(params, hallticket));
    } else {
      setInputError("Enter valid hallticket number");
      setVisible(true);
    }
  };

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    dispatch({ type: CLEAR_RESULT_STATE });
  }, []);

  useEffect(() => {
    if (result) {
      navigation.navigate("results");
    } else if (resultError) {
      setInputError(resultError.message);
      setVisible(true);
    }
    dispatch({ type: CLEAR_RESULT_STATE });
  }, [result, resultError]);

  const inputChangedHandler = (text) => {
    setInputError(null);
    setHallticket(text);
  };

  return (
    <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.getResultsOuterView}>
          <View style={styles.getResultsInnerView}>
            <View>
              <TextInput
                label="Enter your HNO"
                mode="outlined"
                onChangeText={inputChangedHandler}
                style={{ backgroundColor: "#fff" }}
              />
            </View>
            <View style={styles.getResultsButtonView}>
              <Button
                mode="contained"
                color={Colors.secondary}
                onPress={getResultPressedHandler}
                loading={resultLoading}
              >
                Get Result
              </Button>
            </View>
          </View>
          <Snackbar
            message={
              resultError ? resultError.message : inputError ? inputError : ""
            }
            onDismissSnackBar={onDismissSnackBar}
            visible={visible}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  getResultsOuterView: {
    flexDirection: "column",
    justifyContent: "center",
    height: Dimensions.get("screen").height - 150,
    margin: 10,
  },
  getResultsInnerView: {
    elevation: 5,
    shadowColor: "#ccc",
    shadowOpacity: 5,
    backgroundColor: "#fff",
    padding: 10,
  },
  getResultsButtonView: {
    marginTop: 20,
  },
  getResultsErrorText: {
    color: Colors.secondary,
  },
  getResultsErrorView: {
    marginTop: 10,
  },
  getResultsLoadingView: {
    margin: 20,
  },
});

export default GetResultsScreen;
