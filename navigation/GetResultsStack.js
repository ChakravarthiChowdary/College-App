import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { GetResultsContext } from "../utils/Context";
import GetResults, {
  getResultsScreenOptions,
} from "../screens/GetResultsScreen";
import { defaultNavigationOptions } from "./DefaultNavOptions";
import ResultsScreen from "../screens/ResultsScreen";
import { TabContext } from "../utils/Context";

const GetResultsStack = createStackNavigator();
//GetResultsContext is imported from utils/context.js
export const GetResultsStackNavigator = () => {
  //use tab context to pass params to get results stack
  const params = useContext(TabContext);
  return (
    <GetResultsContext.Provider value={params}>
      <GetResultsStack.Navigator screenOptions={defaultNavigationOptions}>
        <GetResultsStack.Screen
          name="getresults"
          component={GetResults}
          options={getResultsScreenOptions}
        />
        <GetResultsStack.Screen name="results" component={ResultsScreen} />
      </GetResultsStack.Navigator>
    </GetResultsContext.Provider>
  );
};
