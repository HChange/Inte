import React from 'react';
import {View, Text, Image} from 'react-native';
const ListEmptyComponent = () => {
  return (
    <View>
      <Text style={{alignSelf: 'center', fontSize: 14, color: '#666',paddingTop: 30,}}>
        空空如也，什么也没有...
      </Text>
    </View>
  );
};

export default ListEmptyComponent;
