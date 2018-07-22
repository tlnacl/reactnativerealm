import React, { PureComponent } from 'react'
import {Button, Text, View} from "react-native";

export default class TodoItem extends PureComponent{
    render(){
        return (
            <View containerStyle={{ flex: 1 }}>
                <Text>{this.props.task.task}</Text>
                <Button onPress={this.props.onDelete(this.props.task)} title='Delete'/>
            </View>
        )
    }
}