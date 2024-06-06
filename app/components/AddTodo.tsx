import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import notifee, {
  AndroidImportance,
  AndroidStyle,
  AndroidVisibility,
  EventType,
} from "@notifee/react-native";

export default function AddTodo() {
  // __________________________________________HANDLE LOGIN Button_____________________________________

  //Change Button-style when button is pressed
  const [buttonStyleOnPress, setButtonStyleOnPress] = useState(false);

  //Change Boolean Status when Button is pressed False -> True || True -> False
  function handleButtonStyleOnPress() {
    setButtonStyleOnPress((pressed) => !pressed);
  }

  //Change the Button Style when buttonStyleOnPress === True
  const buttonStyle = {
    ...styles.button,
    backgroundColor: buttonStyleOnPress ? "blue" : "#546E7A",
  };
  // __________________________________________HANDLE Add ToDoObject_____________________________________

  const [input, setInput] = useState("");

  function handleInput(newInput) {
    setInput((prevInput) => newInput);
  }

  async function handleAddTodo() {
    //Create a new Todo-Object
    const newTodo = {
      id: uuidv4(),
      text: input,
      completed: false,
    };

    //Request permission for displaying notifications for IOS
    await notifee.requestPermission();

    //create a notification channel, which is required for Android
    const channelId = await notifee.createChannel({
      id: "unique_channel_id",
      name: "Channel Name",
      sound: "default",
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      vibration: true,
    });

    //proceed to display a notification
    await notifee.displayNotification({
      id: channelId,
      title: "Notification Title",
      body: "Notification Body",
      android: {
        channelId,
        largeIcon: "path_to_large_icon",
        style: {
          type: AndroidStyle.BIGTEXT,
          text: "Additional text for expanded view",
        },
      },
    });

    // Notification
    // try {
    //   // Schedule notification
    //   await notifee.scheduleNotification({
    //     content: {
    //       title: "New ToDo",
    //       body: `You have a new ToDo: ${input}`,
    //     },
    //     trigger: {
    //       seconds: 5,
    //     },
    //   });
    // } catch (error) {
    //   console.error("Notification error:", error);
    // }

    // Reset Todo input
    setInput("");
  }

  // async function onDisplayNotification() {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: "default",
  //     name: "Default Channel",
  //   });

  // Display a notification
  //   await notifee.displayNotification({
  //     title: "Notification Title",
  //     body: "Main body content of the notification",
  //     android: {
  //       channelId,
  //       smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: "default",
  //       },
  //     },
  //   });
  // }

  // useEffect(() => {
  //   async function requestPermissions() {
  //     const settings = await notifee.requestPermission();

  //     if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
  //       console.log("User declined permissions");
  //     } else if (
  //       settings.authorizationStatus === AuthorizationStatus.AUTHORIZED
  //     ) {
  //       console.log("Permission settings:", settings);
  //     } else if (
  //       settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
  //     ) {
  //       console.log("Provisional permissions granted");
  //     }
  //   }

  //   requestPermissions();
  // }, []);

  //Check Notification Permission
  // async function onAppBootstrap() {
  //   const answer = await notifee.requestPermission();
  //   console.log(answer);
  // }

  return (
    <View>
      <View style={{ marginBottom: 100 }}>
        <Text
          style={{
            fontSize: 40,
            textAlign: "center",
            padding: 20,
            color: "#546E7A",
          }}
        >
          Add a new To-Do
        </Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="What have you ToDo?"
          style={styles.textInput}
          value={input}
          onChangeText={handleInput}
        />
        <Pressable
          //When press button in, change the button style
          onPressIn={handleButtonStyleOnPress}
          //When press button out, change the button style back
          onPressOut={handleButtonStyleOnPress}
          style={buttonStyle}
          onPress={handleAddTodo}
        >
          <Text style={styles.buttonText}>Add To-Do</Text>
        </Pressable>
      </View>
    </View>
  );
}
//{/* TestButton */}
//<View style={{ marginTop: 200 }}>
//  <Button onPress={onDisplayNotification} title="Click Me" />
//</View>
//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Vertikal zentrieren
    alignItems: "center", // Horizontal zentrieren
  },
  textInput: {
    fontSize: 25,
    color: "grey",
    padding: 5,
    borderWidth: 1,
    borderColor: "#546E7A",
    width: "40%",
    textAlign: "center",
    marginTop: 20,
    borderRadius: 4,
    height: 40,
  },
  button: {
    width: "40%",
    height: 40,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 10,
    backgroundColor: "#546E7A",
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
});
//2. Where to save
//1. Add Notifee
