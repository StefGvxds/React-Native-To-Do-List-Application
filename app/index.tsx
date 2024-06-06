import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const Tab = createBottomTabNavigator();

export default function App() {
  //Set LoggedIn Status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // <>
    //   {!isLoggedIn ? (
    //     <LoginScreen setLoggedInStatus={handleIsLoggedIn} />
    //   ) : (
    <Tab.Navigator>
      <Tab.Screen name="AddTodo" component={AddTodo} />
      <Tab.Screen name="TodoList" component={TodoList} />
    </Tab.Navigator>
    //   )}
    // </>
  );
}
