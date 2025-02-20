import { Text, View, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import data from '../data/data.json'
import Octicons from '@expo/vector-icons/Octicons';
import ButtomNew from "@/components/ButtomNew";
import { useRouter } from 'expo-router';
import { useState, useEffect } from "react";
import { listTasks } from "@/api/task";

import { Task } from '@/types/task';

export default function Index() {

  const router = useRouter();

  const [tasks, setTasks] = useState<Task | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const response = await listTasks();
        if (!response.data) {
          throw new Error();
        }
        const data: Task = response.data.map(row => {
          return {
            id: row.id,
            message: row.message,
            status: row.status,  
          };
        });
        setTasks(data);
      } catch (error) {
        Alert.alert("Failed to fetch the data");
      }
      finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  const navigateToNewTaskScreen = () => {
    router.push("/newTask");
  } 

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
    >
      <FlatList 
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={<View style={{height: 20}}/>}
        renderItem={({item}) => (
          <View style={styles.taskContainer}>
            {item.status === 1
              ? <Octicons name="check-circle-fill" size={27} color="#9B87F5" style={{ marginRight: 15 }} /> 
              : <Octicons name="check-circle" size={27} color="#a3a3a4" style={{ marginRight: 15 }} />
            }
            <Text style={{...styles.taskText, textDecorationLine: item.status === 1 ? 'line-through' : 'none'}}>{item.message}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyComponent}>
            <Text style={styles.taskText}>No tasks were found</Text>
          </View>}
      />
      <Pressable 
        style={styles.pressable}
        onPress={navigateToNewTaskScreen}
      >
        <ButtomNew buttomColor="#9B87F5" buttomSize={62}/>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 23,
    width: '100%',
  },
  listContainer: {
    // paddingBottom: 30,
  },
  taskContainer: {
    width: '100%',
    height: 70,
    backgroundColor: '#FFF',
    marginBottom: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d0d0a0',
    paddingHorizontal: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    color: '#3a3a3a',
    textDecorationColor: '#3a3a3a'
  },
  emptyComponent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressable: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
});