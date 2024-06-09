import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Button,
} from "react-native";
//import DefaultPreference from "react-native-default-preference";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

interface TodoItem {
  date: string;
  title: string;
  task_id: string;
  has_reminder: boolean;
}

// interface TodoListProps {
//   updateList?: boolean;
// }
// export default function ToDoList({ updateList }: TodoListProps) {

export default function ToDoList() {
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
      setData(todos); // Setzen der Daten sofort, um sicherzustellen, dass die UI aktualisiert wird
      // Rest des Codes...
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
            onEdit={() => console.log("Edit item with task_id:", item.task_id)}
            onDelete={() => handleDelete(item.task_id)}
          />
        )}
        keyExtractor={(item) => item.task_id}
      />
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
  },
  title: {
    fontSize: 32,
  },
});
