import { Text, View, StyleSheet, FlatList } from "react-native";
import data from '../data/data.json'
import Octicons from '@expo/vector-icons/Octicons';

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <View style={styles.taskContainer}>
            {item.completed 
              ? <Octicons name="check-circle-fill" size={27} color="#9B87F5" style={{ marginRight: 15 }} /> 
              : <Octicons name="check-circle" size={27} color="#a3a3a4" style={{ marginRight: 15 }} />
            }
            <Text style={{... styles.taskText, textDecorationLine: item.completed ? 'line-through' : 'none'}}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 23,
    width: '100%',
  },
  listContainer: {
    width: '100%',
    height: '100%',
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
});