import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import SearchBar from 'react-native-search-bar';
import api from '../../config/api';
import {get} from '../../common/useRequest';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useDispatch, useSelector} from 'react-redux';
import PostList from './PostList'
const Search = () => {
  const searchBar = useRef<any>();
  const [keyword, setKeyword] = useState<string>('');
  const searchKeyword = useSelector((state:any)=>state.keyword.keyword);
  console.log('searchKey' + searchKeyword);
  
  const dispatch = useDispatch();
  const Tab = createMaterialTopTabNavigator();

  function searchPost() {
    get(api.GET_POST);
  }
  const TextC = (props:any) => {
    console.log(props);
    return <Text>测试</Text>;
  };
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
      {searchKeyword.length > 0 && (
        <Tab.Navigator>
          <Tab.Screen
            options={{title: '帖子名'}}
            name="post"
            component={PostList}
          />
          <Tab.Screen
            options={{title: '用户名'}}
            name="user"
            component={TextC}
          />
          <Tab.Screen
            options={{title: '手机号'}}
            name="telephone"
            component={TextC}
          />
        </Tab.Navigator>
      )}
    </View>
  );
};

export default Search;
