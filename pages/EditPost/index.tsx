import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ToastAndroid,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Button, TextareaItem} from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import api from '../../config/api';
import styles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loading from '../../components/Loading';
import {reset} from '@react-navigation/routers/lib/typescript/src/CommonActions';

type Props = {
  navigation: NavigationProp<any>;
  route: any;
};
const EditPost: React.FC<Props> = props => {
  let dispatch = useDispatch();
  let cameraImgList = useSelector((state: any) => state.camera.imgList);
  let uploadImgList = useSelector((state: any) => state.upload.imgList);
  let userInfo = useSelector((state: any) => state.user.userInfo);
  const {navigation, route} = props;
  const [desc, setDesc] = useState<string>('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [postText, setPostText] = useState<string>('');
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [imgList, setImgList] = useState<string[]>([]);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  useEffect(() => {
    if (route.params && route.params.type === 'upload') {
      setImgList(uploadImgList);
      setIsUpload(true);
    } else {
      setImgList(cameraImgList);
      setIsUpload(false);
    }
  }, [route.params, cameraImgList, uploadImgList]);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  function _keyboardDidShow(e: any) {
    console.log(e.endCoordinates.height);
    setKeyboardHeight(e.endCoordinates.height);
  }

  function _keyboardDidHide(e: any) {
    setKeyboardHeight(0);
  }
  async function upload() {
    if (imgList.length <= 0) {
      ToastAndroid.show('请先拍摄一张照片', 1000);
    } else if (desc.length <= 0) {
      ToastAndroid.show('请填写内容信息', 1000);
    } else {
      /**上传图片 */
      let formData = new FormData();
      let newImgList = imgList.slice(0, 6);
      let tmp = [...newImgList];
      /**文件格式的图片 */
      let fileList = tmp.filter(item => {
        return /^file/.test(item);
      });
      /**url格式的图片 */
      let urlList = tmp.filter(item => {
        return !/^file/.test(item);
      });

      if (fileList.length > 0) {
        fileList.forEach((item: any) => {
          let file: any = {
            uri: item,
            type: 'multipart/form-data',
            name: item,
          };
          formData.append('file', file);
        });
      }
      try {
        setLoadingVisible(true);
        setPostText('正在上传图像，请稍后...');
        if (fileList.length > 0) {
          axios
            .post('http://www.hellochange.cn:8099/upload', formData, {
              headers: {'Content-Type': 'multipart/form-data'},
              timeout: 600000,
            })
            .then(res => {
              if (res.data.code !== 0) {
                setLoadingVisible(false);
                ToastAndroid.show(res.data.msg, 1500);
                return;
              } else {
                setPostText('图片上传成功，等待发布...');
                let imageUrlArr = res.data.data.map((item: any) => {
                  return item.path.replace('/www/wwwroot/', 'https://');
                });
                postAction([...imageUrlArr, ...urlList]);
              }
            })
            .catch(err => {
              ToastAndroid.show(err, 500);
            });
        } else {
          setPostText('图片上传成功，等待发布...');
          postAction(urlList);
        }

        // let result = {code:0,msg:"验证码发送成功"}
      } catch (error) {
        ToastAndroid.show(error.message, 500);
      }
    }
  }
  async function postAction(imageUrlArr: string[]) {
    try {
      setPostText('正在发布中，请稍后...');
      let response = await fetch(api.PUBLISH_POST, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userInfo._id,
          telephone: userInfo.telephone,
          desc: desc,
          imageUrl: imageUrlArr,
          time: new Date().getTime(),
        }),
      });
      let result = await response.json();
      if (result.code === 0) {
        setLoadingVisible(false);
        ToastAndroid.show('发布成功！', 1500);
        if (isUpload) {
          dispatch({type: 'clearUploadImg'});
          dispatch({type: 'clearKey'});
          dispatch({type: 'publishPost'});
          dispatch({type: 'update'});
        } else {
          dispatch({type: 'clearImg'});
        }
        navigation.navigate('app', {type: 'update'});
      } else {
        setLoadingVisible(false);
        ToastAndroid.show(result.msg, 1500);
      }
    } catch (error) {
      ToastAndroid.show(error,1000)
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.wrap}
      behavior="padding"
      keyboardVerticalOffset={0}>
      {/* <ScrollView> */}
      <Loading loadingVisible={loadingVisible} text={postText} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="back" size={29} style={{padding: 10}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={upload}>
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              fontWeight: 'bold',
              color: '#3897f0',
            }}>
            发表
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>图片</Text>
      <View style={styles.imageBox}>
        {imgList.map((item: string, index: number) => {
          return (
            <TouchableOpacity
              key={item ? item : '' + index}
              onLongPress={() => {
                if (isUpload) {
                  dispatch({type: 'deleteUploadImg', value: item});
                } else {
                  dispatch({type: 'deleteImg', value: item});
                }
              }}>
              <View style={styles.imageWrap}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{uri: item ? item : ''}}
                />
              </View>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.addImage}>
            <Text style={styles.addIcon}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.tips}>Tips: 最多只能配6张图,长按可以删除图片哦</Text>
      <Text style={styles.title}>内容</Text>
      <TextareaItem
        style={styles.textarea}
        value={desc}
        onChangeText={value => {
          setDesc(value);
        }}
        placeholder="请输入你的小想法..."
        count={180}
        // numberOfLines={3}
        rows={3}
      />
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

export default EditPost;

/************假数据代码************* */
// let imageUrlArr = [];

// for (let i = 0; i < imgList.length; i++) {
//   imageUrlArr.push(
//     `https://wallpaper.infinitynewtab.com/wallpaper/${Math.ceil(
//       Math.random() * 1000,
//     )}.jpg`,
//   );
// }

// let response = await fetch(api.PUBLISH_POST, {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     userId: userInfo._id,
//     telephone: userInfo.telephone,
//     desc: desc,
//     imageUrl: imageUrlArr,
//   }),
// });
// let result = await response.json();
