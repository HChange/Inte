import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {Portal, Toast, Button} from '@ant-design/react-native';
const Loading = () => {
  let key;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    key = Toast.loading('loading...');
    return () => {
      Portal.remove(key);
    };
  }, []);
  return (
    <View>
      <Text>LOADING...</Text>
      <Button
        onPress={() => {
          Alert.alert('hello');
          Toast.loading('loading...');
        }}
      />
    </View>
  );
};

export default Loading;
