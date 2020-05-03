import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  ToastAndroid,
  Alert,
  ImageBackground,
} from 'react-native';
import HomeStyle from './style';
import icons from '../../assets';
import {Carousel, Button} from '@ant-design/react-native';
import OpenList from './OpenList';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Popover from 'react-native-popover-view';
import {useSelector, useDispatch} from 'react-redux';
import {get, post} from '../../common/useRequest';
import api from '../../config/api';
import formatDate from '../../common/formatDate';
interface Props {
  item: any;
}
const HomeCard: React.FC<Props> = props => {
  const {item} = props;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>();
  const [like, setLike] = useState<boolean>(false);
  const [collection, setCollection] = useState<boolean>(false);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const myLikeList = useSelector((state: any) => state.like.myLikeList);
  const collectionList = useSelector((state: any) => state.collect.collectionList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (myLikeList) {
      for (let i = 0; i < myLikeList.length; i++) {
        if (myLikeList[i] === item._id) {
          setLike(true);
          break;
        }
      }
    }
  }, [myLikeList.length, item]);
  useEffect(() => {
    if (collectionList.length) {
      for (let i = 0; i < collectionList.length; i++) {
      
        if (collectionList[i] === item._id) {
          setCollection(true);
          break;
        }
      }
    }
  }, [collectionList.length, item]);
  const addLike = () => {
    if (!like) {
      post(api.ADD_LIKE, {
        userId: userInfo._id,
        postId: item._id,
        time: new Date().getTime(),
      }).then(res => {
        dispatch({type: 'addLike', value: [res.data.postId]});
        setLike(true);
      });
    } else {
      post(api.DELETE_LIKE, {userId: userInfo._id, postId: item._id}).then(
        res => {
          dispatch({type: 'deleteLike', value: item._id});
          setLike(false);
        },
      );
    }
  };
  const collectionAction = () => {

    if (!collection) {
      post(api.ADD_COLLECTION, {
        userId: userInfo._id,
        postId: item._id,
        time: new Date().getTime(),
      }).then(res => {
        dispatch({type: 'addCollection', value: [res.data.postId]});
        setCollection(true);
      });
    } else {
      post(api.DELETE_COLLECTION, {userId: userInfo._id, postId: item._id}).then(
        res => {
          dispatch({type: 'deleteCollection', value: item._id});
          setCollection(false);
        },
      );
    }
  };
 
  return (
    <View style={HomeStyle.cardWrap}>
      <View style={HomeStyle.cardHeader}>
        <TouchableOpacity
          onPress={() => ToastAndroid.show(item.userId._id, 500)}>
          <View style={HomeStyle.cardHIcon}>
            <Image
              style={HomeStyle.cardHIImg}
              source={{
                uri: item.userId.icon,
              }}
            />
          </View>
        </TouchableOpacity>
        <Text style={HomeStyle.cardHName}>{item.userId.username}</Text>

        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <View style={HomeStyle.cardHMore}>
            <Image style={HomeStyle.cardHMImg} source={icons.more2} ref={ref} />
          </View>
        </TouchableOpacity>
        <Popover
          isVisible={isVisible}
          fromView={ref.current}
          onRequestClose={() => setIsVisible(false)}>
          <OpenList />
        </Popover>
      </View>
      <View style={HomeStyle.bannerWrap}>
        <Carousel
          dots={false}
          afterChange={current => {
            // console.log(current);
          }}>
          {item &&
            item.imageUrl.map((i: any, index: number) => {
              return (
                <ImageBackground
                  source={icons.placeholder}
                  key={'' + index}
                  style={HomeStyle.bannerOne}>
                  <Image
                    style={HomeStyle.bannerImg}
                    source={{
                      uri: i,
                    }}
                  />
                </ImageBackground>
              );
            })}
        </Carousel>
      </View>
      <View style={HomeStyle.cardAction}>
        <View style={HomeStyle.actionLeft}>
          <TouchableOpacity onPress={addLike}>
            <Image
              style={HomeStyle.cardIcon}
              source={like ? icons.redLike : icons.like}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('是否评论？');
            }}>
            <Image style={HomeStyle.cardIcon} source={icons.say} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('分享')}>
            <Image style={HomeStyle.cardIcon} source={icons.fly} />
          </TouchableOpacity>
        </View>
        <View style={HomeStyle.actionRight}>
          <TouchableOpacity
            onPress={collectionAction}>
            <Image
              style={HomeStyle.cardIcon}
              source={collection ? icons.colla : icons.coll}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={HomeStyle.desc}>
        <TouchableOpacity onPress={() => ToastAndroid.show(item._id, 500)}>
          <Text style={HomeStyle.descContent} numberOfLines={1}>
            {item.userId.username}: {item.desc}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={HomeStyle.replyWrap}>
          <Image
            style={HomeStyle.replyerIcon}
            source={{
              uri: (userInfo && userInfo.icon) ? userInfo.icon : '',
            }}
          />
          <TouchableOpacity
            onPress={() =>
              ToastAndroid.show(userInfo ? userInfo._id : '', 500)
            }>
            <Text style={HomeStyle.addReply}>添加评论...</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={HomeStyle.time}>{formatDate(item.time)}</Text>
    </View>
  );
};

export default HomeCard;
