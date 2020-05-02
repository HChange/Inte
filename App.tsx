import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import configStore from './store/index';
import Navigator from './Navigator';
import {StatusBar, PermissionsAndroid, ToastAndroid} from 'react-native';

const store = configStore();
async function requestMultiplePermission() {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ];
    await PermissionsAndroid.requestMultiple(permissions);
  } catch (err) {
    ToastAndroid.show(err.toString(), 1000);
  }
}
const App = () => {
  useEffect(() => {
    requestMultiplePermission();
  }, []);
  return (
    <Provider store={store}>
      <StatusBar animated backgroundColor="#f0f0f0" barStyle="dark-content" />
      <Navigator />
    </Provider>
  );
};

export default App;
