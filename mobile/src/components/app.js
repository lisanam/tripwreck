import React from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import reducers from './reducers';

// import Map from './common/map';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <MapView 
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={{width: 250, height: 250}}/>
    </View>
  )
}

module.exports = App;
