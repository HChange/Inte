'use strict';
import React, {PureComponent, useCallback, useEffect} from 'react';
import {StatusBar} from 'react-native';
// import {withNavigationFocus} from 'react-navigation';
import {useIsFocused, NavigationProp} from '@react-navigation/native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import IconBox from '../../../assets/index';

type State = {
  front: Boolean;
  flash: Boolean;
  showImg: Boolean;
  imgUri: any;
};
type Props = {
  [propsName: string]: any;
};

type ShowImgComponentProps = {
  onReTakePicture:()=>void,
  [propsName: string]: any;
}
// type Props = {
//   navigation: NavigationProp;
// };
class Camera extends PureComponent<Props, State> {
  camera: any;
  constructor(props: any) {
    super(props);
    this.state = {
      front: false,
      flash: false,
      showImg: false,
      imgUri: '',
    };
  }
  render() {
    return (
      <>
        {this.state.showImg ? (
          <ShowImgComponent
            {...this.props}
            {...this.state}
            onReTakePicture={()=>this.reTakePicture()}
          />
        ) : (
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
              onGoogleVisionBarcodesDetected={({barcodes}) => {
                console.log(barcodes);
              }}
            />
            <View
              style={{
                position: 'absolute',
                height: 60,
                // backgroundColor: 'red',
                top: 0,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => this.close()}
                style={styles.topIconWrapStyle}>
                <Image source={IconBox.close} style={styles.topIconStyle} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.topIconWrapStyle}
                onPress={() => this.toggleFlash()}>
                <Image
                  source={this.state.flash ? IconBox.copen : IconBox.open}
                  style={styles.topIconStyle}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.topIconWrapStyle}
                onPress={() => this.toggleType()}>
                <Image source={IconBox.trans} style={styles.topIconStyle} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 74,
                  height: 74,
                  margin: 74,
                  position: 'absolute',
                  borderColor: '#fff',
                  borderWidth: 4,
                  borderRadius: 39,
                  bottom: 0,
                }}>
                <TouchableOpacity
                  onPress={this.takePicture.bind(this)}
                  style={styles.capture}>
                  {/* <Text style={{fontSize: 14}}> SNAP </Text> */}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 1, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState(() => ({
        showImg: true,
        imgUri: data.uri,
      }));
    }
  };

  reTakePicture(){
    console.log(123);
    
    this.setState({
      showImg: false
    })
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'black',
    position: 'relative',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    position: 'absolute',
    bottom: 0,
    height: 66,
    width: 66,
    backgroundColor: '#fff',
    borderRadius: 33,

    borderBottomColor: '#030303',
    borderWidth: 2.5,
  },
  topIconWrapStyle: {
    marginLeft: 18,
    marginRight: 18,
  },
  topIconStyle: {
    // backgroundColor: 'pink',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showImgComponentTop: {position: 'relative', width: '100%', height: '100%'},
  showImgComponentTopTO: {marginLeft: 18,marginRight:18, padding: 16},
  showImgComponentTopText:{fontSize:16,color:"#fff"}
});

const ShowImgComponent = (props: ShowImgComponentProps&State) => {

  
  const reTakePicture = useCallback(() => {
    props.onReTakePicture()
  }, [props]);
  const choosePicture = useCallback(
    () => {
      console.log('click');
      // 暂时这么写
      props.navigation.goBack();
    },
    [props],
  )
  return (
    <View style={styles.showImgComponentTop}>
      <Image
        style={{width: '100%', height: '100%'}}
        source={{
          uri:
            props.imgUri
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
          onPress={choosePicture}>
          <Text style={styles.showImgComponentTopText}>确定</Text>
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
