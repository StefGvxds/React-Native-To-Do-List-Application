import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import DefaultPreference from "react-native-default-preference";

//Create TAB
const Tab = createBottomTabNavigator();

//Create ToDo-Interface
// interface TodoItem {
//   date: string;
//   title: string;
//   task_id: string;
//   has_reminder: boolean;
// }

export default function App() {
  //___________________________________HANDLE LOGIN______________________

  //Set LoggedIn Status (IF === True > Grant Access)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //___________________________________HANDLE ADD TODO______________________
  // const [todos, setTodos] = useState<TodoItem[]>([]);

  // // Fetch initial data from the API
  // useEffect(() => {
  //   fetch("https://api.npoint.io/3dbe9481cd6175f6ffd8")
  //     .then((response) => response.json())
  //     .then((json) => setTodos(json))
  //     .catch((error) => console.error(error));
  // }, []);

  // const handleAddTodo = async (newTodo: TodoItem) => {
  //   try {
  //     const updatedTodos = [...todos, newTodo];
  //     setTodos(updatedTodos);

  //     await fetch("https://api.npoint.io/3dbe9481cd6175f6ffd8", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedTodos),
  //     });
  //   } catch (error) {
  //     console.error("Error adding new todo:", error);
  //   }
  // };

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
