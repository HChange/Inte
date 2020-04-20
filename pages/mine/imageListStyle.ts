import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  wrap:{
    width: '100%',
    height: '100%'
  },
  imageWrap: {
    width: '100%',
    height: Dimensions.get('window').width/3,
    flexDirection:'row'
  },
  image:{
    width: Dimensions.get('window').width/3,
    height: Dimensions.get('window').width/3,
  }
  
});
