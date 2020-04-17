import React, {useEffect, useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from 'react-native';
import styles from './style';
import {Button} from '@ant-design/react-native';
import {NavigationProp} from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
type Props = {
  navigation: NavigationProp<any>;
};
const Register = (props: Props) => {
  const [bottomVisibleToggle, setBottomVisibleToggle] = useState<boolean>(
    false,
  );
  const toast = useRef<any>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [telephone, setTelephone] = useState<string>();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShowAction);
    Keyboard.addListener('keyboardDidHide', keyboardDidHideAction);
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShowAction);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHideAction);
    };
  }, []);
  
  /**判断输入手机号的正确性，来是否允许进行下一步 */
  useEffect(() => {
    if (telephone) {
      if (/^1[34578]\d{9}$/.test(telephone)) {
        setDisabled(false);
        return;
      }
    }
    setDisabled(true);
  }, [telephone]);
  
  const keyboardDidShowAction = useCallback(() => {
    setBottomVisibleToggle(true);
  }, []);
  const keyboardDidHideAction = useCallback(() => {
    setBottomVisibleToggle(false);
  }, []);
  const nextStep = useCallback(async () => {
    setLoading(true);
    setDisabled(true);
    try {
      let response = await fetch(
        'http://www.hellochange.cn:8088/api/users/send_code?telephone=' +
          telephone,
      );
      let result = await response.json();
      // let result = {code: 0, msg: '验证码发送成功'};
      if (result&&result.code === 0) {
        toast.current.alertWithType('success', '成功', result.msg);
        setTimeout(() => {
          setLoading(false);
          setDisabled(false);

          props.navigation.navigate('verifyCode', {telephone});
        }, 1500);
      } else {
        setDisabled(false);

        setLoading(false);
        toast.current.alertWithType('error', '失败', result.msg);
      }
    } catch (error) {
      setDisabled(false);

      setLoading(false);
      toast.current.alertWithType('error', '失败', error);
    }
  }, [props, telephone]);

  return (
    <>
      <DropdownAlert ref={toast} closeInterval={1200} onClose={()=>StatusBar.setBarStyle('dark-content')}/>
      <View style={{flex: 1}}>
        <View style={styles.registerWrap}>
          <Text style={styles.vcText}>输入手机号</Text>
          <View style={styles.splitLine}>
            {/* <View > */}
            <Text style={styles.title}>手机号</Text>
            {/* </View> */}
          </View>
          <TextInput
            keyboardType="phone-pad"
            value={telephone}
            style={styles.input}
            placeholder="手机号"
            onChangeText={(value) => {
              setTelephone(value);
            }}
          />
          <Text style={styles.desc}>
            你可以接收来自Inte的短信验证，请注意查收。
          </Text>
          <Button
            disabled={disabled}
            style={styles.button}
            type="primary"
            loading={loading}
            onPress={nextStep}>
            继续
          </Button>
        </View>
        <View
          style={[styles.bottom, bottomVisibleToggle && styles.hiddenBottom]}>
          <Text style={styles.btLeft}>有了账号？</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('login')}>
            <Text style={styles.btRight}>请登录。</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Register;
