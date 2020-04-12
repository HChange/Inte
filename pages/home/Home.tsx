/* eslint-disable react-native/no-inline-styles */

// import Loading from '../common/Loading';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {Toast, Carousel} from '@ant-design/react-native';
import icons from '../../assets/index';
import HomeStyle from './style';
import ListHeaderComponent from './ListHeaderComponent';
import ListEmptyComponent from './ListEmptyComponent';
import ListFooterComponent from './ListFooterComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {withNavigationFocus} from 'react-navigation';

const Home: React.FC<any> = props => {
  let initdata = [...Array(10).keys()];
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
  let i = 10;
  const [data, setData] = useState(initdata);
  const [canLoadMore, setCanLoadMore] = useState(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={HomeStyle.pageWrap}>
        <View style={HomeStyle.headerWrap}>
          <TouchableOpacity
            onPress={() => {
              // console.log(Toast);
              // props.navigation.openDrawer();
              props.navigation.navigate('camera');
              // Toast.success('电机厂');
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
        {/* <Switch /> */}
        <FlatList
          data={data}
          renderItem={(_item: any) => {
            return (
              <>
                <View style={HomeStyle.cardWrap}>
                  <View style={HomeStyle.cardHeader}>
                    <View style={HomeStyle.cardHIcon}>
                      <Image
                        style={HomeStyle.cardHIImg}
                        source={{
                          uri:
                            'http://softwareengineeringdaily.com/wp-content/uploads/2015/07/react.png',
                        }}
                      />
                    </View>
                    <Text style={HomeStyle.cardHName}>HelloChange</Text>
                    <View style={HomeStyle.cardHMore}>
                      <Image style={HomeStyle.cardHMImg} source={icons.more2} />
                    </View>
                  </View>
                  <View style={HomeStyle.bannerWrap}>
                    <Carousel
                      dots={false}
                      afterChange={(current) => {
                        // console.log(current);
                      }}>
                      {[...Array(4).keys()].map((item, index) => {
                        // console.log('change-loadinf');

                        return (
                          <View
                            key={new Date().getTime()}
                            style={HomeStyle.bannerOne}>
                            <Image
                              style={HomeStyle.bannerImg}
                              source={{
                                uri: `https://wallpaper.infinitynewtab.com/wallpaper/${i++}.jpg`,
                              }}
                            />
                          </View>
                        );
                      })}
                    </Carousel>
                  </View>
                </View>
              </>
            );
          }}
          keyExtractor={(item) => '' + Math.random()}
          onRefresh={() => {
            console.log('下拉刷新...');
          }}
          refreshing={false}
          ListEmptyComponent={<ListEmptyComponent />}
          ListHeaderComponent={<ListHeaderComponent {...props} />}
          ListFooterComponent={<ListFooterComponent />}
          onEndReached={() => {
            if (canLoadMore) {
              setTimeout(() => {
                setData([...data, ...Array(10).keys()]);
                setCanLoadMore(true);
              }, 3000);
              setCanLoadMore(false);
              console.log('加载更多...');
            }
          }}
          // refreshControl={refreshControlDOM}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
