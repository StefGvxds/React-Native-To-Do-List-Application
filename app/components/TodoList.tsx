import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Button,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

interface TodoItem {
  date: string;
  title: string;
  task_id: string;
  has_reminder: boolean;
}

export default function ToDoList() {
  // __________________________________________HANDLE LOGIN Button_____________________________________

  const [buttonStyleOnPressSave, setButtonStyleOnPressSave] = useState(false);
  const [buttonStyleOnPressCancel, setButtonStyleOnPressCancel] =
    useState(false);

  function handleButtonStyleOnPressSave() {
    setButtonStyleOnPressSave((pressed) => !pressed);
  }

  function handleButtonStyleOnPressCancel() {
    setButtonStyleOnPressCancel((pressed) => !pressed);
  }

  const buttonStyleSave = {
    ...styles.button,
    backgroundColor: buttonStyleOnPressSave ? "blue" : "#546E7A",
  };

  const buttonStyleCancel = {
    ...styles.button,
    backgroundColor: buttonStyleOnPressCancel ? "blue" : "#546E7A",
  };

  // __________________________________________Check if TODOS are already stored locally_____________________________________
  const [data, setData] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);

  function handleLoading() {
    setLoading((prevStatus) => !prevStatus);
  }

  async function fetchData() {
    handleLoading();
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      let todos = [];
      if (storedTodos !== null) {
        todos = JSON.parse(storedTodos);
      }
      setData(todos); //
    } catch (error) {
      console.error("Error fetching or initializing todos:", error);
      handleLoading();
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        handleLoading();
        try {
          const storedTodos = await AsyncStorage.getItem("todos");
          if (storedTodos !== null) {
            const parsedTodos = JSON.parse(storedTodos);
            setData(parsedTodos);
          } else {
            const response = await fetch(
              "https://api.npoint.io/3dbe9481cd6175f6ffd8"
            );
            const initialTodos = await response.json();
            await AsyncStorage.setItem("todos", JSON.stringify(initialTodos));
            setData(initialTodos);
          }
          handleLoading();
        } catch (error) {
          console.error("Error fetching or initializing todos:", error);
          handleLoading();
        }
      }
      fetchData();
    }, [])
  );

  // __________________________________________Delete Item Component_____________________________________

  async function handleDelete(taskId: string) {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos !== null) {
        const todos = JSON.parse(storedTodos);
        const updatedTodos = todos.filter(
          (todo: TodoItem) => todo.task_id !== taskId
        );
        await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
        setData(updatedTodos);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  // __________________________________________Edit Item Component_____________________________________
  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<TodoItem | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [hasReminder, setHasReminder] = useState(false);

  function handleEdit(item: TodoItem) {
    setEditItem(item);
    setNewTitle(item.title);
    setHasReminder(item.has_reminder);
    setModalVisible(true);
  }

  async function handleSaveEdit() {
    if (editItem) {
      const updatedItem = {
        ...editItem,
        title: newTitle,
        has_reminder: hasReminder,
      };
      const updatedData = data.map((item) =>
        item.task_id === editItem.task_id ? updatedItem : item
      );
      setData(updatedData);
      await AsyncStorage.setItem("todos", JSON.stringify(updatedData));
      setModalVisible(false);
      setEditItem(null);
    }
  }

  // __________________________________________Rendering Item Component_____________________________________

  type ItemProps = {
    title: string;
    onEdit: () => void;
    onDelete: () => void;
  };

  const Item = ({ title, onEdit, onDelete }: ItemProps) => (
    <View
      style={[
        styles.item,
        {
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        },
      ]}
    >
      <Text style={[styles.title, { marginRight: 10 }]}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button title="Edit" onPress={onEdit} color="blue" />
        <View style={{ width: 10 }} />
        <Button title="Delete" onPress={onDelete} color="red" />
      </View>
    </View>
  );

  // Display loading indicator while data is being fetched or processed
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 40,
            textAlign: "center",
            padding: 20,
            color: "#546E7A",
          }}
        >
          To-Do List
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.task_id)}
          />
        )}
        keyExtractor={(item) => item.task_id}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View>
          <View style={{ marginTop: 50 }}>
            <Text
              style={{
                fontSize: 40,
                textAlign: "center",
                padding: 20,
                color: "#546E7A",
              }}
            >
              Edit Todo
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.textInput}
            />
          </View>

          <View
            style={[styles.checkboxContainer, { justifyContent: "center" }]}
          >
            <Text style={styles.checkboxLabel}>Reminder</Text>
            <Checkbox
              style={styles.checkbox}
              value={hasReminder}
              onValueChange={setHasReminder}
              color={hasReminder ? "#4630EB" : undefined}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              //When press button in, change the button style
              onPressIn={handleButtonStyleOnPressSave}
              //When press button out, change the button style back
              onPressOut={handleButtonStyleOnPressSave}
              style={buttonStyleSave}
              onPress={handleSaveEdit}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable
              //When press button in, change the button style
              onPressIn={handleButtonStyleOnPressCancel}
              //When press button out, change the button style back
              onPressOut={handleButtonStyleOnPressCancel}
              style={buttonStyleCancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#546E7A",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  checkbox: {
    margin: 8,
  },
  textInput: {
    fontSize: 25,
    color: "grey",
    padding: 5,
    borderWidth: 1,
    borderColor: "#546E7A",
    width: "60%",
    textAlign: "center",
    marginTop: 20,
    borderRadius: 4,
    height: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 25,
  },
  button: {
    width: "40%",
    height: 40,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "#546E7A",
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center", //
    alignItems: "center",
  },
});
