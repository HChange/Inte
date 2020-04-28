import React, {useState, useCallback} from 'react';
import {View, Text, Image, ToastAndroid, Switch} from 'react-native';
import styles from './style';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import InputItem from './InputItem';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import api from '../../config/api';

type Props = {
  navigation: NavigationProp<any>;
  route: any;
};
const EditInfo: React.FC<Props> = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const [realName, setRealName] = useState(userInfo.realName);
  const [username, setUsername] = useState(userInfo.username);
  const [website, setWebsite] = useState(userInfo.website);
  const [blog, setBlog] = useState(userInfo.blog);
  const [wechat, setWechat] = useState(userInfo.wechat);
  const [telephone, setTelephone] = useState(userInfo.telephone);
  const [email, setEmail] = useState(userInfo.email);
  const [sex, setSex] = useState(userInfo.sex === '女' ? true : false);
  const inputMap = [
    {
      title: '真实姓名',
      onChangeText: (value: any) => {
        setRealName(value);
      },
      value: realName,
    },
    {
      title: '用户名',
      onChangeText: (value: any) => {
        setUsername(value);
      },
      value: username,
    },
    {
      title: '个人网站',
      onChangeText: (value: any) => {
        setWebsite(value);
      },
      value: website,
    },
    {
      title: '博客',
      onChangeText: (value: any) => {
        setBlog(value);
      },
      value: blog,
    },
  ];
  const homeInfoMap = [
    {
      title: '手机号',
      onChangeText: (value: any) => {
        setTelephone(value);
      },
      value: telephone,
      editable: false,
    },
    {
      title: '微信',
      onChangeText: (value: any) => {
        setWechat(value);
      },
      value: wechat,
      editable: true,
    },
    {
      title: '邮箱',
      onChangeText: (value: any) => {
        setEmail(value);
      },
      value: email,
      editable: true,
    },
  ];
  const setUserInfo = async () => {
    try {
      let response = await fetch(api.SET_USERINFO, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInfo: {
            realName: realName,
            username: username,
            website: website,
            wechat: wechat,
            blog: blog,
            email: email,
            sex: sex ? '女' : '男',
            icon:
              'http://softwareengineeringdaily.com/wp-content/uploads/2015/07/react.png',
          },
        }),
      });
      let result = await response.json();
      if (result.code === 0) {
        ToastAndroid.show(result.msg, 500);
        dispatch({type: 'setUserInfo', value: result.data});

        navigation.goBack();
      } else {
        ToastAndroid.show(result.msg, 500);
      }
    } catch (error) {
      ToastAndroid.show('网络异常', 500);
    }
  };
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="close" size={25} color="#666" />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>编辑个人信息</Text>
        <TouchableOpacity onPress={setUserInfo}>
          <Icon name="check" size={25} color="#3897f0" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.headImgWrap}>
          <Image
            style={styles.headImg}
            source={{
              uri: userInfo ? userInfo.icon : '',
            }}
          />
          <TouchableOpacity>
            <Text style={styles.headTitle}>更换头像</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrap}>
          {inputMap.map((item, index) => {
            return (
              <InputItem
                style={{color: '#333', fontSize: 16}}
                key={index}
                title={item.title}
                onChangeText={item.onChangeText}
                value={item.value}
              />
            );
          })}
        </View>

        <View>
          <Text style={styles.homeInfoTitle}>主页信息</Text>
          {homeInfoMap.map((item, index) => {
            return (
              <InputItem
                style={{color: '#333', fontSize: 16}}
                key={index}
                title={item.title}
                onChangeText={item.onChangeText}
                value={item.value}
                editable={item.editable}
              />
            );
          })}
        </View>
        <View style={styles.sexWrap}>
          <Text style={{color: '#ccc'}}>性别</Text>
          <View style={styles.chooseSex}>
            <Text
              style={{
                fontSize: sex ? 16 : 16,
                fontWeight: sex ? 'normal' : 'bold',
                color: sex ? '#333' : '#333',
              }}>
              男
            </Text>
            <Switch
              trackColor={{false: '#ddd', true: '#ddd'}}
              thumbColor={sex ? 'pink' : '#81b0ff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={value => {
                setSex(value);
              }}
              value={sex}
            />
            <Text
              style={{
                fontSize: sex ? 19 : 16,
                fontWeight: sex ? 'bold' : 'normal',
                color: sex ? '#333' : '#666',
              }}>
              女
            </Text>
          </View>
        </View>
        <View style={styles.faker}></View>
      </ScrollView>
    </View>
  );
};

export default EditInfo;
