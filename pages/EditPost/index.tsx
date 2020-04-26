import React, {useState, useEffect} from 'react';
import {View, Text, Image, ToastAndroid} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Button, TextareaItem} from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import api from '../../config/api';
import {RFHttp} from 'react-native-fast-app';
import styles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  navigation: NavigationProp<any>;
  route: any;
};
const EditPost: React.FC<Props> = (props) => {
  let dispatch = useDispatch()
  let imgList = useSelector((state: any) => state.camera.imgList);
  let userInfo = useSelector((state: any) => state.user.userInfo);
  const {navigation, route} = props;
  const [desc, setDesc] = useState<string>('');

  async function upload() {
    if (imgList.length <= 0) {
      ToastAndroid.show('请先拍摄一张照片', 1000);
    } else if (desc.length <= 0) {
      ToastAndroid.show('请填写内容信息', 1000);
    } else {
      try {
        let imageUrlArr = [];
        console.log(imgList.length);

        for (let i = 0; i < imgList.length; i++) {
          imageUrlArr.push(
            `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
              Math.random() * 1000,
            )}.jpg`,
          );
        }

        let response = await fetch(api.PUBLISH_POST, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userInfo._id,
            telephone: userInfo.telephone,
            desc: desc,
            imageUrl: imageUrlArr,
          }),
        });
        let result = await response.json();
        // let result = {code:0,msg:"验证码发送成功"}
        if (result.code === 0) {
          ToastAndroid.show(result.msg, 1000);
          dispatch({type:"clearImg"})
          navigation.navigate("app",{type:"update"})
        } else {
          ToastAndroid.show(result.msg, 500);
        }
      } catch (error) {
        ToastAndroid.show(error, 500);
      }
    }
  }
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="back" size={29} style={{padding: 10}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={upload}>
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              fontWeight: 'bold',
              color: '#3897f0',
            }}>
            发表
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>图片</Text>
      <View style={styles.imageBox}>
        {imgList.map((item: any) => {
          return (
            <View key={item.uri} style={styles.imageWrap}>
              <Image
                key={item.uri}
                style={styles.image}
                resizeMode="cover"
                source={{uri: item.uri}}
              />
            </View>
          );
        })}
      </View>
      <Text style={styles.title}>内容</Text>
      <TextareaItem
      style={styles.textarea}
        value={desc}
        onChangeText={(value) => {
          setDesc(value);
        }}
        placeholder="请输入你的小想法..."
        count={180}
        // numberOfLines={3}
        rows={10}
      />
    </View>
  );
};

export default EditPost;

// let formData = new FormData();
// let params: any = [];
// for (var i = 0; i < imgList.length; i++) {
//   var uri = imgList[i].uri;
//   var index = uri.lastIndexOf('/');
//   var name = uri.substring(index + 1, uri.length);
//   let file: any = {uri: uri, type: 'multipart/form-data', name: name};
//   formData.append('file', file);
//   params.push(file);
// }
// RFHttp()
//   .url('http://www.hellochange.cn:8099/upload')
//   .param(params)
//   .formData() // 对应：multipart/form-data 当然，也可通过ContentType指定或者直接设置header都能实现
//   .post((success, json, message) => {
//     console.log(success);
//     console.log(json);
//     console.log(message);
//   });

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
