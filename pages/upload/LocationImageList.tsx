import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/AntDesign';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ImageSelector from '../../components/ImageSelector';

interface Props {
  /**数据列表 */
  detailList: CameraRoll.PhotoIdentifier[];
  /**返回的回调函数 */
  onBack: () => any;
}
const LocationImageList: React.FC<Props> = props => {
  const {detailList, onBack} = props;
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const handleSelect = useCallback(
    (uri: string, status: boolean) => {
      console.log(selectedList);
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
      <TouchableOpacity
        onPress={() => {
          onBack();
        }}>
        <View style={styles.header}>
          <Text style={{fontSize: 16}}>返回</Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.wrap}>
          {detailList.map((item, index) => {
            return (
              <ImageSelector
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
  },
  wrap: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 49
  },
});
export default LocationImageList;
