import React from 'react';
import {View, Text, Image} from 'react-native';
import loading from '../../assets/animate/loading.gif';
interface Props {
  notMore?: boolean;
}
const ListFooterComponent: React.FC<Props> = props => {
  const {notMore} = props;
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {notMore ? (
        <Text>我也是有底线的...</Text>
      ) : (
        <Image source={loading} style={{width: 70, height: 70}} />
      )}
    </View>
  );
};

export default ListFooterComponent;
