import React, {useCallback, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Button} from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch} from 'react-redux';
import styles from './style';
import api from '.././../config/api';
import Loading from '../../components/Loading';
const Setting = function(props: any) {
  const dispatch = useDispatch();
  const [loadingVisible, setLoadingVisible] = useState(false);
  const logoutAction = useCallback(async () => {
    setLoadingVisible(true);
    let response = await fetch(api.LOGOUT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    let result = await response.json();
    if (result && result.code === 0) {
      await AsyncStorage.setItem('LOGINSTATUS', 'false');
      setLoadingVisible(false);
      props.navigation.jumpTo('mine');
      dispatch({type: 'logout', value: false});
      dispatch({type: 'clearLike'});
      dispatch({type: 'clearCollection'});
      dispatch({type: 'clearUploadImg'});
      dispatch({type: 'clearSearchKey'});
      dispatch({type: 'clearUserData'});
      dispatch({type: 'clearUserInfo'});
      dispatch({type: 'clearImg'});
    } else {
      Alert.alert('退出失败，请重试');
    }
  }, [dispatch]);

  return (
    <>
      <View style={styles.wrap}>
        <Loading loadingVisible={loadingVisible} text="正在退出，请稍后..." />
        <Text>setting</Text>
        <Button type="primary" onPress={logoutAction}>
          退出登录
        </Button>
      </View>
    </>
  );
};

export default Setting;
