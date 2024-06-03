import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import TabNavigator from "./screens/TabNavigator";
import { useState, useEffect } from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  //Set LoggedIn Status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Function to change LoggedIn status
  function handleIsLoggedIn(islogedIn) {
    setIsLoggedIn((islogedIn) => islogedIn);
  }

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      {!isLoggedIn && <LoginScreen setLoggedInStatus={handleIsLoggedIn} />}
      {isLoggedIn && (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="AddTodo" component={TabNavigator} />
            <Tab.Screen name="TodoList" component={TabNavigator} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
