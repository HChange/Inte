import React from 'react'
import { View, Text ,Image} from 'react-native'
import iconMap from '../../assets'
const Register = () => {
    return (
        <View style={{flex:1}}>
            <Image style={{width: 150,height: 150}} resizeMode="contain" source={iconMap.registerUser}/>
            <Text>注册</Text>
        </View>
    )
}

export default Register
