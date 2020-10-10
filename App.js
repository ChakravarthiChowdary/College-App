import { useFonts } from "expo-font";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import AppNavigator from "./navigation/AppNavigator";
import authReducer from "./store/reducers/authReducer";
import commonReducer from "./store/reducers/commonReducer";
import contactReducer from "./store/reducers/contactReducer";
import resultsReducer from "./store/reducers/resultsReducer";

const rootReducer = combineReducers({
  results: resultsReducer,
  auth: authReducer,
  contact: contactReducer,
  common: commonReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const [loaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
});
