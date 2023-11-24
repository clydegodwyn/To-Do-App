import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTodo = () => {
    if (text.trim() !== '') {
      if (editId !== null) {
        setTodos(todos.map(todo =>
          todo.id === editId ? { ...todo, text } : todo
        ));
        setEditId(null);
        setIsEditing(false);
      } else {
        const newTodo = { id: Math.random().toString(), text: text };
        setTodos([...todos, newTodo]);
      }
      setText('');
    } else {
      Alert.alert('Task cannot be empty!');
    }
  };

  const startEdit = (id, initialText) => {
    setEditId(id);
    setText(initialText);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditId(null);
    setText('');
    setIsEditing(false);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (editId === id) {
      cancelEdit();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.centeredTitle]}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <View style={styles.todoTextContainer}>
              {editId === item.id ? (
                <TextInput
                  style={styles.editInput}
                  value={text}
                  onChangeText={(text) => setText(text)}
                />
              ) : (
                <Text style={styles.todoText}>{item.text}</Text>
              )}
            </View>
            {!isEditing && editId !== item.id && (
              <TouchableOpacity style={styles.editButton} onPress={() => startEdit(item.id, item.text)}>
                <Text style={[styles.buttonText, styles.editButtonText]}>Edit</Text>
              </TouchableOpacity>
            )}
            {isEditing && editId === item.id ? (
              <TouchableOpacity style={styles.editButton} onPress={addTodo}>
                <Text style={[styles.buttonText, styles.editButtonText]}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.deleteButton, styles.editButton]} onPress={() => deleteTodo(item.id)}>
                <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6d6a94',
    textAlign: 'center', 
  },
  centeredTitle: {
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#6d6a94',
    padding: 10,
    marginRight: 10,
    flex: 1,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#6d6a94',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#e5e3f3',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 18,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#6d6a94',
    padding: 8,
    marginBottom: 10,
    flex: 1,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#6d6a94',
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButtonText: {
    textAlign: 'center',
  },
  taskList: {
    flex: 1,
  },
});

export default App;
