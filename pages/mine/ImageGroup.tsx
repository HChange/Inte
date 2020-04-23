import React from 'react'
import { View, Text ,Image} from 'react-native'
import styles from './imageListStyle';
interface Props{
    item:Array<any>
}
const ImageGroup:React.FC<Props> = (props) => {
    const {item} = props;
  
    return (
        <View style={styles.imageWrap}>
        {item.map((_item: any) => {
          return (
            <Image
              key={_item._id}
              source={{uri: _item.imageUrl[0]}}
              style={styles.image}
            />
          );
        })}
      </View>
    )
}

export default ImageGroup
