import React, {useEffect} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import loadingGif from '../../../assets/animate/wait.gif'
import styles from './style';

const Loading = () => {
  
  return (
      <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
    <View style={styles.loadingWrap}>
      <View style={styles.imgWrap}>
       <Image source={loadingGif}  style={styles.img} resizeMode="contain"/>
      </View>
      <Text style={styles.loadingTitle}>正在载入,请稍后...</Text>
    </View>
    </>
  );
};

export default Loading;
