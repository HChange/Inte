import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button} from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker';
import CameraRoll from '@react-native-community/cameraroll';
import {ScrollView} from 'react-native-gesture-handler';
import {RFHttp} from 'react-native-fast-app';
import axios from 'axios';
const Tab = createMaterialTopTabNavigator();
type Props = {
  navigation: NavigationProp<any>;
};
function Home() {
  const [imageList, setImageList] = useState<any[]>();
  const _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        setImageList(r.edges);
      })
      .catch(err => {
        //Error Loading Images
      });
  };
  return (
    <View>
      <Button onPress={_handleButtonPress}>加载图片</Button>
      <ScrollView>
        {imageList &&
          imageList.map((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: 300,
                  height: 100,
                }}
                source={{uri: p.node.image.uri}}
              />
            );
          })}
      </ScrollView>
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
  const [image, setImage] = useState<any>();
  function openChoose() {
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);
      // console.log(response.path);
      // console.log(response.origURL);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = 'file://' + response.path;

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setImage(source);
        console.log(source);
        let formData = new FormData();
        let file = {
          uri: source,
          type: 'multipart/form-data',
          name: 'index' + '.jpg',
        };
        formData.append('file', file);
        axios
          .post('http://www.hellochange.cn:8099/upload', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
            timeout: 600000,
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
  return (
    <View>
      <Text>set</Text>
      <Button
        onPress={() => {
          openChoose();
        }}>
        选择图片
      </Button>

      <Image
        style={{width: 200, height: 200,backgroundColor:'red'}}
        source={{
          uri: 'https://www.hellochange.cn/Inte_server/uploads/1587900322346.jpg',
        }}
      />
      {image && (
        <Image style={{width: 200, height: 200}} source={{uri: image}} />
      )}
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
