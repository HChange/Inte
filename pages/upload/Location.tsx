import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {Button} from '@ant-design/react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import LocationImageList from './LocationImageList';
interface RealDataItem {
  title: string;
  count: number;
  edges: CameraRoll.PhotoIdentifier[];
  page_info: {
    has_next_page: boolean;
    start_cursor?: string | undefined;
    end_cursor?: string | undefined;
  };
}
function Location() {
  const [imageList, setImageList] = useState<any[]>();
  const [groupList, setGroupList] = useState<{title: string; count: number}[]>(
    [],
  );
  const [realGroupData, setRealGroupData] = useState<any[]>([]);
  const [detailList, setDetailList] = useState<any[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const _handleButtonPress = () => {
    CameraRoll.getAlbums({assetType: 'Photos'}).then(group => {
      group = group.filter(item => {
        return item.title !== '微博动图';
      });
      setGroupList(group);
    });
  };
  useEffect(() => {
    if (!groupList) return;
    let groupPromise = groupList.map(
      async (item: {title: string; count: number}, index) => {
        if (item.title === '微博动图') return;
        return await CameraRoll.getPhotos({
          first: 1,
          assetType: 'Photos',
          groupTypes: 'Album',
          groupName: item.title,
        });
      },
    );
    Promise.all(groupPromise).then(data => {
      let realData = data.map((item, index) => {
        return {
          ...item,
          ...groupList[index],
        };
      });
      // console.log(realData);
      if (realData) {
        setRealGroupData(realData);
      }
    });
  }, [groupList]);

  const showImgListAction = async (title: string, count: number) => {
    let _detailList = await CameraRoll.getPhotos({
      first: count,
      assetType: 'Photos',
      groupTypes: 'Album',
      groupName: title,
    });
    setDetailList(_detailList.edges);
    setShowDetail(true);
  };
  return (
    <>
      {showDetail ? (
        <LocationImageList
          detailList={detailList}
          onBack={() => setShowDetail(false)}
        />
      ) : (
        <View>
          <Button
            onPress={() => {
              _handleButtonPress();
            }}>
            加载图片
          </Button>
          <ScrollView>
            <View style={styles.wrap}>
              {realGroupData.length > 0 &&
                realGroupData.map((item: RealDataItem, index: number) => {
                  return (
                    <TouchableOpacity
                      onPress={() => showImgListAction(item.title, item.count)}>
                      <View style={styles.imageWrap}>
                        <Image
                          key={index}
                          style={styles.image}
                          source={{uri: item.edges[0].node.image.uri}}
                        />
                        <View style={styles.mask}>
                          <Text style={styles.title}>{item.title}</Text>
                          <Text style={styles.count}>{item.count}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 49,
  },

  imageWrap: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  mask: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 99,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    position: 'absolute',
    zIndex: 99,
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    left: 12,
    bottom: 30,
  },
  count: {
    position: 'absolute',
    zIndex: 99,
    fontSize: 14,
    color: '#ddd',
    left: 12,
    bottom: 10,
  },
});
export default Location;
