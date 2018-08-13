/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import TodoList from "./app/realm/TodoList";
import BackgroundFetch from "react-native-background-fetch";
import TodoService from "./app/realm/TodoService";
import TodoModel from "./app/realm/TodoModel";
import LocationView from "./app/location/LocationView";

type Props = {};
export default class App extends Component<Props> {
  // componentDidMount() {
  //   // Configure it.
  //   BackgroundFetch.configure({
  //     minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
  //     stopOnTerminate: false,   // <-- Android-only,
  //     startOnBoot: true         // <-- Android-only
  //   }, () => {
  //     console.log("[js] Received background-fetch event");
  //     TodoService.save(new TodoModel(`background Task ${new Date()}`));
  //     // Required: Signal completion of your task to native code
  //     // If you fail to do this, the OS can terminate your app
  //     // or assign battery-blame for consuming too much background-time
  //     BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
  //   }, (error) => {
  //     console.log("[js] RNBackgroundFetch failed to start");
  //   });
  //
  //   // Optional: Query the authorization status.
  //   BackgroundFetch.status((status) => {
  //     switch(status) {
  //       case BackgroundFetch.STATUS_RESTRICTED:
  //         console.log("BackgroundFetch restricted");
  //         break;
  //       case BackgroundFetch.STATUS_DENIED:
  //         console.log("BackgroundFetch denied");
  //         break;
  //       case BackgroundFetch.STATUS_AVAILABLE:
  //         console.log("BackgroundFetch is enabled");
  //         break;
  //     }
  //   });
  // }
  render() {
    return (
      <View style={styles.container}>
        <TodoList/>
        <LocationView/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
