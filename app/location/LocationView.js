import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import LocationService from "../realm/LocationService";

class LocationView extends Component {
  constructor(props) {
    super(props);
    this.location = LocationService.getLocation();
    this.location.addListener(this.locationUpdate.bind(this));
  }

  async componentDidMount() {
    await this.requestLocationPermission();
    this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log(`location changed to latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`);
          LocationService.upsertLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => this.setState({error: error.message}),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
    );
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Example App',
            'message': 'access to your location '
          }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    this.location.removeAllListeners();
  }

  locationUpdate() {
    console.log(`forceUpdate-location: ${JSON.stringify(this.location)}`)
    this.forceUpdate();
  }

  render() {
    return (
        <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Latitude: {this.location[0].latitude}</Text>
          <Text>Longitude: {this.location[0].longitude}</Text>
        </View>
    );
  }
}

export default LocationView;
