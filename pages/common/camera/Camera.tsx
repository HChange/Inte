'use strict';
import React, {PureComponent, useCallback, useEffect} from 'react';
import {StatusBar, ToastAndroid, Linking} from 'react-native';
// import {withNavigationFocus} from 'react-navigation';
import {useIsFocused, NavigationProp} from '@react-navigation/native';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import IconBox from '../../../assets/index';
import {useDispatch} from 'react-redux';
import styles from './style';
type State = {
  front: boolean;
  flash: boolean;
  showImg: boolean;
  imgUri: any;
  isRecording: boolean;
};

type ShowImgComponentProps = {
  onReTakePicture: () => void;
  [propsName: string]: any;
};
type Props = {
  navigation: NavigationProp<any>;
  route: any;
};
class Camera extends PureComponent<Props, State> {
  camera: any;
  constructor(props: any) {
    super(props);
    this.state = {
      front: false,
      flash: false,
      showImg: false,
      imgUri: {},
      isRecording: false,
    };
  }
  render() {
    return (
      <>
        {this.state.showImg ? (
          <ShowImgComponent
            {...this.props}
            {...this.state}
            onReTakePicture={() => this.reTakePicture()}
          />
        ) : (
          <View style={styles.container}>
            <RNCamera
              ref={(ref) => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={
                this.state.front
                  ? RNCamera.Constants.Type.front
                  : RNCamera.Constants.Type.back
              }
              flashMode={
                this.state.flash
                  ? RNCamera.Constants.FlashMode.on
                  : RNCamera.Constants.FlashMode.off
              }
              androidCameraPermissionOptions={{
                title: '照相机授权',
                message: '是否允许使用照相机',
                buttonPositive: '是',
                buttonNegative: '否',
              }}
              androidRecordAudioPermissionOptions={{
                title: '音频授权',
                message: '是否允许使用音频',
                buttonPositive: '是',
                buttonNegative: '否',
              }}
              // onGoogleVisionBarcodesDetected={({barcodes}) => {
              //   console.log(barcodes);
              // }}
              // 二维码
              onBarCodeRead={(...item) => {
                ToastAndroid.show("识别成功",1000)
                if ((this.props.route.params.type === 'codeRead')) {
                  Linking.canOpenURL(item[0].data).then((supported) => {
                    // weixin://  alipay://
                    if (supported) {
                      Linking.openURL(item[0].data);
                    } else {
                      Linking.openURL("https://www.baidu.com/s?wd="+item[0].data)
                    }
                  });
                  
                }
              }}
            />
            <View style={styles.topWrap}>
              <TouchableOpacity
                onPress={() => this.close()}
                style={styles.topIconWrapStyle}>
                <Image source={IconBox.close} style={styles.topIconStyle} />
              </TouchableOpacity>
              {this.props.route.params.type === 'takePicture' && (
                <>
                  <TouchableOpacity
                    style={styles.topIconWrapStyle}
                    onPress={() => this.toggleFlash()}>
                    <Image
                      source={this.state.flash ? IconBox.copen : IconBox.open}
                      style={[styles.topIconStyle,{width: 29,height:29}]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.topIconWrapStyle}
                    onPress={() => this.toggleType()}>
                    <Image source={IconBox.trans} style={styles.topIconStyle} />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {
                (this.props.route.params.type !==
                  'codeRead' &&
                  (this.state.isRecording ? (
                    <View
                      style={[
                        styles.takePictureWrap,
                        {backgroundColor: 'red'},
                      ]}>
                      <TouchableOpacity
                        onPress={() => {
                          this.stopRecord();
                        }}
                        style={[
                          styles.capture,
                          {backgroundColor: 'red'},
                        ]}></TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.takePictureWrap}>
                      <TouchableOpacity
                        onPress={() => {
                          this.onPressAction();
                        }}
                        style={styles.capture}></TouchableOpacity>
                    </View>
                  )))
              }
            </View>
          </View>
        )}
      </>
    );
  }

  onPressAction = () => {
    let type = this.props.route.params.type;
    if (type === 'takePicture') {
      this.takePicture();
    } else {
      this.takeRecord();
    }
  };
  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 1, base64: false};
      const data = await this.camera.takePictureAsync(options);
      this.setState(() => ({
        showImg: true,
        imgUri: data,
      }));
    }
  };
  //开始录像
  takeRecord = async () => {
    ToastAndroid.show('开始录像', 1000);
    this.setState({isRecording: true});
    const options = {
      quality: RNCamera.Constants.VideoQuality['480p'],
      maxFileSize: 100 * 1024 * 1024,
    };
    const data = await this.camera.recordAsync(options);
    this.setState(() => ({
      showImg: true,
      imgUri: data,
    }));
    
  };
  //停止录像
  stopRecord = async () => {
    ToastAndroid.show('结束录像', 1000);
    this.setState({isRecording: false});
    this.camera.stopRecording();
  };
  reTakePicture() {
    this.setState({
      showImg: false,
    });
  }

  close() {
    this.props.navigation.goBack();
  }

  toggleFlash() {
    this.setState({
      flash: !this.state.flash,
    });
  }
  toggleType() {
    this.setState({
      front: !this.state.front,
    });
  }
}

const ShowImgComponent = (props: ShowImgComponentProps & State) => {
  const dispatch = useDispatch();
  const reTakePicture = useCallback(() => {
    props.onReTakePicture();
  }, [props]);
  const choosePicture = useCallback(() => {
    props.navigation.navigate('editPost', {imgUrl: props.imgUri});
    // props.navigation.goBack();
    dispatch({type: 'addImg', value: props.imgUri.uri});
  }, [props]);
  const onceMoreTakePicture = useCallback(() => {
    dispatch({type: 'addImg', value: props.imgUri.uri});
    props.onReTakePicture();
  }, [props]);
  return (
    <View style={styles.showImgComponentTop}>
      <Image
        style={{width: '100%', height: '100%'}}
        source={{
          uri: props.imgUri.uri,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          width: '100%',
          height: 60,
          // backgroundColor: 'red',
        }}>
        <TouchableOpacity
          style={styles.showImgComponentTopTO}
          onPress={reTakePicture}>
          <Text style={styles.showImgComponentTopText}>重拍</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showImgComponentTopTO}
          onPress={onceMoreTakePicture}>
          <Text style={styles.showImgComponentTopText}>再来一张</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showImgComponentTopTO}
          onPress={choosePicture}>
          <Text style={styles.showImgComponentTopText}>下一步</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CameraWrap = (props: Props, state: any) => {
  const isFocused = useIsFocused();
  // console.log(props);
  // const {isFocused} = props;
  const {hasCameraPermission} = state;

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else if (isFocused) {
    StatusBar.setHidden(true, 'slide');
    return <Camera {...props} />;
  } else {
    StatusBar.setHidden(false, 'slide');
    return <View />;
  }
};

export default CameraWrap;
