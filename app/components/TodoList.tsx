import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        setLoading(true);
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
          setLoading(false);
        } catch (error) {
          console.error("Error fetching or initializing todos:", error);
          setLoading(false);
        }
      }
      fetchData();
    }, [])
  );

  // __________________________________________Rendering Item Component_____________________________________

  type ItemProps = {
    title: string;
  };

  const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
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
        renderItem={({ item }) => <Item title={item.title} />}
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
