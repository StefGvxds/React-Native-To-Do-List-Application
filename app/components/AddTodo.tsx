import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  interface AlertOption {
    style: "cancel" | string; // 'cancel' and other possible string values
    onPress: () => void; // function that gets called when option is selected
  }

  //Check if OS === WEB to show Alerts to the WEB environment
  const alertPolyfill = (
    title: string,
    description: string,
    options: AlertOption[],
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

  // __________________________________________HANDLE Add ToDoObject_____________________________________

  const [input, setInput] = useState("");
  const [reminder, setReminder] = useState(true);

  function handleInput(newInput: string) {
    setInput((prevInput) => newInput);
  }

  async function handleAddTodo() {
    const newTodo = {
      date: new Date().toISOString(),
      title: input,
      task_id: uuidv4(),
      has_reminder: reminder,
    };
    if (newTodo.title !== "") {
      try {
        const storedTodos = await AsyncStorage.getItem("todos");
        let todos = [];
        if (storedTodos !== null) {
          todos = JSON.parse(storedTodos);
        }
        todos.push(newTodo);
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
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

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
