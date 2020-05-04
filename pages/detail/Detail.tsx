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
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Popover from 'react-native-popover-view';
import {useSelector, useDispatch} from 'react-redux';
import {get, post} from '../../common/useRequest';
import api from '../../config/api';
import formatDate from '../../common/formatDate';
import {NavigationProp} from '@react-navigation/native';
import ImageList from '../../components/ImageList';
import ReplyCard from './ReplyCard';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import ReplyDialog from '../../components/ReplyDialog';
import Waiting from '../../components/Waiting'
interface Props {
  navigation: NavigationProp<any>;
  route: any;
}

const Detail: React.FC<Props> = props => {
  const {navigation, route} = props;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>();
  const [like, setLike] = useState<boolean>(false);
  const [collection, setCollection] = useState<boolean>(false);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const myLikeList = useSelector((state: any) => state.like.myLikeList);
  const [postData, setPostData] = useState<any>();
  const [error, setError] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [replyList, setReplyList] = useState<any[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [replyIndex, setReplyIndex] = useState(0);
  const collectionList = useSelector(
    (state: any) => state.collect.collectionList,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!route.params.postId) return;
    initData(route.params.postId);
  }, [route.params.postId]);

  async function initData(postId: string) {
    let data = await get(api.GET_POSTBYID + '?postId=' + postId);
    let likeData = await get(api.GET_LIKECOUNT + '?postId=' + postId);
    let likeList = await get(api.GET_LIKELIST + '?postId=' + postId);
    if (data.code === 0) {
      setPostData(data.data);
      setError(false);
    } else {
      ToastAndroid.show('请求出错！' + data.msg, 1000);
      setError(true);
    }
    if (likeData.code === 0) {
      setLikeCount(likeData.data);
    } else {
      setLikeCount(0);
    }
  }
  /**获取评论数据 */
  useEffect(() => {
    getReplyData(route.params.postId);
  }, [route.params.postId, replyIndex]);

  async function getReplyData(postId: string) {
    let replyData = await get(api.GET_REPLYLIST + `?postId=${postId}`);
    if (replyData.code === 0) {
      setReplyList(replyData.data.data);
    }
  }
  useEffect(() => {
    if (!postData) return;
    if (myLikeList) {
      for (let i = 0; i < myLikeList.length; i++) {
        if (myLikeList[i] === postData._id) {
          setLike(true);
          break;
        }
      }
    }
  }, [myLikeList.length, postData]);
  useEffect(() => {
    if (!postData) return;
    if (collectionList.length) {
      for (let i = 0; i < collectionList.length; i++) {
        if (collectionList[i] === postData._id) {
          setCollection(true);
          break;
        }
      }
    }
  }, [collectionList.length, postData]);
  const addLike = () => {
    if (!like) {
      post(api.ADD_LIKE, {
        userId: userInfo._id,
        postId: postData._id,
        time: new Date().getTime(),
      }).then(res => {
        dispatch({type: 'addLike', value: [res.data.postId]});
        setLike(true);
        setLikeCount(likeCount + 1);
      });
    } else {
      post(api.DELETE_LIKE, {userId: userInfo._id, postId: postData._id}).then(
        res => {
          dispatch({type: 'deleteLike', value: postData._id});
          setLike(false);
          setLikeCount(likeCount - 1);
        },
      );
    }
  };
  const collectionAction = () => {
    if (!collection) {
      post(api.ADD_COLLECTION, {
        userId: userInfo._id,
        postId: postData._id,
        time: new Date().getTime(),
      }).then(res => {
        dispatch({type: 'addCollection', value: [res.data.postId]});
        setCollection(true);
      });
    } else {
      post(api.DELETE_COLLECTION, {
        userId: userInfo._id,
        postId: postData._id,
      }).then(res => {
        dispatch({type: 'deleteCollection', value: postData._id});
        setCollection(false);
      });
    }
  };

  return (
    <>
      {error || !postData ? (
        <Waiting />
      ) : (
        <ScrollView>
          <View style={HomeStyle.cardWrap}>
            <ReplyDialog
              onClose={() => setDialogVisible(false)}
              visible={dialogVisible}
              postId={route.params.postId}
              userId={userInfo._id}
              onBack={(status: boolean) => {
                if (status) {
                  setReplyIndex(replyIndex + 1);
                }
              }}
            />
            <>
              <View style={HomeStyle.cardHeader}>
                <TouchableOpacity
                  onPress={() => {
                    if (postData.userId._id === userInfo._id) {
                      navigation.navigate('userTab');
                    } else {
                      navigation.navigate('user', {
                        userId: postData.userId._id,
                      });
                    }
                  }}>
                  <View style={HomeStyle.cardHIcon}>
                    <Image
                      style={HomeStyle.cardHIImg}
                      source={{
                        uri: postData.userId.icon,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <Text style={HomeStyle.cardHName}>
                  {postData.userId.username}
                </Text>

                <TouchableOpacity onPress={() => setIsVisible(true)}>
                  <View style={HomeStyle.cardHMore}>
                    <Image
                      style={HomeStyle.cardHMImg}
                      source={icons.more2}
                      ref={ref}
                    />
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
                  {postData &&
                    postData.imageUrl.map((i: any, index: number) => {
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
                      setDialogVisible(true);
                    }}>
                    <Image style={HomeStyle.cardIcon} source={icons.say} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Alert.alert('分享xxx')}>
                    <Image style={HomeStyle.cardIcon} source={icons.fly} />
                  </TouchableOpacity>
                </View>
                <View style={HomeStyle.actionRight}>
                  <TouchableOpacity onPress={collectionAction}>
                    <Image
                      style={HomeStyle.cardIcon}
                      source={collection ? icons.colla : icons.coll}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {likeCount > 0 && (
                <Text style={{paddingLeft: 10, color: '#888', fontSize: 13}}>
                  {likeCount}次喜欢
                </Text>
              )}
              <View style={HomeStyle.desc}>
                <Text style={HomeStyle.descContent}>
                  {postData.userId.username}: {postData.desc}
                </Text>
              </View>
              <View>
                <View style={HomeStyle.replyWrap}>
                  <Image
                    style={HomeStyle.replyerIcon}
                    source={{
                      uri: userInfo && userInfo.icon ? userInfo.icon : '',
                    }}
                  />
                  <TouchableOpacity onPress={() => setDialogVisible(true)}>
                    <Text style={HomeStyle.addReply}>添加评论...</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={HomeStyle.time}>{formatDate(postData.time)}</Text>
            </>
            <Text
              style={{
                marginLeft: 15,
                marginRight: 15,
                paddingTop: 10,
                paddingBottom: 5,
                borderBottomColor: '#ddd',
                borderBottomWidth: 1,
              }}>
              所有评论
            </Text>
            {replyList && replyList.length > 0 ? (
              <View>
                <View>
                  {replyList.map((item: any, index: number) => {
                    return <ReplyCard item={item} key={'' + index} />;
                  })}
                </View>
              </View>
            ) : (
              <ListEmptyComponent />
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Detail;
