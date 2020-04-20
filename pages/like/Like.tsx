import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import img from '../../assets/animate/loading-loop.gif'
const Like = () => {
  useEffect(() => {
    console.log('创建了...');
    return () => {
      console.log('销毁了...');
    };
  }, []);
  return (
    <View>
      <View style={{width: 100,height: 100}}>

       <Image source={img}  style={{width: 100,height: 100}} resizeMode="contain"/>
      </View>
      <Text>likess</Text>
    </View>
  );
};

export default Like;
