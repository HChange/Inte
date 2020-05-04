import React from 'react'
import { View, Text ,Image, ImageBackground, TouchableOpacity} from 'react-native'
import styles from './imageListStyle';
import icons from '../../assets'
import { useNavigation } from '@react-navigation/native';
interface Props{
    item:Array<any>
}
const ImageGroup:React.FC<Props> = (props) => {
    const {item} = props;
    const navigation = useNavigation();
    return (
      <>
      {item.length>0?
      <View style={styles.imageWrap}>
        {item&&item.map((_item: any) => {
          return (
            <TouchableOpacity
              key={_item._id}
              onPress={() =>
                navigation.navigate('detail', {postId: _item._id})
              }>
              <ImageBackground
                key={_item._id}
                style={styles.image}
                source={icons.placeholder}>
                <Image source={{uri: ( _item&&_item.imageUrl&&_item.imageUrl[0])?_item.imageUrl[0]:""}} style={styles.image} />
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>:
      <View key="1">
        <Text style={{alignSelf:'center',margin: 20}}>空空如也，ta还没发过帖子哦</Text>
      </View>
      }
      </>
    );
}

export default ImageGroup
