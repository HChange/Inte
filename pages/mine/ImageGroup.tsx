import React from 'react'
import { View, Text ,Image, ImageBackground} from 'react-native'
import styles from './imageListStyle';
import icons from '../../assets'
interface Props{
    item:Array<any>
}
const ImageGroup:React.FC<Props> = (props) => {
    const {item} = props;
  
    return (
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
      </View>
    );
}

export default ImageGroup
