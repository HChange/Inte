import React, {useEffect, useCallback, useRef, useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import styles from './style';
import {Button} from '@ant-design/react-native';
import {NavigationProp} from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
import deleteBlankSpace from "../../common/deleteBlankSpace"
import api from '../../config/api'
import { DERATION } from '../../config';
type Props = {
  navigation: NavigationProp<any>;
  route: any;
};
const InputNamePassword = (props: Props) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const toast = useRef<any>();


  useEffect(() => {
    if(username&&password&&password.length>=8&&password.length<=16){
      setDisabled(false);
    }else{
      setDisabled(true);
    }
  }, [username,password])

  const nextStep = useCallback(
    async () => {
      setLoading(true);
      setDisabled(true);
      try {
        let response = await fetch(
          api.REGISTER,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              telephone:props.route.params.telephone,
              password: deleteBlankSpace(password),
              username:deleteBlankSpace(username)
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
            props.navigation.navigate('login');
          }, DERATION);
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
      
    },
    [username,password,props],
  )
  return (
    <>
    <DropdownAlert ref={toast} closeInterval={1200} onClose={()=>StatusBar.setBarStyle('dark-content')}/>
    <View style={{flex: 1}}>
      <View style={styles.registerWrap}>
        <Text style={styles.vcText}>姓名与密码</Text>
        <View style={styles.splitLine}>
            {/* <View > */}
            <Text style={styles.npTitle}>姓名&密码</Text>
            {/* </View> */}
          </View>
        <TextInput value={username} onChangeText={(value)=>setUsername(deleteBlankSpace(value))} style={[styles.input,styles.marginBottom20]} placeholder="名字" />
        <TextInput value={password} onChangeText={(value)=>setPassword(deleteBlankSpace(value))} style={styles.input} placeholder="密码" secureTextEntry/>

        <Text style={styles.tips}>
          Tips: 密码长度为8位至16位，空格和换行符会被过滤掉哦。
        </Text>
        <Button style={styles.button} disabled={disabled}
            type="primary"
            loading={loading} onPress={nextStep}>
          继续
        </Button>
        </View>
    </View>
    </>
  );
};

export default InputNamePassword;
