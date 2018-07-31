import React, { Component } from 'react';
import {Text, View, Button, FlatList} from 'react-native';
import TodoModel from './TodoModel';
import TodoService from './TodoService';
import uuid from 'react-native-uuid'
import TodoApi from "../api/TodoApi";
import BackgroundTask from '../background-task'

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

class ListView extends Component {
  constructor() {
    super();
    this.updateDataList = this.updateDataList.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this._onCompletedChange = this._onCompletedChange.bind(this);
    this.state = {
      dataList: []
    };
  }

  async componentDidMount(){
    await TodoApi.getTasks();
    this.updateDataList();
    BackgroundTask.schedule();
    await this.checkStatus();
  }

  async checkStatus() {
    const status = await BackgroundTask.statusAsync();
    console.log('BackgroundTask status:' + status.available);
  }

  updateDataList() {
    this.setState({
      dataList: TodoService.findAll()
    });
  }
  _onCompletedChange() {
    if (this.forceUpdate) this.forceUpdate();
  }

  addTodo(){
    TodoService.save(new TodoModel(uuid.v4()));
    this.updateDataList();
  }

  render() {
    let listView = <View />;
    if (this.state.dataList.length) {
      listView = (
        <FlatList
          ref="listView"
          style={{ flex: 1 }}
          data={this.state.dataList}
          renderItem = {({item}) => <Text>{item.name}</Text>}
        />
      );
    }

    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Button onPress={this.addTodo} title='Add'/>
        {listView}
      </View>
    );
  }
}

export default ListView;
