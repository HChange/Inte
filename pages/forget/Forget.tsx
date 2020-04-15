import React, { useEffect, useCallback, useRef, useState } from 'react'
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import iconMap from '../../assets'
import styles from './style'
import { Button } from '@ant-design/react-native';
import {NavigationProp} from '@react-navigation/native';
import {Keyboard} from 'react-native'
type Props = {
  navigation: NavigationProp<any>;
};
const Register = (props:Props) => {
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
        <Text style={styles.vcText}>输入手机号</Text>
          <View style={styles.splitLine}>
            {/* <View > */}
            <Text style={styles.title}>手机号</Text>
            {/* </View> */}
          </View>
          <TextInput style={styles.input} placeholder="手机号" />
          <Text style={styles.desc}>
            你可以接收来自Inte的短信验证，请注意查收。
          </Text>
          <Button disabled={false} style={styles.button} type="primary" onPress={() => {props.navigation.navigate('forgetVerifyCode')}}>
            继续
          </Button>
        </View>
        <View style={[styles.bottom,bottomVisibleToggle&&styles.hiddenBottom]}>
          <Text style={styles.btLeft}>记起密码了？</Text>
          <TouchableOpacity onPress={()=>props.navigation.navigate('login')}>
            <Text style={styles.btRight}>请登录。</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}  

export default Register
