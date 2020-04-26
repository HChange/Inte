import React, { useEffect, useState } from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, ToastAndroid} from 'react-native';
import icons from '../../assets/index';
import HomeStyle from './style';
import ListHeaderComponent from './ListHeaderComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageList from "../../components/ImageList"
import HomeCard from "./HomeCard"
import api from '../../config/api';
import { useSelector } from 'react-redux';
import { Result } from '@ant-design/react-native';

const Home: React.FC<any> = props => {
  const [updateKey, setUpdateKey] = useState(0);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  useEffect(() => {
    console.log(updateKey);
    
    if (
      props.route &&
      props.route.params &&
      props.route.params.type &&
      props.route.params.type === 'update'
    ) {
      setUpdateKey(updateKey + 1);
    }
  }, [props.route]);
  
async function requestData(pageNum: number, pageSize: number) {
  try{
    let response = await fetch(
      api.GET_USERALLPOST +
        `?userId=${userInfo?userInfo._id:""}&pageSize=${pageSize}&pageNum=${pageNum}`,
    );
    let result = await response.json();
    return result;
  }catch(error){
    ToastAndroid.show(error.message,1000)
  }
}
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={HomeStyle.pageWrap}>
        <View style={HomeStyle.headerWrap}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('camera', {type: 'takePicture'});
            }}>
            <Image style={HomeStyle.iconStyle} source={icons.ca} />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <Image
              style={HomeStyle.logoStyle}
              resizeMode="contain"
              source={icons.inte}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('direct');
            }}>
            <Image style={HomeStyle.iconStyle} source={icons.fly} />
          </TouchableOpacity>
        </View>
        <ImageList
          Render={HomeCard}
          ListHeaderComponent={ListHeaderComponent}
          request={requestData}
          pageSize={10}
          {...props}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
