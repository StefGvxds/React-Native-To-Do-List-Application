import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { v4 as uuidv4 } from "uuid";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
    };
  }

  handleAddTodo = () => {
    const newTodo = {
      id: uuidv4(),
      text: this.state.todo,
      completed: false,
    };
    // Logik zum Hinzufügen eines neuen To-Do-Elements
  };

  render() {
    return (
      <View>
        <Text>Add a new To-Do</Text>
        <TextInput
          placeholder="Enter To-Do"
          value={this.state.todo}
          onChangeText={(todo) => this.setState({ todo })}
        />
        <Button title="Add To-Do" onPress={this.handleAddTodo} />
      </View>
    );
  }
}

export default AddTodo;
