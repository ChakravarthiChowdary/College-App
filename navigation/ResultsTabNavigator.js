import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { TabContext } from "../utils/Context";
import { SubjectAnalysisStackNavigator } from "./SubjectAnalysisStack";
import { GetResultsStackNavigator } from "./GetResultsStack";
import { Colors } from "../constants/Colors";
import CollegeToppersScreen from "../screens/CollegeToppersScreen";

const ResultsTab = createMaterialBottomTabNavigator();

const getResultsTabOptions = {
  title: "Get Results",
};

const subjectAnalysisTabOptions = {
  title: "Subject Analysis",
};

const collegeToppersTabOptions = {
  title: "College Toppers",
};

const defaultTabNavOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color }) => {
    let iconName;

    if (route.name === "getresultstab") {
      iconName = focused
        ? "md-information-circle"
        : "md-information-circle-outline";
    } else if (route.name === "subjectanalysistab") {
      iconName = focused ? "md-list-box" : "md-list";
    } else if (route.name === "collegetopperstab") {
      iconName = focused ? "md-star" : "md-star-outline";
    }
    return <Ionicons name={iconName} size={23} color={color} />;
  },
});

export const ResultsTabNavigator = ({ route }) => {
  return (
    <TabContext.Provider value={route.params.params.result}>
      <ResultsTab.Navigator
        screenOptions={defaultTabNavOptions}
        activeColor="#fff"
        inactiveColor="rgba(255,255,255,0.8)"
        barStyle={{ backgroundColor: Colors.primary }}
      >
        <ResultsTab.Screen
          name="getresultstab"
          component={GetResultsStackNavigator}
          options={getResultsTabOptions}
        />
        <ResultsTab.Screen
          name="subjectanalysistab"
          component={SubjectAnalysisStackNavigator}
          options={subjectAnalysisTabOptions}
        />
        <ResultsTab.Screen
          name="collegetopperstab"
          component={CollegeToppersScreen}
          options={collegeToppersTabOptions}
        />
      </ResultsTab.Navigator>
    </TabContext.Provider>
  );
};
