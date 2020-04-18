import React, { useState, useEffect } from 'react'
import {Provider} from 'react-redux';
import configStore from './store/index';
import Navigator from './Navigator'
import { StatusBar } from 'react-native';
const store = configStore();
const App = () => {

  
 
  return (
    <Provider store={store}>
      <StatusBar animated backgroundColor='#f0f0f0' barStyle="dark-content" />
      <Navigator />
    </Provider>
  );
}

export default App
