import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import ImageList from '../../components/ImageList';
import {get, post} from '../../common/useRequest';
import api from '../../config/api';
import formatDate from '../../common/formatDate';
import iconMap from '../../assets';
interface Props {
  navigation: NavigationProp<any>;
  route: {
    key: string;
    name: string;
    params: any;
  };
}

interface PostCardProps {
  item: any;
}
const CollectCard: React.FC<PostCardProps> = props => {
  let {item} = props;
  const navigation = useNavigation();
  const postId = item.postId._id;
  const {desc, imageUrl, time} = item.postId;
  const userId = item.postId.userId._id;
  const {icon, username} = item.postId.userId;
  const [collection, setCollection] = useState<boolean>(true);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const dispatch = useDispatch();
  const collectionAction = () => {
    if (!collection) {
      post(api.ADD_COLLECTION, {
        userId: userInfo._id,
        postId: postId,
        time: new Date().getTime(),
      }).then(res => {
        dispatch({type: 'addCollection', value: [res.data.postId]});
        setCollection(true);
      });
    } else {
      post(api.DELETE_COLLECTION, {
        userId: userInfo._id,
        postId: postId,
      }).then(res => {
        dispatch({type: 'deleteCollection', value: postId});
        setCollection(false);
      });
    }
  };
  const cardStyle = StyleSheet.create({
    wrap: {
      height: Dimensions.get('window').width / 2,
      width: '100%',
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      flexDirection: 'row',
      padding: 10,
      position: 'relative',
    },
    showImg: {
      width: '100%',
      height: '100%',
      borderRadius: 3,
    },
    infoCard: {
      position: 'absolute',
      //   top: 10,
      //   left: 10,
      // backgroundColor: 'red',
      width: '100%',
      height: '100%',
      justifyContent: 'flex-start',
      // padding: 10,
      // backgroundColor: 'red',
      borderRadius: 3,
      padding: 10,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    ui: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
    },
    icon: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
    username: {
      fontSize: 18,
      marginLeft: 10,
      fontWeight: 'bold',
      color: '#ddd',
    },
    desc: {
      fontSize: 14,
      marginTop: 5,
      height: 58,
      color: '#fff',
    },
    time: {
      fontSize: 12,
      color: '#bbb',
      marginTop: 5,
    },
    slide: {
      flex: 1,
    },
  });
  return (
    <View style={cardStyle.wrap}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => navigation.navigate('detail', {postId: postId})}>
        <View style={{flex: 1}}>
          <Swiper
            // style={cardStyle.wrap}
            horizontal={true}
            autoplay
            showsPagination={false}
            showsButtons={false}
            bounces={true}
            autoplayTimeout={6}>
            {imageUrl.map((item: string, index: number) => {
              return (
                <View style={cardStyle.slide} key={+index}>
                  <Image
                    style={cardStyle.showImg}
                    source={{uri: imageUrl[index]}}
                    resizeMode="cover"
                  />
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={cardStyle.infoCard}>
          <View style={cardStyle.ui}>
            <Image style={cardStyle.icon} source={{uri: icon}} />

            <Text style={cardStyle.username} numberOfLines={1}>
              {username}
            </Text>
          </View>
          <Text style={cardStyle.desc} numberOfLines={3}>
            {desc}
          </Text>
          <Text style={cardStyle.time}>{formatDate(time)}</Text>
        </View>
      </TouchableOpacity>

      <View style={{position: 'absolute', right: 10, top: 10, padding: 10}}>
        <TouchableOpacity onPress={collectionAction}>
          <Image
            style={{width: 32, height: 32}}
            source={collection ? iconMap.collecta : iconMap.collect}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const CollectList: React.FC<Props> = props => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const [updateKey, setUpdateKey] = useState(0);
  useEffect(() => {
    setUpdateKey(updateKey + 1);
  }, [userInfo._id]);

  const request = (pageNum: number, pageSize: number) => {
    return get(
      api.GET_COLLECTIONLIST +
        `?userId=${userInfo._id}&pageSize=${pageSize}&pageNum=${pageNum}`,
    );
  };
  return (
    <View style={{flex: 1}}>
      <ImageList
        Render={CollectCard}
        pageSize={20}
        request={request}
        updateKey={updateKey}
      />
    </View>
  );
};

export default CollectList;
