import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableHighlightBase,
} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import ImageList from '../../components/ImageList';
import {get} from '../../common/useRequest';
import api from '../../config/api';
import formatDate from '../../common/formatDate';
import {
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';
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
const PostCard: React.FC<PostCardProps> = props => {
  let {item} = props;
  const postId = item._id;
  const {desc, imageUrl, time} = item;
  const userId = item.userId._id;
  const {icon, username} = item.userId;
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
      top: 10,
      left: 10,
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
  });
  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert('a');
      }}>
      <View style={cardStyle.wrap}>
        <Image
          style={cardStyle.showImg}
          source={{uri: imageUrl[0]}}
          resizeMode="cover"
        />
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
      </View>
    </TouchableOpacity>
  );
};
const PostList: React.FC<Props> = props => {
  const keyword = useSelector((state: any) => state.keyword.keyword);
  const [updateKey, setUpdateKey] = useState(0);
  useEffect(() => {
    setUpdateKey(updateKey + 1);
  }, [keyword]);

  const request = (pageNum: number, pageSize: number) => {
    return get(
      api.GET_POST +
        `?keyword=${keyword}&pageSize=${pageSize}&pageNum=${pageNum}`,
    );
  };
  return (
    <View style={{flex: 1}}>
      <ImageList
        Render={PostCard}
        pageSize={20}
        request={request}
        updateKey={updateKey}
      />
    </View>
  );
};

export default PostList;
