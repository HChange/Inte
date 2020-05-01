import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import ImageList from '../../components/ImageList';
import {get} from '../../common/useRequest';
import api from '../../config/api';
import formatDate from '../../common/formatDate';
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
  const {desc,imageUrl,time} = item;
  const userId = item.userId._id;
  const {icon,username} = item.userId;
  const cardStyle = StyleSheet.create({
      wrap:{
          height: 120,
          width: "100%",
          borderBottomColor:'#ddd',
          borderBottomWidth:1
      }
  })
  return (
      <View style={cardStyle.wrap}>

      </View>
  )
};
const PostList: React.FC<Props> = props => {
  const keyword = useSelector((state: any) => state.keyword.keyword);
  const [updateKey, setUpdateKey] = useState(0);
  useEffect(() => {
    setUpdateKey(updateKey+1)
  }, [keyword]);

  const request = (pageNum: number, pageSize: number) => {
    return get(
      api.GET_POST +
        `?keyword=${keyword}&pageSize=${pageSize}&pageNum=${pageNum}`
    );
  };
  return (
    <View style={{flex: 1}}>
      <ImageList Render={PostCard} pageSize={20} request={request} updateKey={updateKey}/>
    </View>
  );
};

export default PostList;
