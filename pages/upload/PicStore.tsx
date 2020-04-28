import React, {useState, useCallback} from 'react';
import {View, Text, RefreshControl} from 'react-native';
import ImageSelector from '../../components/ImageSelector';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'
import { useSelector } from 'react-redux';
interface Props {}

const PicStore: React.FC<Props> = props => {
  const [selectedList, setSelectedList] = useState<any[]>([]);
  const [mockList, setMockList] = useState<any[]>([]);
  const [loadImg, setLoadImg] = useState<boolean>(false);
  const [refreshMock, setRefreshMock] = useState<boolean>(false);
  const navigation = useNavigation();
  const clearKey = useSelector((state:any)=>state.upload.clearKey)
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
  const mock = () => {
    let imageUrlArr = [];
    for (let i = 0; i < 15; i++) {
      imageUrlArr.push(
        `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
          Math.random() * 2000,
        )}.jpg`,
      );
    }
    setRefreshMock(false);
    setMockList(imageUrlArr);
  };
  return (
    <>
      {loadImg ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshMock}
              onRefresh={() => {
                mock();
                // setRefreshMock(true);
              }}
            />
          }>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {mockList.map((item, index) => {
              return (
                <ImageSelector
                clearKey={clearKey}
                  group={3}
                  key={'' + index}
                  onSelect={handleSelect}
                  uri={item}
                />
              );
            })}
          </View>
          <View
            style={{
              height: 49,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("editPost",{type:'upload'})
              }}>
              <Text style={{fontSize: 16, padding: 15, fontWeight: 'bold'}}>
                继续
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <TouchableOpacity
          style={{width: '100%', height: '100%'}}
          onLongPress={() => {
            setLoadImg(true);
            mock();
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{alignSelf: 'center', textAlign: 'center', padding: 30}}>
              Tips:
              加载线上图片会消耗大量流量，如有需要长按屏幕加载，下拉会换一批新图。
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default PicStore;
