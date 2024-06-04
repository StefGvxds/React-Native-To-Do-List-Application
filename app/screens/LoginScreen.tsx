import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";

export default function LoginScreen({ setLoggedInStatus }) {
  // __________________________________________HANDLE WEB Alerts_____________________________________
  const alertPolyfill = (title, description, options, extra) => {
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

  // __________________________________________HANDLE LOGIN_____________________________________
  //Username and Password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //API
  const endpoint = "https://api.npoint.io/f74e690311e2654a5f8f";
  // const { usernameAPI, passwordAPI } = endpoint;

  //Function to handle change Username
  function handleUsername(newUsername) {
    setUsername((prevUsername) => newUsername);
  }

  //Function to handle change Password
  function handlePassword(newPassword) {
    setPassword((prevPassword) => newPassword);
  }

  //Function to handle the login
  async function handleLogin() {
    //   try {
    //     const response = await fetch(endpoint, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     const data = await response.json();
    //     if (data.username === username && data.password === password) {
    //       setLoggedInStatus(true);
    //     } else {
    //       alert("Ooops!", "Invalid password or username", [{ text: "ok" }]);
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }

    setLoggedInStatus(true);
  }

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

  return (
    <View>
      <Text
        style={{
          fontSize: 40,
          textAlign: "center",
          padding: 20,
          color: "#546E7A",
        }}
      >
        ToDo-Application
      </Text>

      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          style={styles.textInput}
          value={username}
          onChangeText={handleUsername}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.textInput}
          value={password}
          onChangeText={handlePassword}
        />
        <Pressable
          //When press button in, change the button style
          onPressIn={handleButtonStyleOnPress}
          //When press button out, change the button style back
          onPressOut={handleButtonStyleOnPress}
          style={buttonStyle}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

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
