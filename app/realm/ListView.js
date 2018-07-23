import React, { Component } from 'react';
import {Text, View, TouchableHighlight, Button} from 'react-native';
import TodoModel from './TodoModel';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';
import TodoService from './TodoService';
import uuid from 'react-native-uuid'

let dataList = TodoService.findAll();
var dataListOrder = getOrder(dataList);

function getOrder(list) {
  return Object.keys(list);
}

function moveOrderItem(listView, fromIndex, toIndex) {
  Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
  if (listView.forceUpdate) listView.forceUpdate();
}

class ListView extends Component {
  constructor() {
    super();
    this.updateDataList = this.updateDataList.bind(this);
    this._onCompletedChange = this._onCompletedChange.bind(this);
    this.state = {
      dataList: dataList
    };
  }
  updateDataList(dataList) {
    dataListOrder = getOrder(dataList);
    this.setState({
      dataList: dataList
    });
  }
  _onCompletedChange() {
    if (this.forceUpdate) this.forceUpdate();
  }

  addTodo(){
    TodoService.save(new TodoModel(uuid.v4()));
  }

  render() {
    let listView = <View />;
    if (this.state.dataList.length) {
      listView = (
        <SortableListView
          ref="listView"
          style={{ flex: 1 }}
          data={this.state.dataList}
          order={dataListOrder}
          onRowMoved={e => moveOrderItem(this, e.from, e.to)}
          renderRow={(dataItem, section, index) => (
            <ListViewItem
              data={dataItem}
              onCompletedChange={this._onCompletedChange}
            />
          )}
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
