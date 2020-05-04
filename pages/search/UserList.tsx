import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableHighlightBase,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ImageList from '../../components/ImageList';
import {get} from '../../common/useRequest';
import api from '../../config/api';
import iconMap from '../../assets'

interface Props {
  navigation: NavigationProp<any>;
  route: {
    key: string;
    name: string;
    params: any;
  };
}

interface UserCardProps {
  item: any;
}
const UserCard: React.FC<UserCardProps> = props => {
  let {item} = props;
  const userId = item._id;
  const {icon, username, sex, sign} = item;
  const userInfo = useSelector((state: any) => state.user.userInfo);
   const navigation = useNavigation();
  const cardStyle = StyleSheet.create({
    bg: {
      width: '100%',
    },
    wrap: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    headIcon: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    uni: {
      flexDirection: 'row',
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    username: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 10,
      color: '#f0f0f0',
    },
    sex: {
      width: 20,
      height: 20,
    },
    sign: {
      margin: 12,
      color: '#f0f0f0',
    },
  });
  return (
    <TouchableOpacity
      onPress={() => {

        if (userId === userInfo._id) {
          navigation.navigate('userTab');
        } else {
          // navigation.navigate('detail', {postId: item._id})
          navigation.navigate('user', {userId: userId});
        }
      }}>
      <ImageBackground source={{uri: icon}} style={cardStyle.bg}>
        <View key={userId} style={cardStyle.wrap}>
          <Image style={cardStyle.headIcon} source={{uri: icon}} />

          <View style={cardStyle.uni}>
            <Text style={cardStyle.username}>{username}</Text>
            <Image
              style={cardStyle.sex}
              source={sex === '男' ? iconMap.boy : iconMap.girl}
            />
          </View>
          <Text style={cardStyle.sign}>
            个性签名：
            {sign
              ? sign
              : sex === '男'
              ? '他很神秘什么都没留下...'
              : '她很神秘什么都没留下...'}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const UserList: React.FC<Props> = props => {
  const keyword = useSelector((state: any) => state.keyword.keyword);
  const [updateKey, setUpdateKey] = useState(0);
  useEffect(() => {
    setUpdateKey(updateKey + 1);
  }, [keyword]);

  const request = (pageNum: number, pageSize: number) => {
    return get(
      api.FIND_USER +
        `?keyword=${keyword}&pageSize=${pageSize}&pageNum=${pageNum}`,
    );
  };
  return (
    <View style={{flex: 1}}>
      <ImageList
        Render={UserCard}
        pageSize={20}
        request={request}
        updateKey={updateKey}
      />
    </View>
  );
};

export default UserList;
