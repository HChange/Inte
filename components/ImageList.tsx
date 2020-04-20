import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import DefaultListEmptyComponent from '../components/ListEmptyComponent';
import DefaultListFooterComponent from '../components/ListFooterComponent';
interface Props {
  Render: React.FC<any>;
  pageNumber: number;
  group?: number;
  ListEmptyComponent?: React.FC<any>;
  ListHeaderComponent?: React.FC<any>;
  ListFooterComponent?: React.FC<any>;
}
const ImageList: React.FC<Props> = (props) => {
  const {
    Render,
    pageNumber,
    group,
    ListHeaderComponent=null,
    ListEmptyComponent = DefaultListEmptyComponent,
    ListFooterComponent = DefaultListFooterComponent,
  } = props;

  const [imageData, setImageData] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageNum, setPageNum] = useState<number>(pageNumber);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
  let i = 0;
  useEffect(() => {
    setCanLoadMore(false);
    setTimeout(() => {
      let newData = mock();
      if (!newData) return;
      let formatData = [];
      let tmp = 1;
      if (group) {
        do {
          formatData.push(newData.slice((tmp - 1) * group, tmp * group));
          tmp += 1;
        } while (tmp * group <= newData.length);
      } else {
        formatData = newData;
      }
      setCanLoadMore(true);
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
        ListEmptyComponent={<ListEmptyComponent />}
        ListHeaderComponent={ListHeaderComponent?<ListHeaderComponent {...props}/>:(<></>)}
        ListFooterComponent={<ListFooterComponent />}
        onRefresh={() => {
          console.log('下拉刷新...');
        }}
        renderItem={({item}) => {
          return <Render item={item} />;
        }}
        keyExtractor={(_item) => {
          return _item[0] ? _item[0].key : _item.key;
        }}
        onEndReached={() => {
          if (canLoadMore) {
            setPageIndex(pageIndex + 1);
          }
        }}
        // refreshControl={refreshControlDOM}
      />
    </View>
  );
};

export default ImageList;
