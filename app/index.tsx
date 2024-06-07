import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

//Create TAB
const Tab = createBottomTabNavigator();

export default function App() {
  //___________________________________HANDLE LOGIN______________________

  //Set LoggedIn Status (IF === True > Grant Access)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [updateList, setUpdateList] = useState(false);

  // function handleUpdateList() {
  //   setUpdateList((prevUpdateList) => !prevUpdateList);
  // }

  return (
    // <>
    //   {!isLoggedIn ? (
    //     <LoginScreen setLoggedInStatus={handleIsLoggedIn} />
    //   ) : (
    <Tab.Navigator>
      {/* <Tab.Screen name="AddTodo">
        {(props) => (
          <AddTodo
            {...props}
            setUpdateList={() => {
              handleUpdateList();
            }}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="TodoList">
        {(props) => <TodoList {...props} updateList={updateList} />}
      </Tab.Screen> */}

      {/* OLD */}
      <Tab.Screen name="AddTodo" component={AddTodo} />
      <Tab.Screen name="TodoList" component={TodoList} />
    </Tab.Navigator>
    //   )}
    // </>
  );
}
