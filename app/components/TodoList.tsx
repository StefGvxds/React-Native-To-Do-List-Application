import React, { Component } from "react";
import { View, Text, FlatList, Button } from "react-native";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    // Initiale Datenabruflogik
  }

  renderItem = ({ item }) => (
    <View>
      <Text>{item.text}</Text>
      <Button title="Edit" onPress={() => this.handleEdit(item.id)} />
      <Button title="Delete" onPress={() => this.handleDelete(item.id)} />
    </View>
  );

  render() {
    return (
      <View>
        <Text>To-Do List</Text>
        <FlatList
          data={this.state.todos}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

export default TodoList;
