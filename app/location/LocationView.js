import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LocationService from "../realm/LocationService";

class LocationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    this.location = LocationService.getLocation();
    LocationService.addListener(() => {
      this.locationUpdate();
    });
    this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          LocationService.upsertLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => this.setState({error: error.message}),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    LocationService.removeListener();
  }

  locationUpdate() {
    console.log(`latitude: ${this.latitude}, longitude: ${this.longitude}`);
    this.setState({latitude: LocationService.location.latitude, longitude: LocationService.location.longitude});
  }

  render() {
    return (
        <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>
    );
  }
}

export default LocationView;
