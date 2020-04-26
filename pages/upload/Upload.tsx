import React, { useState } from 'react';
import {View, Text} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { Button } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker'
const Tab = createMaterialTopTabNavigator();
type Props = {
  navigation: NavigationProp<any>;
};
function Home() {
  return (
    <View>
      <Text>home</Text>
    </View>
  );
}
function Set() {
  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const [image, setImage] = useState<any>()
  function openChoose(){
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setImage(source);
      }
    });
  }
  return (
    <View>
      <Text>set</Text>
      <Button onPress={()=>{
        openChoose();
      }}>选择图片</Button>
    </View>
  );
}
function Upload() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{title: '图库'}} name="Home" component={Home} />
      <Tab.Screen options={{title: '拍摄'}} name="Settings" component={Set} />
    </Tab.Navigator>
  );
}
export default Upload;
