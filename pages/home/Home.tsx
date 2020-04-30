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
import {get} from '../../common/useRequest';

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
    init();
  }, []);
  async function init() {
    let myLikeList = await get(api.GET_MYLIKELIST + '?userId=' + userInfo._id);
    dispatch({type: 'addLike', value: myLikeList.data.data});
    let collectionList = await get(api.GET_COLLECTIONLIST+'?userId='+userInfo._id);
    dispatch({type:'addCollection',value:collectionList.data.data})
  }
  async function requestData(pageNum: number, pageSize: number) {
    try {
      let response = await fetch(
        api.GET_USERALLPOST +
          `?userId=${
            userInfo ? userInfo._id : ''
          }&pageSize=${pageSize}&pageNum=${pageNum}`,
      );
      let result = await response.json();
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
          pageSize={10}
          {...props}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
