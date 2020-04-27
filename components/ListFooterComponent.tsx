import React from 'react';
import {View, Text, Image} from 'react-native';
import loading from '../assets/animate/loading.gif'
const ListFooterComponent = () => {
  return (
    <View style={{width: "100%",height: 50,justifyContent:'center',alignItems:'center'}}>
      <Image source={loading} style={{width: 70,height:70}}/>
    </View>
  );
};

export default ListFooterComponent;
