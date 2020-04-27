import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import iconMap from '../../assets';

interface CardProps {
  /**选择的回调函数 */
  onSelect: (uri: string, status: boolean) => any;
  /**图片地址 */
  uri: string;
  /**清除选择 */
  clearKey?: number;
  /**一行几个 */
  group?: number
}
const ImageSelector: React.FC<CardProps> = props => {
  const {onSelect, uri, clearKey = 0,group=3} = props;
  const [selected, setSelected] = useState<boolean>(false);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (clearKey > 0) {
      setSelected(false);
      onSelect(uri, false);
    }
  }, [clearKey]);

  const selectedAction = useCallback(() => {
    setSelected(!selected);
  }, [selected]);
  useEffect(() => {
    onSelect(uri, selected);
  }, [selected]);

  return (
    <TouchableOpacity style={[cardStyles.wrap,{width: Dimensions.get('window').width / group,
    height: Dimensions.get('window').width / group,}]} onPress={selectedAction}>
      <View style={[cardStyles.selector, {opacity: selected ? 1 : 0}]}>
        <View style={cardStyles.selectorIcon}>
          <Icon name="checkcircle" size={18} color="#00a1ff" />
        </View>
      </View>
      <ImageBackground style={cardStyles.image} source={iconMap.placeholder}>
        <Image
          style={cardStyles.image}
          source={{
            uri: uri,
          }}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const cardStyles = StyleSheet.create({
  wrap: {
    
    position: 'relative',
    borderRadius: 1,
  },
  selector: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderColor: '#00a1ff',
    borderWidth: 1,
    top: 0,
    left: 0,
    zIndex: 99,
    opacity: 0,
    borderRadius: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    padding: 1,
  },
  selectorIcon: {
    position: 'absolute',
    zIndex: 999,
    right: 5,
    bottom: 5,
    borderColor: '#00a1ff',
  },
});

export default ImageSelector;
