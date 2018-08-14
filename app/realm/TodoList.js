import React, { Component } from 'react';
import {Text, View, Button, FlatList} from 'react-native';
import TodoModel from './TodoModel';
import TodoService from './TodoService';
import uuid from 'react-native-uuid'
import TodoApi from "../api/TodoApi";
import BackgroundTask from '../background-task'
import to from '../Utils'

BackgroundTask.define(
    async () => {
      console.log('Hello from a background task')

      TodoService.save(new TodoModel(`background Task ${new Date()}`));

      // Or, instead of just setting a timestamp, do an http request
      /* const response = await fetch('http://worldclockapi.com/api/json/utc/now')
      const text = await response.text()
      await AsyncStorage.setItem('@MySuperStore:times', text) */

      BackgroundTask.finish()
    },
);

class TodoList extends Component {
  constructor() {
    super();
    this.addTodo = this.addTodo.bind(this);
    this.todoList = TodoService.findAll();
    this.todoList.addListener(this.changeListener.bind(this));
  }

  async componentDidMount(){
    await to(TodoApi.getTasks());
    BackgroundTask.schedule();
    await this.checkStatus();
  }

  componentWillUnmount() {
    this.todoList.removeAllListeners();
  }

  async checkStatus() {
    const status = await BackgroundTask.statusAsync();
    console.log('BackgroundTask status:' + status.available);
  }


  changeListener() {
    this.forceUpdate();
  }

  addTodo(){
    TodoService.save(new TodoModel(uuid.v4()));
  }

  render() {
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Button onPress={this.addTodo} title='Add'/>
        <FlatList
            ref="listView"
            style={{ flex: 1 }}
            data={this.todoList}
            renderItem = {({item}) => <Text>{item.name}</Text>}
        />
      </View>
    );
  }
}

export default TodoList;
