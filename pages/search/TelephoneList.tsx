import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import {get} from '../../common/useRequest';
import api from '../../config/api';
import iconMap from '../../assets';
import ListEmptyComponent from '../../components/ListEmptyComponent';
interface Props {
  navigation: NavigationProp<any>;
  route: {
    key: string;
    name: string;
    params: any;
  };
}
const TelephoneList: React.FC<Props> = props => {
  const keyword = useSelector((state: any) => state.keyword.keyword);
  const [empty, setEmpty] = useState<boolean>(true);
  const [cardData, setCardData] = useState<any>();
  const request = () => {
    return get(api.FIND_USER + `?keyword=${keyword}&type=telephone`);
  };
  useEffect(() => {
    request().then(res => {
      if (res.code !== 0) {
        setEmpty(true);
      } else {
        setEmpty(false);
        setCardData(res.data.data);

        /**
         * "data": {"__v": 0, "_id": "5ea516cbd137003a818f14d3",
         *  "email": "2583608715@qq.com",
         * "icon": "https://www.hellochange.cn/Inte_server/uploads/1588173449353.jpg",
         *  "password": "18973552995",
         * "realName": "change",
         * "sex": "男",
         * "sign": "风萧萧兮易水寒，壮士一去兮不复还",
         *  "telephone": "18973552995",
         * "username": "change",
         * "website": "https://www.hellochange.cn",
         * "wechat": "18973552995"},
         */
      }
    });
  }, [keyword]);

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
    <>
      {empty || !cardData._id ? (
        <ListEmptyComponent />
      ) : (
        <ImageBackground source={{uri: cardData.icon}} style={cardStyle.bg}>
          <View key={cardData._id} style={cardStyle.wrap}>
            <Image style={cardStyle.headIcon} source={{uri: cardData.icon}} />

            <View style={cardStyle.uni}>
              <Text style={cardStyle.username}>{cardData.username}</Text>
              <Image
                style={cardStyle.sex}
                source={cardData.sex === '男' ? iconMap.boy : iconMap.girl}
              />
            </View>
            <Text style={cardStyle.sign}>
              个性签名：
              {cardData.sign
                ? cardData.sign
                : cardData.sex === '男'
                ? '他很神秘什么都没留下...'
                : '她很神秘什么都没留下...'}
            </Text>
          </View>
        </ImageBackground>
      )}
    </>
  );
};

export default TelephoneList;
