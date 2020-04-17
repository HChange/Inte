import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './style';
const DrawerContent = (props: any) => {
  console.log(props.navigation.setOptions({tabBarVisible:false}));
  return (
    <View style={styles.wrap}>
      <View style={styles.header}></View>
      <View style={styles.body}></View>
      <View style={styles.bottom}>
        <Icon name="setting" color="#666" size={30} />
        <Text>设置</Text>
      </View>
    </View>
  );
};
export default DrawerContent;
