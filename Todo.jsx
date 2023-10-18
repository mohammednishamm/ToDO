import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Todo = () => {
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    
  };

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const saveTodos = (todosToSave) => {
    AsyncStorage.setItem('todos', JSON.stringify(todosToSave))
      .catch((error) => {
        console.error('Error saving todos to local storage:', error);
      });
  };

  useEffect(() => {
     AsyncStorage.getItem('todos')
      .then((data) => {
        if (data) {
          setTodos(JSON.parse(data));
        }
      })
      .catch((error) => {
        console.error('Error loading todos from local storage:', error);
      });
  }, []);

  const addTodo = () => {
    
    if (todo.trim() !== '') {
      const newTodo = { id: Date.now(), Text: todo };
      setTodos([...todos, newTodo]);
      saveTodos([...todos, newTodo]);
      setTodo('');
    }
  };

  return (
    <ScrollView>
      <View>
        <TextInput
          style={{ width: 340, backgroundColor: 'white', color: 'grey', marginLeft: 10, fontSize: 18, borderRadius: 10 }}
          value={todo}
          onChangeText={(text) => setTodo(text)}
          placeholder="Add item..."
        />
        <TouchableOpacity
          style={{ width: 340, height: 50, backgroundColor: 'white', marginTop: 10, marginLeft: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginBottom: 20 }}
          onPress={addTodo}
        >
          <Text style={{ fontSize: 18, color: 'grey' }}>Add</Text>
        </TouchableOpacity>
        {todos.map((item) => {
          return (
            <View
              key={item.id}
              style={{ width: 340, height: 50, backgroundColor: 'white', justifyContent: 'space-between', margin: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: 'grey', marginLeft: 10, fontSize: 20 }}>{item.Text}</Text>
              <Text style={{ color: 'grey', marginRight: 10, fontSize: 18 }} onPress={() => deleteTodo(item.id)}>X</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default Todo;

const styles = StyleSheet.create({});
