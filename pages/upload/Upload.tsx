import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button} from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker';
import CameraRoll from '@react-native-community/cameraroll';
import Camera from './Camera'
import axios from 'axios';

import PicStore from './PicStore'
import Location from './Location';
const Tab = createMaterialTopTabNavigator();
type Props = {
  navigation: NavigationProp<any>;
};

const Upload:React.FC<Props> = (props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{title: '本地'}} name="Location" component={Location} />
      <Tab.Screen options={{title: '拍摄'}} name="Camera" component={Camera} {...props}/>
      <Tab.Screen options={{title: '图库'}} name="PicStore" component={PicStore} />
    </Tab.Navigator>
  );
}
export default Upload;
