import React, {useRef, useState} from 'react';
import {View,Image} from 'react-native';
import SearchBar from 'react-native-search-bar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDispatch, useSelector} from 'react-redux';
import PostList from './PostList'
import UserList from './UserList'
import TelephoneList from './TelephoneList'
import Swiper from 'react-native-swiper';
 const mock = () => {
    let imageUrlArr = [];
    for (let i = 0; i < 15; i++) {
      imageUrlArr.push(
        `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
          Math.random() * 2000,
        )}.jpg`,
      );
    }
    return imageUrlArr;
  }
const Search = () => {
  const searchBar = useRef<any>();
  const [keyword, setKeyword] = useState<string>('');
  const searchKeyword = useSelector((state:any)=>state.keyword.keyword);
  const dispatch = useDispatch();
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{flex: 1}}>
      <SearchBar
        style={{height: 49}}
        ref={searchBar}
        placeholder="搜索"
        onChangeText={value => {
          setKeyword(value);
        }}
        onSearchButtonPress={() => {
          dispatch({type: 'setSearchKey', value: keyword});
        }}
      />
      {searchKeyword.length > 0 ? (
        <Tab.Navigator>
          <Tab.Screen
            options={{title: '帖子名'}}
            name="postList"
            component={PostList}
          />
          <Tab.Screen
            options={{title: '用户名'}}
            name="userList"
            component={UserList}
          />
          <Tab.Screen
            options={{title: '手机号'}}
            name="telephoneList"
            component={TelephoneList}
          />
        </Tab.Navigator>
      ) : (
        <Swiper
          horizontal={false}
          autoplay
          showsPagination={false}
          showsButtons={false}
          bounces={true}
          autoplayTimeout={6}>
          {mock().map((item: string, index: number) => {
            return (
              <View style={{flex: 1}} key={+index}>
                <Image
                  style={{width:'100%',height:'100%'}}
                  source={{uri: item}}
                  resizeMode="cover"
                />
              </View>
            );
          })}
        </Swiper>
      )}
    </View>
  );
};

export default Search;
