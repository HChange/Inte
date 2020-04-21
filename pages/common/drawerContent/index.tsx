import React, { useCallback } from 'react';
import {View, Text, Linking} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './style';
import { useSelector } from 'react-redux';
import Animated, { log } from 'react-native-reanimated';

const DrawerContent = (props: any) => {
  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });
  // console.log(props.navigation.setOptions({tabBarVisible:false}));
   const userInfo = useSelector((state: any) => state.user.userInfo);
  return (
    <Animated.View style={{transform: [{translateX}], flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.username} numberOfLines={1}>{userInfo&&userInfo.username}</Text>
      </View>
      <View style={styles.body}>
        <DrawerContentScrollView {...props}>
          <DrawerItem
            labelStyle={{padding: 0}}
            label={() => <Text style={styles.label}>我的</Text>}
            icon={() => <Icon name="user" color="#666" size={29} />}
            onPress={() => {
              props.navigation.jumpTo('mine');
            }}
          />
          <DrawerItem
            label={() => <Text style={styles.label}>收藏夹</Text>}
            icon={() => <Icon name="staro" color="#666" size={29} />}
            onPress={() => {
              props.navigation.jumpTo('collection');
            }}
          />

          <DrawerItem
            labelStyle={{padding: 0}}
            label={() => <Text style={styles.label}>设置</Text>}
            icon={() => <Icon name="setting" color="#666" size={29} />}
            onPress={() => {
              props.navigation.jumpTo('setting');
            }}
          />
          <DrawerItem
            labelStyle={{padding: 0}}
            label={() => <Text style={styles.label}>帮助</Text>}
            icon={() => <Icon name="questioncircleo" color="#666" size={29} />}
            onPress={() => {
              Linking.openURL('https://hellochange.cn');
            }}
          />
        </DrawerContentScrollView>
      </View>
      {/* <View style={styles.bottom}>
        <Icon name="setting" color="#666" size={29} />
        <Text style={styles.title}>设置</Text>
      </View> */}
    </Animated.View>
  );
};
export default DrawerContent;
