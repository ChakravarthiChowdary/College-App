import React, { useEffect, useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  ImageBackground,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Text from "../components/Text";
import HeaderButton from "../components/HeaderButton";
import ResultsItem from "../components/ResultsItem";
import { getAvailableResults } from "../store/actions/resultsActions";
import Loading from "../components/Loading";
import { Colors } from "../constants/Colors";
import { Divider } from "react-native-paper";
import SnackBar from "../components/SnackBar";

const AvailableResultsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getAvailableResults());
    setRefreshing(false);
  }, []);

  const onDismissSnackBar = () => setVisible(false);

  //Redux level state.
  const {
    availableResults,
    availableResultsLoading,
    availableResultsError,
  } = useSelector((state) => state.results);

  //Hooks
  useEffect(() => {
    dispatch(getAvailableResults());
  }, []);

  useEffect(() => {
    if (availableResultsError) {
      setMessage(availableResultsError.message);
      setVisible(true);
    }
  }, [availableResultsError]);

  return (
    <View style={styles.resultsOuterView}>
      <View style={styles.titleView}>
        <Text style={styles.heading}>AVAILABLE RESULTS</Text>
        <Divider style={styles.divider} />
      </View>
      {availableResultsLoading ? (
        <Loading size="small" color={Colors.primary} />
      ) : (
        <View style={styles.resultsInnerView}>
          <FlatList
            data={availableResults}
            renderItem={(itemData) => (
              <ResultsItem navigation={navigation} resultItem={itemData.item} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
      <SnackBar
        message={message}
        visible={visible}
        onDismissSnackBar={onDismissSnackBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  resultsOuterView: {
    height: Dimensions.get("screen").height - 150,
    backgroundColor: "#fff",
    flex: 1,
  },
  resultsInnerView: {
    height: Dimensions.get("window").height - 150,
    padding: 10,
  },
  resultsTextHeading: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    marginBottom: 10,
    color: "#fff",
  },
  titleView: {
    marginHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  divider: {
    borderColor: Colors.secondary,
    borderWidth: 1,
    width: 100,
    marginVertical: 15,
  },
  heading: { fontSize: 18, color: "#000" },
});

export const availableResultsScreenOptions = (navData) => {
  return {
    headerTitle: "Results",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="md-menu"
          iconSize={23}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default AvailableResultsScreen;
