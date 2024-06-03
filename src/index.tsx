import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { createInterface } from "readline/promises";
import { StyleSheet } from "react-native";
import DefaultPreference from "react-native-default-preference";

export default function Login() {
  const router = useRouter();

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
          style={(styles.text, styles.textInput)}
          value={username}
          onChangeText={handleUsername}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={(styles.text, styles.textInput)}
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
