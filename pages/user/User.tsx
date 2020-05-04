import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ToastAndroid,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Button, TextareaItem} from '@ant-design/react-native';
import {useSelector, useDispatch} from 'react-redux';
import api from '../../config/api';
import styles from './styles';
import ImageList from '../../components/ImageList';
import ImageGroup from './ImageGroup';
import {get, post} from '../../common/useRequest';

const User: React.FC<any> = (props: any) => {
  const userId = props.route.params.userId;
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const update = useSelector((state: any) => state.update.update);
  const [sign, setSign] = useState<string>('');
  const [updateKey, setUpdateKey] = useState(0);
  const [myFollowCount, setMyFollowCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [followCount, setFollowCount] = useState(0);
  const [thisUserInfo, setThisUserInfo] = useState<any>();
  const [myFollowList, setMyFollowList] = useState<any[]>([]);
  const [isFollow, setIsFollow] = useState(false);
  function formatNum(number: number | string) {
    let tmp;
    if (number >= 100000000) {
      tmp = (Number(number) / 100000000).toFixed(2) + '亿';
    } else if (number >= 100000) {
      tmp = (Number(number) / 100000).toFixed(2) + '万';
    } else {
      tmp = number;
    }
    return tmp;
  }

 
  async function requestData(pageNum: number, pageSize: number) {
    return get(
      api.GET_USERALLPOST +
        `?userId=${userId}&pageSize=${pageSize}&pageNum=${pageNum}`,
    );
  }

  /**初始化页面数据 */
  useEffect(() => {
    if (userId) {
      init(userId);
    }
  }, [userId]);

  const init = useCallback(
    async userIdValue => {
      let myFollowCountRes = await get(
        api.GET_MYFOLLOWCOUNT + '?myUserId=' + userIdValue,
      );
      let followCountRes = await get(
        api.GET_FOLLOWCOUNT + '?userId=' + userIdValue,
      );
      let postCountRes = await get(
        api.GET_POSTCOUNT + '?userId=' + userIdValue,
      );
      let thisUserInfoRes = await get(
        api.GET_USERBYID + '?userId=' + userIdValue,
      );
      let myFollowListRes = await get(
        api.GET_MYFOLLOWLIST + '?myUserId=' + userInfo._id,
      );
      if (myFollowListRes.code === 0) {
        let myFollowIdList = myFollowListRes.data.data.map((item: any) => {
          return item.userId._id;
        });
        console.log(myFollowIdList);

        setMyFollowList(myFollowIdList);
      }
      setMyFollowCount(myFollowCountRes.data);
      setFollowCount(followCountRes.data);
      setPostCount(postCountRes.data);
      setThisUserInfo(thisUserInfoRes.data);
    },
    [api],
  );
  useEffect(() => {
    if (myFollowList.length > 0 && userId) {
      if(myFollowList.indexOf(userId)>=0){
        setIsFollow(true);
      }else{
        setIsFollow(false);
      }
      
    }
  }, [myFollowList, userId]);
  async function _followAction() {
    if(isFollow){
      //取消关注
      let result = await post(api.DELETE_FOLLOW,{
        userId: userId,
        myUserId:userInfo._id
      })
      if(result.code===0){
        setIsFollow(false)
        ToastAndroid.show(result.msg,1000);
      }else{
        ToastAndroid.show(result.msg, 1000);
      }
    }else{
        let result = await post(api.ADD_FOLLOW, {
          userId: userId,
          myUserId: userInfo._id,
        });
        if (result.code === 0) {
          ToastAndroid.show(result.msg, 1000);
          setIsFollow(true);
        } else {
          ToastAndroid.show(result.msg, 1000);
        }
    }
  }
  return (
    <>
      <View style={styles.wrap}>
        <View style={styles.header}>
          <Text style={styles.username} numberOfLines={1}>
            {thisUserInfo && thisUserInfo.username}
          </Text>
          <TouchableOpacity
            onPress={() => {
             _followAction();
            }}>
            <View
              style={{
                paddingLeft: 6,
                paddingRight: 6,
                paddingTop: 2,
                paddingBottom: 2,
                borderColor: isFollow ? '#ccc' : '#3897f0',
                borderWidth: 1,
                borderRadius: 3,
                backgroundColor: isFollow ? '#ccc' : '#3897f0',
                marginRight: 5,
              }}>
              <Text style={{color: '#f0f0f0', fontSize: 12}}>
                {isFollow ? '已关注' : '关注+'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.info}>
            <Image
              style={styles.headImg}
              source={{
                uri:
                  thisUserInfo && thisUserInfo.icon ? thisUserInfo.icon : '//',
              }}
            />
            <View style={styles.realInfo}>
              <View>
                <Text style={[styles.num, styles.realText]} numberOfLines={1}>
                  {formatNum(postCount || 0)}
                </Text>
                <Text style={styles.realText}>帖子</Text>
              </View>
              <View>
                <Text style={[styles.num, styles.realText]} numberOfLines={1}>
                  {formatNum(followCount || 0)}
                </Text>
                <Text style={styles.realText}>粉丝</Text>
              </View>
              <View>
                <Text style={[styles.num, styles.realText]} numberOfLines={1}>
                  {formatNum(myFollowCount || 0)}
                </Text>
                <Text style={styles.realText}>已关注</Text>
              </View>
            </View>
          </View>
          <View style={styles.sign}>
            <Text>个性签名</Text>
            <TextareaItem
              rows={3}
              editable={false}
              style={styles.signTextView}
              value={
                thisUserInfo && thisUserInfo.data && thisUserInfo.data.sign
                  ? thisUserInfo.data.sign
                  : ''
              }
              onChangeText={value => {
                setSign(value);
              }}
              numberOfLines={3}
              placeholder="Ta是一个神秘的人，什么都没有留下"
            />
          </View>
        </View>
        <View style={styles.imageListWrap}>
          <ImageList
            updateKey={updateKey}
            Render={ImageGroup}
            pageSize={15}
            group={3}
            request={requestData}
          />
        </View>
      </View>
    </>
  );
};

export default User;
