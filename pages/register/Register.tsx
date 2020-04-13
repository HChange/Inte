import React from 'react'
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import iconMap from '../../assets'
import styles from './style'
import { Button } from '@ant-design/react-native';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};
const Register = (props:Props) => {
    return (
      <View style={{flex: 1}}>
        <View style={styles.registerWrap}>
          <Image
            style={styles.headImage}
            resizeMode="contain"
            source={iconMap.registerUser}
          />
          <View style={styles.splitLine}>
            {/* <View > */}
            <Text style={styles.title}>手机号</Text>
            {/* </View> */}
          </View>
          <TextInput style={styles.input} placeholder="手机号" />
          <Text style={styles.desc}>
            你可以接收来自Inte的短信验证，请注意查收。
          </Text>
          <Button style={styles.button} type="primary" onPress={() => {}}>
            继续
          </Button>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.btLeft}>有了账号？</Text>
          <TouchableOpacity onPress={()=>props.navigation.navigate('login')}>
            <Text style={styles.btRight}>请登录。</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default Register
