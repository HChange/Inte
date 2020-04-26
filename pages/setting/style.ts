import {Platform, StyleSheet, Text, View} from 'react-native';
export default StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontWeight:'normal',
    fontSize: 15
  },
  container: {
    position:"absolute",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    zIndex: 999
  },
  wrap:{
    position:'relative',
    flex:1,
    backgroundColor:'red'
  }
});
