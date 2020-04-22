import React from 'react';
import {View, Text, Image, Linking, ToastAndroid} from 'react-native';
import HomeStyle from './style';
import icons from '../../assets';
import {Carousel, Popover, Button} from '@ant-design/react-native';
import OpenList from './OpenList';

interface Props {
  item: {source: string; key: string};
}
const HomeCard: React.FC<Props> = (props) => {
  const {item} = props;
  return (
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
        <Popover
        placement="bottom"
          overlay={<><OpenList/></>}
          // triggerStyle={styles.triggerStyle}
          onSelect={() => {}}>
          <View style={HomeStyle.cardHMore}>
            <Image style={HomeStyle.cardHMImg} source={icons.more2} />
          </View>
        </Popover>
      </View>
      <View style={HomeStyle.bannerWrap}>
        <Carousel
          dots={false}
          afterChange={(current) => {
            // console.log(current);
          }}>
          {[...Array(4).keys()].map((i, index) => {
            return (
              <View key={'' + index} style={HomeStyle.bannerOne}>
                <Image
                  style={HomeStyle.bannerImg}
                  source={{
                    uri: item.source,
                  }}
                />
              </View>
            );
          })}
        </Carousel>
      </View>
      <View style={HomeStyle.cardAction}>
        <View style={HomeStyle.actionLeft}>
          <Image style={HomeStyle.cardIcon} source={icons.like} />
          <Image style={HomeStyle.cardIcon} source={icons.say} />
          <Image style={HomeStyle.cardIcon} source={icons.fly} />
        </View>
        <View style={HomeStyle.actionRight}>
          <Image style={HomeStyle.cardIcon} source={icons.colla} />
        </View>
      </View>
      <View style={HomeStyle.desc}>
        <Text style={HomeStyle.descContent} numberOfLines={1}>
          HelloChange: 春回答道就的撒发阿斯顿覅偶阿斯顿一公司大覅哦啊死哦
        </Text>
      </View>
      <View>
        <View style={HomeStyle.replyWrap}>
          <Image
            style={HomeStyle.replyerIcon}
            source={{
              uri:
                'http://softwareengineeringdaily.com/wp-content/uploads/2015/07/react.png',
            }}
          />
          <Text style={HomeStyle.addReply}>添加评论...</Text>
        </View>
      </View>
      <Text style={HomeStyle.time}>3月3日</Text>
    </View>
  );
};

export default HomeCard;
