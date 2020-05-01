import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import DefaultListEmptyComponent from '../../components/ListEmptyComponent';
import DefaultListFooterComponent from '../../components/ListFooterComponent';
import {useSelector} from 'react-redux';
interface Props {
  Render: React.FC<any>;
  pageSize: number;
  group?: number;
  ListEmptyComponent?: React.FC<any>;
  ListHeaderComponent?: React.FC<any>;
  ListFooterComponent?: React.FC<any>;
  request: (pageNum: number, pageSize: number) => any;
  updateKey?: number;
}
const ImageList: React.FC<Props> = props => {
  const {
    Render,
    pageSize,
    group,
    ListHeaderComponent = null,
    ListEmptyComponent = DefaultListEmptyComponent,
    ListFooterComponent = DefaultListFooterComponent,
    request,
    updateKey = 0,
  } = props;

  const [initPostData, setInitPostData] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);
  const [count, setCount] = useState<number>(-1);
  const [notMore, setNotMore] = useState(false);
  const isLogin = useSelector((state: any) => state.loginStatus.loginStatus);

  useEffect(() => {
    if (!isLogin) {
      setInitPostData([]);
      return;
    }

    setCanLoadMore(false);
    setTimeout(async () => {
      let newData = await request(pageNum, pageSize);
      if (newData.data.count === 0) {
        setNotMore(true);
      }
      setCount(newData.data.count);
      if (!newData) return;
      let postData = newData.data.data;
      let groupData = [];
      let tmp = 1;
      /**如果有分组 */
      if (group) {
        do {
          groupData.push(postData.slice((tmp - 1) * group, tmp * group));
          tmp += 1;
        } while ((tmp - 1) * group < postData.length);
      } else {
        groupData = postData;
      }
      setCanLoadMore(true);
      setRefreshing(false);
      setInitPostData([...initPostData, ...groupData]);
    }, 20);
  }, [pageNum, pageSize, refresh]);
  useEffect(() => {
    if (!isLogin) {
      setInitPostData([]);
      setPageNum(1);
    }
  }, [isLogin]);
  useEffect(() => {
    if (updateKey > 0) {
      refreshAction();
    }
  }, [updateKey]);
  function refreshAction() {
    setNotMore(false);
    setRefresh(refresh + 1);
    setRefreshing(true);
    setInitPostData([]);
    setPageNum(1);
  }

  return (
    <View>
      <FlatList
        data={initPostData}
        onEndReachedThreshold={0.1}
        refreshing={refreshing}
        ListEmptyComponent={<ListEmptyComponent />}
        ListHeaderComponent={
          ListHeaderComponent ? <ListHeaderComponent {...props} /> : <></>
        }
        ListFooterComponent={<ListFooterComponent notMore={notMore} />}
        onRefresh={refreshAction}
        renderItem={({item}) => {
          return <Render item={item} />;
        }}
        keyExtractor={_item => {
          return _item[0] ? _item[0]._id : _item._id;
        }}
        onEndReached={() => {
          if (canLoadMore) {
            if (count !== -1 && count <= pageSize * pageNum) {
              setNotMore(true);
              return;
            } else {
              setNotMore(false);
            }
            setPageNum(pageNum + 1);
          }
        }}
        // refreshControl={refreshControlDOM}
      />
    </View>
  );
};

export default ImageList;
