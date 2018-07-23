import React, { Component } from 'react';
import { Text, View, TouchableHighlight, FlatList } from 'react-native';
import TodoModel from './TodoModel';
import OmniBox from './OmniBox';
import ListViewItem from './ListViewItem';
import Utils from './Utils';
import TodoService from './TodoService';

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
  render() {
    let listView = <View />;
    if (this.state.dataList.length) {
      listView = (
          <FlatList
              ref="listView"
              style={{ flex: 1 }}
              data={this.state.dataList}
              renderRow={(dataItem) => (
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
          <OmniBox
              data={Array.from(dataList)}
              updateDataList={this.updateDataList}
          />
          {listView}
        </View>
    );
  }
}

export default ListView;
