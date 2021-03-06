import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, ToastAndroid, FlatList} from 'react-native';
import {Button, TextareaItem} from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import Dialog from 'react-native-dialog';
import {TouchableOpacity} from 'react-native-gesture-handler';
import api from '../../config/api';
import styles from './styles';
import ImageList from '../../components/ImageList';
import ImageGroup from './ImageGroup';
import {get} from '../../common/useRequest';
import { useNavigation } from '@react-navigation/native';

const Mine: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const userData = useSelector((state: any) => state.user.userData);
  const update = useSelector((state: any) => state.update.update);
  const [sign, setSign] = useState<string>(userInfo && userInfo.sign);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [signTmp, setSignTmp] = useState<any>();
  const [editFouce, setEditFouce] = useState(false);
  const [updateKey, setUpdateKey] = useState(0);
  const navigation = useNavigation();
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
    let response = await fetch(
      api.GET_USERALLPOST +
        `?userId=${userInfo._id}&pageSize=${pageSize}&pageNum=${pageNum}`,
    );
    let result = await response.json();
    return result;
  }

  useEffect(() => {
    setUpdateKey(updateKey + 1);
  }, [update]);
  /**初始化页面数据 */
  useEffect(() => {
    if (userInfo && userInfo._id) {
      init();
    }
  }, []);

  const init = useCallback(async () => {
    try {
      let myFollowCount = await get(
        api.GET_MYFOLLOWCOUNT + '?myUserId=' + userInfo._id,
      );
      let followCount = await get(
        api.GET_FOLLOWCOUNT + '?userId=' + userInfo._id,
      );
      let postCount = await get(api.GET_POSTCOUNT + '?userId=' + userInfo._id);
      let userData = {
        myFollowCount: myFollowCount.data,
        followCount: followCount.data,
        postCount: postCount.data,
      };
      dispatch({type: 'setUserData', value: userData});
    } catch {
      ToastAndroid.show('数据初始化出错！', 1000);
    }
  }, [api]);
  return (
    <>
      <Dialog.Container visible={editVisible}>
        <Dialog.Title>编辑你的自我介绍</Dialog.Title>
        <TextareaItem
          rows={3}
          editable={true}
          style={[styles.signText, editFouce && {borderColor: '#3897f0'}]}
          value={sign}
          onChangeText={value => {
            setSign(value);
          }}
          onFocus={() => {
            setEditFouce(true);
          }}
          count={30}
          numberOfLines={3}
          placeholder="优秀的自我介绍，可以让更多人认识你"
        />
        <Dialog.Button
          label="取消"
          style={{color: '#3897f0'}}
          onPress={() => {
            setEditVisible(false);
            setSign(signTmp);
          }}
        />
        <Dialog.Button
          style={{color: '#3897f0'}}
          label="确定"
          onPress={async () => {
            setEditVisible(false);
            setSignTmp(sign);
            let response = await fetch(api.SET_SIGN + '?sign=' + sign);
            let result = await response.json();
            if (result && result.code === 0) {
              ToastAndroid.show('设置成功', 500);
            } else {
              ToastAndroid.show('设置失败', 500);
            }
          }}
        />
      </Dialog.Container>
      <View style={styles.wrap}>
        <View style={styles.header}>
          <Text style={styles.username} numberOfLines={1}>
            {userInfo && userInfo.username}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.openDrawer();
            }}>
            <Icon name="bars" color="#333" size={29} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.info}>
            <Image
              style={styles.headImg}
              source={{
                uri: userInfo ? userInfo.icon : '',
              }}
            />
            <View style={styles.realInfo}>
              <View>
                <Text style={[styles.num, styles.realText]} numberOfLines={1}>
                  {formatNum(userData.postCount || 0)}
                </Text>
                <Text style={styles.realText}>帖子</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('follow', {type: 'follow'});
                }}>
                <View>
                  <Text style={[styles.num, styles.realText]} numberOfLines={1}>
                    {formatNum(userData.followCount || 0)}
                  </Text>
                  <Text style={styles.realText}>粉丝</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('follow', {type: 'myFollow'});
                }}>
                <View>
                  <Text style={[styles.num, styles.realText]} numberOfLines={1}>
                    {formatNum(userData.myFollowCount || 0)}
                  </Text>
                  <Text style={styles.realText}>已关注</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sign}>
            <Text>个性签名</Text>
            <View style={styles.openEditWrap}>
              <TouchableOpacity
                onPress={() => {
                  setEditVisible(true);
                  setSignTmp(sign);
                }}>
                <Icon name="edit" color="#3897f0" size={20} />
              </TouchableOpacity>
            </View>

            <TextareaItem
              rows={3}
              editable={false}
              style={styles.signTextView}
              value={sign}
              onChangeText={value => {
                setSign(value);
              }}
              numberOfLines={3}
              placeholder="优秀的自我介绍，可以让更多人认识你"
            />
          </View>
          <Button
            style={styles.editButton}
            type="ghost"
            size="small"
            onPress={() => {
              props.navigation.push('editInfo');
            }}>
            编辑主页
          </Button>
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

export default Mine;
