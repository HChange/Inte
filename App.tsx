import React from 'react'
import {Provider} from 'react-redux';
import configStore from './store/index';
import Navigator from './Navigator'
const store = configStore();
const App = () => {
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  )
}

export default App
