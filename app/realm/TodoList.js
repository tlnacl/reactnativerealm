import React, { Component } from 'react';
import {Text, View, Button} from 'react-native';
import {ListView} from 'realm/react-native'
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
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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

  _renderRow(todo) {
    return (
        <Text>{todo.name}</Text>
    )
  }


  addTodo(){
    TodoService.save(new TodoModel(uuid.v4()));
  }

  render() {
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Button onPress={this.addTodo} title='Add'/>
        <ListView
            contentContainerStyle={{ flex: 1 }}
            dataSource={this.ds.cloneWithRows(this.todoList)}
            renderRow={this._renderRow.bind(this)}
            enableEmptySections={true}/>
      </View>
    );
  }
}

export default TodoList;
