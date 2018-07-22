import React, {Component} from 'react'
import {View, Button, FlatList} from 'react-native'
import uuid from 'react-native-uuid';
import TodoItem from './TodoItem';
import Database from './db/Database';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {tasks:[]};
    this.realm = null;
  }

  async componentDidMount() {
    await this.init();
    this.state.tasks = await this.realm.objects('Task');
  }

  async init() {
    if (this.realm === null) {
      this.realm = await Database.getRealmInstance();
    }
  }

  add(task) {
    this.realm.write(() => {
      const task = this.realm.create('Task', {
        id: uuid.v4(),
        task,
        done:false
      })
    })
  }

  onDelete(todo) {

  }

  render() {
    return (
        <View>
          <FlatList
              data={this.state.tasks}
              renderItem={({item}) => <TodoItem
                  todo={item}
                  key={item.id}
                  onDelete={this.onDelete}
              />}
          />
            <Button onPress={add('Test')} title='Add'/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  info:{
    fontSize: 22,
  }
});

export default Todo;

