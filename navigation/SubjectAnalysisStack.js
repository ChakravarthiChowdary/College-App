import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import GetSubjectAnalysisScreen, {
  subjectAnalysisScreenOptions,
} from "../screens/GetSubjectAnalysisScreen";
import { SubjectAnalysisContext } from "../utils/Context";
import { defaultNavigationOptions } from "./DefaultNavOptions";
import { TabContext } from "../utils/Context";
import SubjectAnalysisScreen from "../screens/SubjectAnalysisScreen";

const SubjectAnalysisStack = createStackNavigator();
//SubjectAnalysisContext is imported from utils/context.js
export const SubjectAnalysisStackNavigator = () => {
  //Use tab context to get params
  const params = useContext(TabContext);
  return (
    <SubjectAnalysisContext.Provider value={params}>
      <SubjectAnalysisStack.Navigator screenOptions={defaultNavigationOptions}>
        <SubjectAnalysisStack.Screen
          name="subjectanalysis"
          component={GetSubjectAnalysisScreen}
          options={subjectAnalysisScreenOptions}
        />
        <SubjectAnalysisStack.Screen
          name="subjectanalysisresult"
          component={SubjectAnalysisScreen}
        />
      </SubjectAnalysisStack.Navigator>
    </SubjectAnalysisContext.Provider>
  );
};
