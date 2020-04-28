import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ImageSelector from '../../components/ImageSelector';
import {useNavigation} from '@react-navigation/native'
import { useSelector } from 'react-redux';
interface Props {
  /**数据列表 */
  detailList: CameraRoll.PhotoIdentifier[];
  /**返回的回调函数 */
  onBack: () => any;
}
const LocationImageList: React.FC<Props> = props => {
  const {detailList, onBack} = props;
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [nowTouchImage, setNowTouchImage] = useState<string>('');
  const clearKey = useSelector((state:any)=>state.upload.clearKey)
  const navigation = useNavigation();
  useEffect(() => {
    if (detailList.length <= 0 && !detailList[0].node.image.uri) return;
    setNowTouchImage(detailList[0].node.image.uri);
  }, [detailList]);
  const handleSelect = useCallback(
    (uri: string, status: boolean) => {
      setNowTouchImage(uri);
      if (status) {
        setSelectedList([...selectedList, uri]);
      } else {
        let newList = selectedList.filter((item: string) => {
          return item !== uri;
        });
        setSelectedList(newList);
      }
    },
    [selectedList],
  );
  return (
    <View>
      <View style={styles.imageView}>
        <Image
          source={{
            uri: nowTouchImage ? nowTouchImage : '../../assets/placeholder.png',
          }}
          style={{width: '100%', height: '100%'}}
        />
        <View style={styles.mask}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                onBack();
              }}>
              <Text style={{fontSize: 16,color:'#fff'}}>返回</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("editPost",{type:'upload'})
              }}>
            <Text style={{fontSize: 16,color:'#fff'}}>继续</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.wrap}>
          {detailList.length &&
            detailList.map((item, index) => {
              return (
                <ImageSelector
                  clearKey={clearKey}
                  key={item.node.image.uri}
                  onSelect={handleSelect}
                  group={4}
                  uri={item.node.image.uri}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 49,
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrap: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 49,
  },
  imageView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    position: 'relative',
    marginBottom: 1,
  },
  mask: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
  },
});
export default LocationImageList;
