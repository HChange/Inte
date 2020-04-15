import React, {useEffect, useCallback, useRef, useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import iconMap from '../../assets';
import styles from './style';
import {Button} from '@ant-design/react-native';
import {NavigationProp} from '@react-navigation/native';
type Props = {
  navigation: NavigationProp<any>;
};
const VerfyCode = (props: Props) => { 
    const [bottomVisibleToggle, setBottomVisibleToggle] = useState<boolean>(false);
    const keyboardDidShowAction = useCallback(
      () => {
        setBottomVisibleToggle(true)
      },
      [],
    )
    const keyboardDidHideAction = useCallback(
      () => {
        setBottomVisibleToggle(false)
      },
      [],
    )
    useEffect(() => {
      Keyboard.addListener('keyboardDidShow',keyboardDidShowAction)
      Keyboard.addListener('keyboardDidHide',keyboardDidHideAction)
      return () => {
        Keyboard.removeListener('keyboardDidShow',keyboardDidShowAction)
        Keyboard.removeListener('keyboardDidHide',keyboardDidHideAction)
      }
    }, [])
  return (
    <View style={{flex: 1}}>
      <View style={styles.registerWrap}>
        <Text style={styles.vcText}>输入验证码</Text>
        <View style={styles.splitLine}>
            {/* <View > */}
            <Text style={styles.title}>验证码</Text>
            {/* </View> */}
          </View>
        <TextInput style={styles.input} placeholder="验证码" />

        <Text style={styles.vcDesc}>
          请输入以下手机号收到的6位数验证码:+86 189 7355 2995。
        </Text>
        <Button style={styles.button} type="primary" onPress={() => {props.navigation.navigate('inputNamePassword')}}>
          继续
        </Button>
        <View style={styles.newReqWrap}>
          <Text style={styles.newReqLeft}>没接收到短信？</Text>
          <TouchableOpacity>
            <Text style={styles.newReq}>请求新验证码。</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.bottom,bottomVisibleToggle&&styles.hiddenBottom]}>
        <Text style={styles.btLeft}>有了账号？</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('login')}>
          <Text style={styles.btRight}>请登录。</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerfyCode;
