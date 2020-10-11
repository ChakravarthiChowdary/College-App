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

import { Colors } from "../constants/Colors";
import { getResult } from "../store/actions/resultsActions";
import { GetResultsContext } from "../utils/Context";
import { CLEAR_RESULT_STATE } from "../store/actions/resultsActions";
import TextInput from "../components/TextInput";
import Text from "../components/Text";
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
            <Text style={styles.verifyYourself}>Get Results</Text>
            <View style={styles.dividerView}>
              <Divider style={styles.divider} />
            </View>
            <View>
              <TextInput
                label="Enter your HNO"
                mode="outlined"
                onChangeText={inputChangedHandler}
                style={{ backgroundColor: "#fff" }}
                onFocus={() => setVisible(false)}
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
        </View>
      </TouchableWithoutFeedback>
      <Snackbar
        message={
          resultError ? resultError.message : inputError ? inputError : ""
        }
        onDismissSnackBar={onDismissSnackBar}
        visible={visible}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  getResultsOuterView: {
    flexDirection: "column",
    justifyContent: "center",
    height: Dimensions.get("screen").height - 150,

    padding: 10,
  },
  getResultsInnerView: {
    elevation: 5,
    shadowColor: "#ccc",
    shadowOpacity: 5,
    backgroundColor: "#fff",
    padding: 20,
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

export default GetResultsScreen;
