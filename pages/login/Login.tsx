import React, {useCallback} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp} from "@react-navigation/native"
import {Button, Toast} from '@ant-design/react-native';
import {useDispatch} from 'react-redux';
import imageMap from '../../assets/index';
import styles from './style';


type Props = {
  navigation: NavigationProp<any>;
};

const Login = (props:Props) => {
  const dispatch = useDispatch();
  const loginAction = useCallback(() => {
    //    Alert.alert("登录成功！");
    Alert.alert(
      '找不到账号',
      '找不到对应的账号。请试一试其他手机号或者用户名；如果没有Inte账号，你可以注册一个。',
      [
        {
          text: '再试试呗',
        //   onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: '注册',
          onPress: () => props.navigation.navigate('register'),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
    Toast.loading('账号或密码错误！');
    isLogin();
  }, []);
  const isLogin = useCallback(() => {
    // dispatch({type:"login",value:true});
  }, []);
  return (
    <View style={styles.loginWrap}>
      <Image style={styles.logo} resizeMode="contain" source={imageMap.inte} />
      <TextInput style={styles.input} placeholder="手机号、用户名" />
      <TextInput style={styles.input} placeholder="密码" secureTextEntry />
      <Button
        loading={true}
        style={styles.button}
        onPress={loginAction}
        type="primary">
        登录
      </Button>
      <View style={styles.retrieve}>
        <Text style={[styles.fontSize13, styles.color888]}>忘记密码?</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('forget');
          }}>
          <Text
            style={[styles.fontSize13, styles.marginLeft5, styles.buttonText]}>
            找回密码。
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.split}>
        <View style={styles.or}>
          <Text style={styles.orText}>或</Text>
        </View>
      </View>
      <View style={styles.register}>
        <Text style={[styles.fontSize13, styles.color888]}>没有账户?</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('register');
          }}>
          <Text
            style={[styles.fontSize13, styles.marginLeft5, styles.buttonText]}>
            立即注册。
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
