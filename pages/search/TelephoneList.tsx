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

interface Props {
  navigation: NavigationProp<any>;
  route: {
    key: string;
    name: string;
    params: any;
  };
}
;

const TelephoneList: React.FC<Props> = props => {
  const keyword = useSelector((state: any) => state.keyword.keyword);
  const [empty, setEmpty] = useState<boolean>(true)
  const [data, setData] = useState<any>()
  const request = () => {
     return get(
      api.FIND_USER +
        `?keyword=${keyword}&type=telephone`,
    );
  };
  useEffect(() => {
    request().then(data=>{
        if(data.code!==0){
            setEmpty(true)
        }else{
               setEmpty(false);
               setData(data.data);
               console.log(data.data);
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
        
    })
  }, [keyword]);
  return (
    <View style={{flex: 1}}>
      <Text>hh</Text>
    </View>
  );
};

export default TelephoneList;
