import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import icons from '../../assets/index';
import HomeStyle from './style';
import ListHeaderComponent from './ListHeaderComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageList from "../../components/ImageList"
import HomeCard from "./HomeCard"

const Home: React.FC<any> = props => {
  // const refreshControlDOM = (
  //   <RefreshControl
  //     title="正在刷新..."
  //     onRefresh={() => {
  //       console.log('下拉刷新...');
  //     }}
  //     refreshing={true}
  //     size={1}
  //   />
  // );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={HomeStyle.pageWrap}>
        <View style={HomeStyle.headerWrap}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('camera',{type:'takePicture'});
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
        <ImageList pageNumber={10} Render={HomeCard} ListHeaderComponent={ListHeaderComponent} {...props}/>
      </View>
    </SafeAreaView>
  );
};

export default Home;
