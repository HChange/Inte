import React from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const options = [
  {
    url: 'mqq://',
    name: 'QQ',
  },
  {
    url: 'weixin://',
    name: 'wechat',
  },
  {
    url: 'weibo://',
    name: 'weibo',
  },
  {
    url: 'alipay://',
    name: 'alipay-circle',
  },
  {
    url: 'taobao://',
    name: 'taobao-circle',
  },
];
const OpenList = () => {
  return (
    <View style={styles.popupWrap}>
      {options.map((item) => {
        return (
          <TouchableOpacity
            key={item.url}
            onPress={() => {
              Linking.canOpenURL(item.url).then((supported) => {
                if (supported) {
                  Linking.openURL(item.url);
                } else {
                  ToastAndroid.show('未安装' + item.name, 1000);
                }
              });
            }}>
            <View style={styles.shareItem}>
              <Text style={{marginRight: 10}}>分享至</Text>
              <Icon name={item.name} size={24}/>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
let styles = StyleSheet.create({
  popupWrap: {
    width: 120
  },
  shareItem: {
    width: '100%',
    height: 44,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',

  },
});
export default OpenList;
