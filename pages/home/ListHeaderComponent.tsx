import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const ListHeaderComponent = (props: any) => {
  // console.log(props);

  return (
    <View
      style={{
        height: 96,
        width: '100%',
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1,
      }}>
      <TouchableOpacity onPress={() => props.navigation.navigate('camera')}>
        <View
          style={{
            width: 56,
            height: 56,
            position: 'relative',
            marginTop: 15,
            marginLeft: 10,
          }}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 56, height: 56, borderRadius: 28}}
            source={{
              uri:
                'http://softwareengineeringdaily.com/wp-content/uploads/2015/07/react.png',
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 18,
              height: 18,
              backgroundColor: '#249bff',
              borderRadius: 10,
              bottom: -3,
              right: -3,
              zIndex: 999,
              borderWidth: 1.5,
              borderColor: '#ffffff',
            }}>
            <Text
              style={{
                // fontWeight: 'bold',
                color: '#ffffff',
                fontSize: 16,
                textAlign: 'center',
                lineHeight: 17,
              }}>
              +
            </Text>
          </View>
        </View>

        <Text style={{fontSize: 12, color: '#333333', marginLeft: 13}}>
          你的快拍
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListHeaderComponent;
