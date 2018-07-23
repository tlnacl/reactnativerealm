import React, { Component } from 'react';
import { Text } from 'react-native';
class CheckBox extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      data: props.data
    });
  }
  render() {

    return (
        <Text>Icon</Text>
    );
  }
}

export default CheckBox;
