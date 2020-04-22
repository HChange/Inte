import React from 'react'
import { View, Text, Image } from 'react-native'
import { NavigationProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
type Props = {
    navigation: NavigationProp<any>;
    route: any;
  };
const EditPost:React.FC<Props> = (props) => {
    let imgList = useSelector((state:any)=>state.camera.imgList)

    console.log(imgList);
    
    const {navigation,route} = props;
    return (
        <View style={{flex:1,backgroundColor:'red'}}>
            <Text>123</Text>
            {
                imgList.map((item:string)=>{
                    return <Image key={item} style={{width: 100,height:100}} resizeMode="cover" source={{uri:item}}/>
                })
            }
            
            
        </View>
    )
}

export default EditPost
