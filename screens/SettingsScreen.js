import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-native-paper";

import HeaderButton from "../components/HeaderButton";
import Text from "../components/Text";
import { Colors } from "../constants/Colors";
import { getAppData } from "../store/actions/commonActions";
import Loading from "../components/Loading";
import { Fragment } from "react";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { version, loading, updateText } = useSelector((state) => state.common);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useEffect(() => {
    dispatch(getAppData());
  }, []);

  return (
    <View style={styles.settingsScreenOuterView}>
      <View style={styles.settingsScreenPushView}>
        <View style={styles.settingsScreenIconView}>
          <Ionicons
            name={
              Platform.OS === "android"
                ? "md-notifications"
                : "ios-notifications"
            }
            size={32}
          />
          <View style={styles.settingsScreenText}>
            <Text style={{ fontSize: 18 }}>Enable push notifications</Text>
            <Text style={{ fontSize: 14 }}>
              For latest updates and notifications.
            </Text>
          </View>
        </View>
        <View>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color={Colors.secondary}
          />
        </View>
      </View>
      <View style={styles.settingsScreenCacheView}>
        <View style={styles.settingsScreenIconView}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={32}
          />
          <View style={styles.settingsScreenText}>
            <Text style={{ fontSize: 18 }}>Clear cache</Text>
            <Text style={{ fontSize: 14 }}>
              This Clears cache for this app.
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("settingsprivacy")}>
        <View style={styles.settingsScreenCacheView}>
          <View style={styles.settingsScreenIconView}>
            <Ionicons
              name={Platform.OS === "android" ? "md-lock" : "ios-lock"}
              size={32}
            />
            <View style={styles.settingsScreenText}>
              <Text style={{ fontSize: 18 }}>Privacy policy</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("settingscontact")}>
        <View style={styles.settingsScreenCacheView}>
          <View style={styles.settingsScreenIconView}>
            <Ionicons
              name={Platform.OS === "android" ? "md-mail" : "ios-mail"}
              size={32}
            />
            <View style={{ ...styles.settingsScreenText, marginLeft: 15 }}>
              <Text style={{ fontSize: 18 }}>Contact us</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("settingscurrentversion")}
          style={{ ...styles.settingsScreenCacheView, paddingRight: 10 }}
        >
          {loading ? (
            <Loading size="small" color={Colors.primary} />
          ) : (
            updateText !== "" && (
              <Fragment>
                <View style={styles.settingsScreenIconView}>
                  <Ionicons
                    name={
                      Platform.OS === "android"
                        ? "md-information-circle"
                        : "ios-information-circle"
                    }
                    size={32}
                  />
                  <View
                    style={{ ...styles.settingsScreenText, marginLeft: 15 }}
                  >
                    <Text style={{ fontSize: 18 }}>Current version</Text>
                  </View>
                </View>
                <View>
                  <Text>{version === 1 ? "1.0" : version}</Text>
                </View>
              </Fragment>
            )
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsScreenOuterView: {
    margin: 20,
  },
  settingsScreenPushView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderBottomColor: "#ccc",
  },
  settingsScreenIconView: {
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  settingsScreenText: { fontSize: 16, marginLeft: 20 },
  settingsScreenCacheView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderBottomColor: "#ccc",
    marginTop: 20,
  },
});

export const settingsScreenOptions = (navData) => {
  return {
    headerTitle: "Settings",
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

export default SettingsScreen;
