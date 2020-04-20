import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import styles from './imageListStyle';
const ImageList = () => {
  const [imageData, setImageData] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageNum, setPageNum] = useState<number>(24);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
  let i = 0;
  useEffect(() => {
    setCanLoadMore(false);
    setTimeout(() => {
      let newData = mock();
      if (!newData) return;
      let formatData = [];
      let tmp = 1;
      do {
        formatData.push(newData.slice((tmp - 1) * 3, tmp * 3));
        tmp += 1;
      } while (tmp * 3 <= newData.length);
      setCanLoadMore(true);
      console.log(formatData);
      setImageData([...imageData, ...formatData]);
    }, 2000);
  }, [pageIndex, pageNum]);
  function mock() {
    let mockData: any[] = [];
    for (let i = (pageIndex - 1) * pageNum + 1; i <= pageIndex * pageNum; i++) {
      mockData.push({
        key: '' + i,
        source: `https://wallpaper.infinitynewtab.com/wallpaper/${i}.jpg`,
      });
    }
    return mockData;
  }

  return (
    <View>
      <FlatList
        data={imageData}
        onEndReachedThreshold={0.1}
        refreshing={false}
        onRefresh={() => {
          console.log('下拉刷新...');
        }}
        renderItem={({item}) => {
          return (
            <View style={styles.imageWrap}>
              {item.map((_item: any) => {
                return (
                  <Image
                    key={_item.key}
                    source={{uri: _item.source}}
                    style={styles.image}
                  />
                );
              })}
            </View>
          );
        }}
        keyExtractor={(_item) => {
          return _item[0].key;
        }}
        onEndReached={() => {
          if (canLoadMore) {
            console.log(1);

            setPageIndex(pageIndex + 1);
          }
        }}
        // refreshControl={refreshControlDOM}
      />
    </View>
  );
};

export default ImageList;
