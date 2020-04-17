import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Button, Toast} from '@ant-design/react-native';
import {useDispatch} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import imageMap from '../../assets/index';
import styles from './style';
import deleteBlankSpace from '../../common/deleteBlankSpace';
import AsyncStorage from '@react-native-community/async-storage';
type Props = {
  navigation: NavigationProp<any>;
  route: any;
};

const Login = (props: Props) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [telephone, setTelephone] = useState<string>();
  const [password, setPassword] = useState<string>();
  const toast = useRef<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    if(telephone&&telephone.length===11&&password&&password.length>=8&&password.length<16){
      setDisabled(false)
    }
  }, [telephone,password])
  const loginAction = useCallback(async () => {
    setLoading(true);
    setDisabled(true);
    try {
      let response = await fetch(
        'http://www.hellochange.cn:8088/api/users/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telephone,
            password,
          }),
        },
      );
      let result = await response.json();
      // let result = {code:0,msg:"验证码发送成功"}
      if (result.code === 0) {
        toast.current.alertWithType('success', '成功', result.msg);
        setTimeout(() => {
          setLoading(false);
          setDisabled(false);
          isLogin(result);
        }, 1500);
      } else {
        setLoading(false);
        setDisabled(false);

        toast.current.alertWithType('error', '失败', result.msg);
      }
    } catch (error) {
      setLoading(false);
      setDisabled(false);

      toast.current.alertWithType('error', '失败', error);
    }
    //   //    Alert.alert("登录成功！");
    //   Alert.alert(
    //     '找不到账号',
    //     '找不到对应的账号。请试一试其他手机号或者用户名；如果没有Inte账号，你可以注册一个。',
    //     [
    //       {
    //         text: '再试试呗',
    //       //   onPress: () => console.log('Ask me later pressed'),
    //       },
    //       {
    //         text: '注册',
    //         onPress: () => props.navigation.navigate('register'),
    //         style: 'destructive',
    //       },
    //     ],
    //     {cancelable: false},
    //   );
    //   Toast.loading('账号或密码错误！');
  }, [telephone,password,props]);

  const isLogin = useCallback((result) => {
    dispatch({type: 'login', value: true});
    dispatch({type: 'setUserInfo', value: result});
    storeData(result);
  }, []);

  // 本地缓存登录信息
  const storeData = async (userInfo:object) => {
    try {
      await AsyncStorage.setItem('LOGINSTATUS', "true")
      await AsyncStorage.setItem('USERINFO', JSON.stringify(userInfo))
    } catch (e) {
      toast.current.alertWithType('error', '系统错误', e);
    }
  }
  return (
    <>
      <DropdownAlert
        ref={toast}
        closeInterval={1200}
        onClose={() => StatusBar.setBarStyle('dark-content')}
      />

      <View style={styles.loginWrap}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={imageMap.inte}
        />
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={telephone}
          onChangeText={(value) => setTelephone(deleteBlankSpace(value))}
          placeholder="手机号"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(value) => setPassword(deleteBlankSpace(value))}
          placeholder="密码"
          secureTextEntry
        />
        <Button
          style={styles.button}
          onPress={loginAction}
          disabled={disabled}
          type="primary"
          loading={loading}>
          登录
        </Button>
        <View style={styles.retrieve}>
          <Text style={[styles.fontSize13, styles.color888]}>忘记密码?</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('forget');
            }}>
            <Text
              style={[
                styles.fontSize13,
                styles.marginLeft5,
                styles.buttonText,
              ]}>
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
              style={[
                styles.fontSize13,
                styles.marginLeft5,
                styles.buttonText,
              ]}>
              立即注册。
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Login;
