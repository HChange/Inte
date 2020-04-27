import React from 'react';
import {View, Text, Image} from 'react-native';
import loadingImg from '../../assets/animate/loading.gif'
const ListEmptyComponent = () => {
  return (
    <View>
      <Text style={{alignSelf: 'center', fontSize: 14, color: '#666'}}>
        空空如也，什么也没有...
      </Text>
    </View>
  );
};

export default ListEmptyComponent;
