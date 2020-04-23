import React from 'react';
import {View, Text, Image, ToastAndroid} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Button} from '@ant-design/react-native';
import axios from 'axios';
import api from '../../config/api';
type Props = {
  navigation: NavigationProp<any>;
  route: any;
};
const EditPost: React.FC<Props> = (props) => {
  let imgList = useSelector((state: any) => state.camera.imgList);
  let userInfo = useSelector((state: any) => state.user.userInfo);
  const {navigation, route} = props;
  async function upload() {
    // let formData = new FormData();
    if (imgList.length <= 0) {
      ToastAndroid.show('请先拍摄一张照片', 1000);
    } else {
      console.log("run");
      
      try {
        for (let i = 1; i < 100; i++) {
          let response = await fetch(api.PUBLISH_POST, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: '5ea122c2d4d7ddd94da5e5ee',
              telephone: '18973552998',
              desc: '王牌飞行员申请出战',
              imageUrl: [
                `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
                  Math.random() * 1000,
                )}.jpg`,
                `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
                  Math.random() * 1000,
                )}.jpg`,
                `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
                  Math.random() * 1000,
                )}.jpg`,
                `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
                  Math.random() * 1000,
                )}.jpg`,
              ],
            }),
          });
          let result = await response.json();
          // let result = {code:0,msg:"验证码发送成功"}
          if (result.code === 0) {
            ToastAndroid.show(result.msg, 500);
          } else {
            ToastAndroid.show(result.msg, 500);
          }
        }
      } catch (error) {
        ToastAndroid.show(error, 500);
      }
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Text>123</Text>
      {imgList.map((item: any) => {
        return (
          <Image
            key={item.uri}
            style={{width: 100, height: 100}}
            resizeMode="cover"
            source={{uri: item.uri}}
          />
        );
      })}

      <Button onPress={upload}>上传</Button>
    </View>
  );
};

export default EditPost;
