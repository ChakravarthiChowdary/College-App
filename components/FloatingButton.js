import React, { useState } from "react";
import { FAB, Portal, Provider } from "react-native-paper";
import { captureScreen } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

import { Colors } from "../constants/Colors";
import { Alert } from "react-native";

const FloatingButton = ({ name }) => {
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const savePressedHandler = async () => {
    const uri = await captureScreen({
      format: "jpg",
      quality: 0.8,
    });
    const filename = name + ".jpg";
    const newPath = FileSystem.documentDirectory + filename;

    try {
      await FileSystem.moveAsync({
        from: uri,
        to: newPath,
      });
      Alert.alert("Image Save", "Your result is stored.", [{ text: "OK" }]);
    } catch (error) {
      Alert.alert("Error Occured", "Cannot Save Screenshot", [{ text: "OK" }]);
    }
  };

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon="content-save-all"
          actions={[
            {
              icon: "content-save-all",
              onPress: () => {
                savePressedHandler();
              },
            },
          ]}
          fabStyle={{ backgroundColor: Colors.secondary }}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default FloatingButton;
