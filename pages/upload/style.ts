import {StyleSheet,Dimensions} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  preview: {
   width: "100%",
   height: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  showImage: {
   width: "100%",
   height: Dimensions.get('window').width,
   position:'absolute',
   zIndex:999,
   top: 0,
   left:0,
   backgroundColor:'black'
  },
  ok:{
    height: 29,
    alignSelf:'center',
    fontSize: 16,
    fontWeight:'bold',
    color:'#fff',
    
  },
 opc:{
  position: 'absolute',
    height: 60,
    top: 0,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight:20
 },
  capture: {
    position: 'absolute',
    bottom: 0,
    height: 66,
    width: 66,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 33,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    borderWidth: 2.5,
  },
  topWrap: {
    position: 'absolute',
    height: 60,
    top: 0,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topIconWrapStyle: {
    marginLeft: 18,
    marginRight: 18,
  },
  topIconStyle: {
    width: 27,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  takePictureWrap:{
    width: 74,
    height: 74,
    borderColor: 'rgba(255,255,255,0.7)',
    borderWidth: 4,
    borderRadius: 39,
  },
  showImgComponentTop: {position: 'relative', width: '100%', height: '100%'},
  showImgComponentTopTO: {marginLeft: 18, marginRight: 18, padding: 16},
  showImgComponentTopText: {fontSize: 16, color: '#fff',fontWeight:'bold'},
});
