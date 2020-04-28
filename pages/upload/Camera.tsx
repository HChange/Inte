'use strict';
import React, {PureComponent, useCallback, useEffect} from 'react';
import {StatusBar, ToastAndroid, Linking} from 'react-native';
// import {withNavigationFocus} from 'react-navigation';
import {useIsFocused, NavigationProp} from '@react-navigation/native';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import IconBox from '../../assets/index';
import {useDispatch} from 'react-redux';
import styles from './style';
type State = {
  front: boolean;
  flash: boolean;
  showImg: boolean;
  imgUri: any;
  isRecording: boolean;
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

  onPressAction = () => {
    this.takePicture();
  };
  takePicture = async () => {
    const options = {quality: 1, base64: false};
    const data = await this.camera.takePictureAsync(options);
    this.setState(() => ({
      showImg: true,
      imgUri: data,
    }));
  };

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
  render() {
    return (
      <>
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
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
          />

          <View style={styles.topWrap}>
            <TouchableOpacity
              style={styles.topIconWrapStyle}
              onPress={() => this.toggleType()}>
              <Image source={IconBox.trans} style={styles.topIconStyle} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topIconWrapStyle}
              onPress={() => this.toggleFlash()}>
              <Image
                source={this.state.flash ? IconBox.copen : IconBox.open}
                style={[styles.topIconStyle, {width: 29, height: 29}]}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: '50%',
              backgroundColor: '#f0f0f0',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.takePictureWrap}>
              <TouchableOpacity
                onPress={() => {
                  this.onPressAction();
                }}
                style={styles.capture}></TouchableOpacity>
            </View>
          </View>
          {
            this.state.showImg&&<ImageView onClose={()=>this.setState({showImg:false,imgUri:{}})} imageUri={this.state.imgUri}/>
          }
        </View>
      </>
    );
  }
}

const ImageView = (props:any)=>{
    const {onClose,imageUri} = props;
    const dispatch = useDispatch()
    return(
        <View style={styles.showImage}>
            
            <Image style={{flex: 1}} source={{uri: imageUri.uri}} />
            <View style={styles.opc}>
            <TouchableOpacity
                onPress={()=>{
                    onClose()
                }}
            >
              <Text style={styles.ok}>重拍</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{
                    dispatch({type:'addUploadImg',value:imageUri.uri})
                    onClose()
                }}
            >
              <Text style={styles.ok}>确定</Text>
            </TouchableOpacity>
            </View>
          </View>
    )
}
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
    return <Camera {...props} />;
  } else {
    return <View />;
  }
};

export default CameraWrap;
