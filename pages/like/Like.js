import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const Like = () => {
  useEffect(() => {
    console.log('创建了...');
    return () => {
      console.log('销毁了...');
    };
  }, []);
  return (
    <View>
      <Text>likess</Text>
    </View>
  );
};

export default Like;
