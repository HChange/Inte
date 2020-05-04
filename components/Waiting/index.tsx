import React from 'react'
import { View, Image} from 'react-native'
import Loadimg from '../../assets/animate/loading-loop.gif';
const Waiting = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 200, height: 200}}
          resizeMode="center"
          source={Loadimg}
        />
      </View>
    );
}

export default Waiting
