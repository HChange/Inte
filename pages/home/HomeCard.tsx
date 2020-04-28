import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  ToastAndroid,
  Alert,
  ImageBackground,
} from 'react-native';
import HomeStyle from './style';
import icons from '../../assets';
import {Carousel, Button} from '@ant-design/react-native';
import OpenList from './OpenList';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Popover from 'react-native-popover-view';
import {useSelector} from 'react-redux';

interface Props {
  item: any;
}
const HomeCard: React.FC<Props> = props => {
  const {item} = props;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>();
  /** 时间转化函数（非标准函数）*/
  function renderTime(date: any) {
    var myDate = new Date(date).toJSON();
    return new Date(+new Date(myDate) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, ' ')
      .replace(/\.[\d]{3}Z/, '');
  }
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const [like, setLike] = useState<boolean>(false);
  const [collection, setCollection] = useState<boolean>(false);
  return (
    <View style={HomeStyle.cardWrap}>
      <View style={HomeStyle.cardHeader}>
        <TouchableOpacity
          onPress={() => ToastAndroid.show(item.userId._id, 500)}>
          <View style={HomeStyle.cardHIcon}>
            <Image
              style={HomeStyle.cardHIImg}
              source={{
                uri: item.userId.icon,
              }}
            />
          </View>
        </TouchableOpacity>
        <Text style={HomeStyle.cardHName}>{item.userId.username}</Text>

        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <View style={HomeStyle.cardHMore}>
            <Image style={HomeStyle.cardHMImg} source={icons.more2} ref={ref} />
          </View>
        </TouchableOpacity>
        <Popover
          isVisible={isVisible}
          fromView={ref.current}
          onRequestClose={() => setIsVisible(false)}>
          <OpenList />
        </Popover>
      </View>
      <View style={HomeStyle.bannerWrap}>
        <Carousel
          dots={false}
          afterChange={current => {
            // console.log(current);
          }}>
          {item &&
            item.imageUrl.map((i: any, index: number) => {
              return (
                <ImageBackground
                  source={icons.placeholder}
                  key={'' + index}
                  style={HomeStyle.bannerOne}>
                  <Image
                    style={HomeStyle.bannerImg}
                    source={{
                      uri: i,
                    }}
                  />
                </ImageBackground>
              );
            })}
        </Carousel>
      </View>
      <View style={HomeStyle.cardAction}>
        <View style={HomeStyle.actionLeft}>
          <TouchableOpacity
            onPress={() => {
              setLike(!like);
            }}>
            <Image
              style={HomeStyle.cardIcon}
              source={like ? icons.redLike : icons.like}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('是否评论？');
            }}>
            <Image style={HomeStyle.cardIcon} source={icons.say} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('分享')}>
            <Image style={HomeStyle.cardIcon} source={icons.fly} />
          </TouchableOpacity>
        </View>
        <View style={HomeStyle.actionRight}>
          <TouchableOpacity
            onPress={() => {
              setCollection(!collection);
            }}>
            <Image
              style={HomeStyle.cardIcon}
              source={collection ? icons.colla : icons.coll}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={HomeStyle.desc}>
        <TouchableOpacity onPress={() => ToastAndroid.show(item._id, 500)}>
          <Text style={HomeStyle.descContent} numberOfLines={1}>
            {item.userId.username}: {item.desc}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={HomeStyle.replyWrap}>
          <Image
            style={HomeStyle.replyerIcon}
            source={{
              uri: userInfo ? userInfo.icon : '',
            }}
          />
          <TouchableOpacity
            onPress={() =>
              ToastAndroid.show(userInfo ? userInfo._id : '', 500)
            }>
            <Text style={HomeStyle.addReply}>添加评论...</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={HomeStyle.time}>{renderTime(item.time)}</Text>
    </View>
  );
};

export default HomeCard;
