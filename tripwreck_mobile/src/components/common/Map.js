import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const Map = (props) => {

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log(position)
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         error: null,
  //       });
  //     },
  //     (error) => this.setState({ error: error.message }),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  //   );
  // }

  return (
    <View style={{flex: 1}}>
      <MapView 
      style={StyleSheet.absoluteFill}
      initialRegion={props.initialRegion}>
      {props.stores.map((store) => {
        {/*[latitude, longitude] = store.location;*/}
        var latitude = Number(store.location[0]);
        var longitude = Number(store.location[1])
        return (
          <MapView.Marker
            key={store.zomato_id}
            coordinate={{latitude, longitude}}>
            {/*change what pin does when selected and clicked*/}
            <MapView.Callout/>
          </MapView.Marker>
        )
      })}
      </MapView>
    </View>
  )
}

module.exports = Map;