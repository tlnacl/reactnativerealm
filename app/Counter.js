import React, {Component} from 'react'
import {Text, View,Button} from 'react-native'

const Realm = require('realm');

class Counter extends Component {
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

  add() {
    this.realm.write(() => {
      this.realm.objects('Counter').value

    })
  }

  delete() {

  }

  render() {
    const info = this.state.realm
        ? 'Current number of counter: ' + this.state.realm.objects('Counter').length
        : 'Loading...';

    return (
        <View>
          <Text style={styles.info}>
            {info}
          </Text>
          <FlatList
              data={this.state.tasks}
              renderItem={({item}) => <Text>{item.task}</Text>}
          />
          <Button style={styles.info} onPress={add} title='Add'/>
          <Button style={styles.info} onPress={delete} title='Delete'/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  info:{
    fontSize: 22,
  }
};

export default Counter;

