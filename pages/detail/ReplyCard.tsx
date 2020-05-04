import React from 'react'
import { View, Text ,Image, StyleSheet, TouchableOpacity} from 'react-native'
import formatDate from '../../common/formatDate';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
interface Props{
    item:ReplyCardData
}
interface ReplyCardData{
    time:string,
    _id:string,
    postId:any,
    userId:{
        sex:string,
        icon:string,
        _id:string,
        username:string
    },
    content:string
}
const ReplyCard:React.FC<Props> = (props) => {
    let {item} = props;
    const userInfo = useSelector((state: any) => state.user.userInfo);
    const navigation = useNavigation();
    return (
      <View style={styles.wrap}>
        <TouchableOpacity
          onPress={() => {
            if (item.userId._id === userInfo._id) {
              navigation.navigate('userTab');
            } else {
              navigation.navigate('user', {
                userId: item.userId._id,
              });
            }
          }}>
          <Image style={styles.icon} source={{uri: item.userId.icon}} />
        </TouchableOpacity>
        <View style={styles.info}>
          <View style={styles.box}>
            <Text style={styles.username}>{item.userId.username}:</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
          <Text style={styles.time}>{formatDate(item.time)}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    padding: 12,
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginTop:4
  },
  info: {
    marginLeft: 12,
  },
  box: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  username:{
    fontSize: 13,
    marginRight:5,
    fontWeight:'bold'
  },
  content:{
      
      fontSize: 13,
      paddingRight: 30
  },
  time: {
    fontSize: 11,
    color: '#999',
    marginTop:6
  },
});
export default ReplyCard
