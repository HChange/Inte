import React, {useEffect, useCallback, useRef, useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import {Button} from '@ant-design/react-native';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};
const InputNamePassword = (props: Props) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.registerWrap}>
        <Text style={styles.vcText}>输入新密码</Text>
        <View style={styles.splitLine}>
            {/* <View > */}
            <Text style={styles.npTitle}>密码&密码</Text>
            {/* </View> */}
          </View>
        <TextInput style={[styles.input,styles.marginBottom20]} placeholder="密码" secureTextEntry/>
        <TextInput style={styles.input} placeholder="密码" secureTextEntry/>

        <Text style={styles.tips}>
          Tips: 密码长度为8位至16位，空格和换行符会被过滤掉哦。
        </Text>
        <Button style={styles.button}  type="primary" onPress={() => {props.navigation.navigate("login")}}>
          继续
        </Button>
        </View>
    </View>
  );
};

export default InputNamePassword;
