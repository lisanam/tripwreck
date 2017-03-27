import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default class Map extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MapView 
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}/>
      </View>
    )
  }
}
