import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import icons from '../../assets/index';
import HomeStyle from './style';
import ListHeaderComponent from './ListHeaderComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageList from '../../components/ImageList';
import HomeCard from './HomeCard';
import api from '../../config/api';
import {useSelector, useDispatch} from 'react-redux';
import {get, post} from '../../common/useRequest';

const Home: React.FC<any> = props => {
  const [updateKey, setUpdateKey] = useState(0);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const update = useSelector((state: any) => state.update.update);
  const dispatch = useDispatch();
  useEffect(() => {
    if (update > 0) {
      setUpdateKey(updateKey + 1);
    }
  }, [update]);
  useEffect(() => {
    if (!userInfo) {
      return;
    }
    init();
  }, [userInfo]);
  async function init() {
    let myLikeList = await get(api.GET_MYLIKELIST + '?userId=' + userInfo._id);
    if (myLikeList && myLikeList.code === 0) {
      let myLikeListId = myLikeList.data.data.map((item: any) => {
        return item.postId._id;
      });
      dispatch({type: 'addLike', value: myLikeListId});
    }
    let collectionList = await get(
      api.GET_COLLECTIONLIST + '?userId=' + userInfo._id,
    );
    if (collectionList && collectionList.code === 0) {
      let collectionListId = collectionList.data.data.map((item: any) => {
        return item.postId._id;
      });
      dispatch({type: 'addCollection', value: collectionListId});
    }
  }
  async function requestData(pageNum: number, pageSize: number) {
    try {
      let myFollow = await get(
        api.GET_MYFOLLOWLIST + '?myUserId=' + userInfo._id,
      );
      if(!myFollow||myFollow.code!==0) return;
      let myFollowId = myFollow.data.data.map((item: any) => {
        return item.userId._id;
      });
      myFollowId.push(userInfo._id);
      let result = await post(api.GET_HOMEALLPOST, {
        pageSize,
        pageNum,
        userId: myFollowId,
      });

      return result;
    } catch (error) {
      ToastAndroid.show(error.message, 1000);
    }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={HomeStyle.pageWrap}>
        <View style={HomeStyle.headerWrap}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('camera', {type: 'takePicture'});
            }}>
            <Image style={HomeStyle.iconStyle} source={icons.ca} />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <Image
              style={HomeStyle.logoStyle}
              resizeMode="contain"
              source={icons.inte}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('direct');
            }}>
            <Image style={HomeStyle.iconStyle} source={icons.fly} />
          </TouchableOpacity>
        </View>
        <ImageList
          updateKey={updateKey}
          Render={HomeCard}
          ListHeaderComponent={ListHeaderComponent}
          request={requestData}
          pageSize={6}
          {...props}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
