import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import DefaultPreference from "react-native-default-preference";
//import notifee from "@notifee/react-native";

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

  // __________________________________________HANDLE WEB Alerts_____________________________________

  //Check if OS === WEB to show Alerts to the WEB environment
  const alertPolyfill = (
    title: string,
    description: string,
    options,
    extra: string
  ) => {
    const result = window.confirm(
      [title, description].filter(Boolean).join("\n")
    );

    if (result) {
      const confirmOption = options.find(({ style }) => style !== "cancel");
      confirmOption && confirmOption.onPress();
    } else {
      const cancelOption = options.find(({ style }) => style === "cancel");
      cancelOption && cancelOption.onPress();
    }
  };
  const alert = Platform.OS === "web" ? alertPolyfill : Alert.alert;

  // __________________________________________Check if TODOS are already stored locally_____________________________________

  useEffect(() => {
    // Check if todos are already stored locally
    DefaultPreference.get("todos").then((storedTodos) => {
      if (!storedTodos) {
        // Fetch todos from the API and store them locally
        fetch("https://api.npoint.io/3dbe9481cd6175f6ffd8")
          .then((response) => response.json())
          .then((todos) => {
            DefaultPreference.set("todos", JSON.stringify(todos));
          })
          .catch((error) =>
            console.error("Error fetching initial todos:", error)
          );
      }
    });
  }, []);

  // __________________________________________HANDLE Add ToDoObject_____________________________________

  const [input, setInput] = useState("");
  const [reminder, setReminder] = useState(true);

  function handleInput(newInput: string) {
    setInput((prevInput) => newInput);
  }

  function handleReminder() {
    setReminder((prevReminder) => !prevReminder);
  }

  // async function handleAddTodo() {
  //   //Create a new Todo-Object
  //   const newTodo = {
  //     date: new Date().toISOString(),
  //     title: input,
  //     task_id: uuidv4(),
  //     has_reminder: reminder,
  //   };
  //   if (newTodo.title !== "") {
  //     try {
  //       // Fetch existing data from the API
  //       const response = await fetch(
  //         "https://api.npoint.io/3dbe9481cd6175f6ffd8"
  //       );
  //       const existingTodos = await response.json();
  //       // Add new Todo to the existing list
  //       const updatedTodos = [...existingTodos, newTodo];
  //       // Send updated list back to the API
  //       await fetch("https://api.npoint.io/3dbe9481cd6175f6ffd8", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(updatedTodos),
  //       });
  //       // Reset Todo input
  //       setInput("");
  //     } catch (error) {
  //       console.error("Error adding new todo:", error);
  //     }
  //   }
  //   // Reset Todo input
  //   setInput("");
  // }

  async function handleAddTodo() {
    const newTodo = {
      date: new Date().toISOString(),
      title: input,
      task_id: uuidv4(),
      has_reminder: reminder,
    };
    if (newTodo.title !== "") {
      try {
        const storedTodos = await DefaultPreference.get("todos");
        const todos = storedTodos ? JSON.parse(storedTodos) : [];
        const updatedTodos = [...todos, newTodo];
        await DefaultPreference.set("todos", JSON.stringify(updatedTodos));
        setInput("");
        Alert.alert("Success", "To-Do added successfully");
      } catch (error) {
        console.error("Error adding new todo:", error);
      }
    } else {
      Alert.alert("Error", "To-Do title cannot be empty");
    }
  }

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
          placeholder="Your ToDo"
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
