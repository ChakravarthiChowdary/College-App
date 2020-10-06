import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { defaultNavigationOptions } from "./DefaultNavOptions";
import AvailableResultsScreen, {
  availableResultsScreenOptions,
} from "../screens/AvailableResultsScreen";
import { ResultsTabNavigator } from "./ResultsTabNavigator";

//Results stack navigator.
const ResultsStack = createStackNavigator();
//Dynamically changing header title of results stack that holds tab navigator
const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case "getresultstab":
      return "Check Your Performance";
    case "subjectanalysistab":
      return "Subject analysis";
    case "collegetopperstab":
      return "College Toppers";
  }
};

export const ResultsStackNavigator = () => {
  return (
    <ResultsStack.Navigator screenOptions={defaultNavigationOptions}>
      <ResultsStack.Screen
        name="resultsstack"
        component={AvailableResultsScreen}
        options={availableResultsScreenOptions}
      />
      <ResultsStack.Screen
        name="getresultsstack"
        component={ResultsTabNavigator}
        options={getResultsTabNavOptions}
      />
    </ResultsStack.Navigator>
  );
};

const getResultsTabNavOptions = ({ route }) => ({
  headerTitle: getHeaderTitle(route),
});
