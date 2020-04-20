import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    height: 49,
    width: '100%',
    borderBottomColor: '#dfdfdf',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding: 10,
  },
  content: {
    padding: 10,
    // backgroundColor: 'yellow',
  },
  headImgWrap: {
    alignItems: 'center',
  },
  headImg: {
    width: 89,
    height: 89,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#dfdfdf',
  },
  headTitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#3897f0',
    fontWeight: 'bold',
  },
  inputWrap: {
    width: '100%',
    // backgroundColor: 'pink',
    marginTop: 8,
  },
  faker: {
    height: 50,
  },
  homeInfoTitle:{
      fontSize: 17,
      marginTop: 10,
      marginLeft: 17,
      marginBottom:6,
      fontWeight:'bold'
  },
  sexWrap:{
      height: 65,
      paddingLeft: 20,

  },
  chooseSex:{
      flexDirection:'row',
      height: 40,
      alignItems:'center'
  }
});
