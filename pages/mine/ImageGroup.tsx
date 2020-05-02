import React from 'react'
import { View, Text ,Image, ImageBackground} from 'react-native'
import styles from './imageListStyle';
import icons from '../../assets'
interface Props{
    item:Array<any>
}
const ImageGroup:React.FC<Props> = (props) => {
    const {item} = props;
  console.log(item);
  
    return (
      <>
      {item.length>0?
      <View style={styles.imageWrap}>
        {item&&item.map((_item: any) => {
          return (
            <ImageBackground key={_item._id} style={styles.image} source={icons.placeholder}>
              <Image
                
                source={{uri: _item.imageUrl[0]}}
                style={styles.image}
              />
            </ImageBackground>
          );
        })}
      </View>:
      <View key="1">
        <Text style={{alignSelf:'center',margin: 20}}>空空如也，你还没发过帖子哦</Text>
      </View>
      }
      </>
    );
}

export default ImageGroup
