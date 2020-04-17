import React, {useEffect, useCallback, useRef, useState, useMemo} from 'react';
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
import {NavigationProp, RouteProp} from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
type Props = {
  navigation: NavigationProp<any>;
  route: any;
};
const ForgetVerifyCode = (props: Props) => {
  const toast = useRef<any>();
  const [bottomVisibleToggle, setBottomVisibleToggle] = useState<boolean>(
    false,
  );
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>();
  const [reSendDisabled, setReSendDisabled] = useState<boolean>(false);
 
  const keyboardDidShowAction = useCallback(() => {
    setBottomVisibleToggle(true);
  }, []);
  const keyboardDidHideAction = useCallback(() => {
    setBottomVisibleToggle(false);
  }, []);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShowAction);
    Keyboard.addListener('keyboardDidHide', keyboardDidHideAction);
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShowAction);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHideAction);
    };
  }, []);
  let telephone = useMemo(() => {
    return formatTel(props.route.params.telephone);
  }, [props.route.params.telephone]);

  function formatTel(initPhone: string) {
    if (!initPhone) return '';
    let tel = '';
    for (let i = 0; i <= 2; i++) {
      if (i === 0) {
        tel += initPhone.substr(0, 3) + ' ';
      } else {
        tel += initPhone.substr(3 + (i - 1) * 4, 4) + ' ';
      }
    }
    return tel;
  }

  useEffect(() => {
    if (code && code.length === 6) {
      if (Number(code)) {
        setDisabled(false);
        return;
      }
    }
    setDisabled(true);
  }, [code]);
  const nextStep = useCallback(async () => {
    setLoading(true);
    setDisabled(true);
    console.log(code);
    
    try {
      let response = await fetch(
        'http://www.hellochange.cn:8088/api/users/verify_code',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
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

          props.navigation.navigate('inputNewPassword', {
            telephone: props.route.params.telephone,
          });
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
  }, [props, code]);

  const reSendCode = useCallback(async () => {
    setReSendDisabled(true)
    try {
      let response = await fetch(
        'http://www.hellochange.cn:8088/api/users/send_code?type=forget&telephone=' +
        props.route.params.telephone,
      );
      let result = await response.json();
      // let result = {code: 0, msg: '验证码发送成功'};
      if (result&&result.code === 0) {
        toast.current.alertWithType('success', '成功', result.msg);
        setTimeout(() => {
          setReSendDisabled(false)

          props.navigation.navigate('forgetVerifyCode', {telephone:props.route.params.telephone});
        }, 1500);
      } else {
        setReSendDisabled(false)
        toast.current.alertWithType('error', '失败', result.msg);
      }
    } catch (error) {
      setDisabled(false);

      setLoading(false);
      toast.current.alertWithType('error', '失败', error);
    }
  }, [props]);
  return (
    <>
      <DropdownAlert ref={toast} closeInterval={1200} onClose={()=>StatusBar.setBarStyle('dark-content')}/>
      <View style={{flex: 1}}>
        <View style={styles.registerWrap}>
          <Text style={styles.vcText}>输入验证码</Text>
          <View style={styles.splitLine}>
            {/* <View > */}
            <Text style={styles.title}>验证码</Text>
            {/* </View> */}
          </View>
          <TextInput
            keyboardType="number-pad"
            value={code}
            style={styles.input}
            placeholder="验证码"
            onChangeText={(newVal) => setCode(newVal)}
          />

          <Text style={styles.vcDesc}>
            请输入以下手机号收到的6位数验证码:+86 {telephone}。
          </Text>
          <Button
            style={styles.button}
            disabled={disabled}
            type="primary"
            loading={loading}
            onPress={nextStep}>
            继续
          </Button>
          <View style={styles.newReqWrap}>
            <Text style={styles.newReqLeft}>没接收到短信？</Text>
            <TouchableOpacity disabled={reSendDisabled} onPress={reSendCode}>
              <Text style={styles.newReq} >请求新验证码。</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[styles.bottom, bottomVisibleToggle && styles.hiddenBottom]}>
          <Text style={styles.btLeft}>记起密码了？</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('login')}>
            <Text style={styles.btRight}>请登录。</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ForgetVerifyCode;
