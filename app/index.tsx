import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default function App() {
  //Set LoggedIn Status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Tab = createBottomTabNavigator();

  //Function to change LoggedIn status
  function handleIsLoggedIn(islogedIn) {
    setIsLoggedIn(islogedIn);
  }

  useEffect(() => {
    console.log("Has the right to log in: ", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      {!isLoggedIn ? (
        <LoginScreen setLoggedInStatus={handleIsLoggedIn} />
      ) : (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="AddTodo" component={AddTodo} />
            <Tab.Screen name="TodoList" component={TodoList} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

//Check that isLoggedIn == true by click
//Check that when isLoggedIn ==true Navigetor is visible
//Check that API works
