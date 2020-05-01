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
  //   console.log(item);

  const userId = item.userId;
  const {icon, username, sex, sign} = item;
  const cardStyle = StyleSheet.create({});
  return (
    <View>
      <Image source={{uri: icon}} style={{width: 50,height:50}}/>
    </View>
  );
};
const UserList: React.FC<Props> = props => {
  const keyword = useSelector((state: any) => state.keyword.keyword);
  const [updateKey, setUpdateKey] = useState(0);
  useEffect(() => {
    setUpdateKey(updateKey + 1);
  }, [keyword]);

  const request = (pageNum: number, pageSize: number) => {
    console.log(keyword);

    return get(
      api.FIND_USER +
        `?keyword=${keyword}&pageSize=${pageSize}&pageNum=${pageNum}`,
    );

    //  return value;
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
