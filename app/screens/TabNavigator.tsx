import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

const Tab = createBottomTabNavigator();

class TabNavigator extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="AddTodo" component={AddTodo} />
        <Tab.Screen name="TodoList" component={TodoList} />
      </Tab.Navigator>
    );
  }
}

export default TabNavigator;
