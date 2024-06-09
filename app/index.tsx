import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { Pressable, StyleSheet, Text } from "react-native";

//Create TAB
const Tab = createBottomTabNavigator();

export default function App() {
  //___________________________________HANDLE LOGIN______________________

  //Set LoggedIn Status (IF === True > Grant Access)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleIsLoggedIn = (status: boolean) => {
    setIsLoggedIn(status);
    setButtonStyleOnPress(false);
  };

  function handleLogOut() {
    setIsLoggedIn(false);
  }

  // __________________________________________HANDLE Button_____________________________________

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

  return (
    <>
      {!isLoggedIn ? (
        <LoginScreen setLoggedInStatus={handleIsLoggedIn} />
      ) : (
        <>
          <Pressable
            //When press button in, change the button style
            onPressIn={handleButtonStyleOnPress}
            //When press button out, change the button style back
            onPressOut={handleButtonStyleOnPress}
            style={buttonStyle}
            onPress={handleLogOut}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="AddTodo" component={AddTodo} />
            <Tab.Screen name="TodoList" component={TodoList} />
          </Tab.Navigator>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    width: "20%",
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 10,
    backgroundColor: "#546E7A",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
