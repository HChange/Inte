import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Button, TextareaItem} from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import Dialog, {
//   SlideAnimation,
//   DialogContent,
//   DialogTitle,
//   DialogFooter,
//   DialogButton,
// } from 'react-native-popup-dialog';
import Dialog from 'react-native-dialog';
import {log} from 'react-native-reanimated';
const Mine: React.FC<any> = (props: any) => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const [sign, setSign] = useState<string>();
  const [editVisible, setEditVisible] = useState<boolean>(true);
  const [signTmp, setSignTmp] = useState<string>();
  function formatNum(number: number | string) {
    let tmp;
    if (number >= 100000000) {
      tmp = (Number(number) / 100000000).toFixed(2) + '亿';
    } else if (number >= 100000) {
      tmp = (Number(number) / 100000).toFixed(2) + '万';
    } else {
      tmp = number;
    }
    return tmp;
  }

  return (
    <>
      <Dialog.Container visible={editVisible}>
        <Dialog.Title>编辑你的自我介绍</Dialog.Title>
        <TextareaItem
          rows={3}
          editable={true}
          style={styles.signText}
          value={sign}
          onChangeText={(value) => {
            setSign(value);
          }}
          count={30}
          numberOfLines={3}
          placeholder="优秀的自我介绍，可以让更多人认识你"
        />
        <Dialog.Button
          label="取消"
          style={{color: '#3897f0'}}
          onPress={() => {
            setEditVisible(false);
            setSign(signTmp);
          }}
        />
        <Dialog.Button
          style={{color: '#3897f0'}}
          label="确定"
          onPress={() => {
            setEditVisible(false);
            setSignTmp(sign);
          }}
        />
      </Dialog.Container>
      <View style={styles.wrap}>
        <View style={styles.header}>
          <Text style={styles.username} numberOfLines={1}>
            {userInfo.username}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.openDrawer();
            }}>
            <Icon name="bars" color="#333" size={29} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.info}>
            <Image
              style={styles.headImg}
              source={{
                uri:
                  'http://softwareengineeringdaily.com/wp-content/uploads/2015/07/react.png',
              }}
            />
            <View style={styles.realInfo}>
              <View>
                <Text style={[styles.num, styles.realText]} numberOfLines={1}>
                  {formatNum(1514666666)}
                </Text>
                <Text style={styles.realText}>帖子</Text>
              </View>
              <View>
                <Text style={[styles.num, styles.realText]} numberOfLines={1}>
                  {formatNum(0)}
                </Text>
                <Text style={styles.realText}>粉丝</Text>
              </View>
              <View>
                <Text style={[styles.num, styles.realText]} numberOfLines={1}>
                  {formatNum(900000)}
                </Text>
                <Text style={styles.realText}>已关注</Text>
              </View>
            </View>
          </View>
          <View style={styles.sign}>
            <Text>个性签名</Text>
            <View style={styles.openEditWrap}>
              <TouchableOpacity
                onPress={() => {
                  setEditVisible(true);
                  setSignTmp(sign);
                }}>
                <Icon name="edit" color="#3897f0" size={20} />
              </TouchableOpacity>
            </View>

            <TextareaItem
              rows={3}
              editable={false}
              style={styles.signTextView}
              value={sign}
              onChangeText={(value) => {
                setSign(value);
              }}
              numberOfLines={3}
              placeholder="优秀的自我介绍，可以让更多人认识你"
            />
          </View>
          <Button
            style={styles.editButton}
            type="ghost"
            size="small"
            onPress={() => {}}>
            编辑主页
          </Button>
        </View>
        <View></View>
      </View>
    </>
  );
};

export default Mine;
