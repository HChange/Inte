import React from 'react';
import {View, Text, Image, ToastAndroid} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Button} from '@ant-design/react-native';
import axios from 'axios';
import api from '../../config/api';
import {RFHttp} from 'react-native-fast-app';
type Props = {
  navigation: NavigationProp<any>;
  route: any;
};
const EditPost: React.FC<Props> = (props) => {
  let imgList = useSelector((state: any) => state.camera.imgList);
  let userInfo = useSelector((state: any) => state.user.userInfo);
  const {navigation, route} = props;
  async function upload() {
    
    if (imgList.length <= 0) {
      ToastAndroid.show('请先拍摄一张照片', 1000);
    } else {
      console.log('run');
      // formData.append({})
      // console.log(Object.keys(imgList[0]));
      
      try {
            let formData = new FormData();
            let params:any = [];
            for (var i = 0; i < imgList.length; i++) {
              var uri = imgList[i].uri;
              var index = uri.lastIndexOf('/');
              var name = uri.substring(index + 1, uri.length);
              let file:any = {uri: uri, type: 'multipart/form-data', name: name};
              formData.append('file', file);
              params.push(file);
            }

            RFHttp()
              .url('http://www.hellochange.cn:8099/upload')
              .param(params)
              .formData() // 对应：multipart/form-data 当然，也可通过ContentType指定或者直接设置header都能实现
              .post((success, json, message) => {
                console.log(success);
                console.log(json);
                console.log(message);
              });

            // console.log(formData);
            // let options:any = {};
            // options.body = formData;
            // options.headers = {'Content-Type': 'multipart/form-data'};
            // options.method = 'POST';
            // var url = 'https://www.hellochange.top/v2/upload';
            // fetch(url, options)
            //   .then((response) => response.json())
            //   .then((responseData) => {
            //     1;
            //     console.warn(responseData);
            //     1;
            //   })
            //   .catch((error) => {
            //     console.warn(error);
            //   })
            // imgList.map((item, index) => {
            //   let file = {
            //     uri: item,
            //     type: 'multipart/form-data',
            //     name: index + '.jpg',
            //   };
            //   formData.append('file', file);
            // });
            // console.log(formData._parts);

            // axios.post('http://www.hellochange.cn:8099/upload', formData, {
            //   headers: {'Content-Type': 'multipart/form-data'},
            //   timeout: 600000,
            // }).then(res=>{
            //   console.log(res);

            // }).catch(err=>{
            //   console.log(err);

            // });
            // RFHttp()
            //   .url("http://www.hellochange.cn:8099/upload")
            //   .contentType('multipart/form-data')
            //   .header({contentType: 'multipart/form-data'})
            //   .formData();
            // for (let i = 1; i < 100; i++) {
            //   let response = await fetch(api.PUBLISH_POST, {
            //     method: 'POST',
            //     headers: {
            //       Accept: 'application/json',
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //       userId: '5ea122c2d4d7ddd94da5e5ee',
            //       telephone: '18973552998',
            //       desc: '王牌飞行员申请出战',
            //       imageUrl: [
            //         `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
            //           Math.random() * 1000,
            //         )}.jpg`,
            //         `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
            //           Math.random() * 1000,
            //         )}.jpg`,
            //         `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
            //           Math.random() * 1000,
            //         )}.jpg`,
            //         `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
            //           Math.random() * 1000,
            //         )}.jpg`,
            //       ],
            //     }),
            //   });
            //   let result = await response.json();
            //   // let result = {code:0,msg:"验证码发送成功"}
            //   if (result.code === 0) {
            //     ToastAndroid.show(result.msg, 500);
            //   } else {
            //     ToastAndroid.show(result.msg, 500);
            //   }
            // }
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
