import {StyleSheet, StyleProp} from 'react-native';

export default StyleSheet.create({
  wrap: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 49,
    padding: 10,
    color: '#333',
  },
  username: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 29,
    maxWidth: 170,
    marginLeft:12
  },
  infoCard: {
    height: 247,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
    width: '100%',
    // backgroundColor:'red'
  },
  info: {
    flexDirection: 'row',
  },
  headImg: {
    width: 89,
    height: 89,
    borderRadius: 45,
    marginLeft: 18,
    marginRight: 2,
  },
  realInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'red',
    padding: 10,
  },
  num: {
    fontWeight: 'bold',
  },
  realText: {
    width: 70,
    textAlign: 'center',
    fontSize: 14,
  },
  sign: {
    padding: 18,
  },
  signText: {
    width: '100%',
    backgroundColor: '#f7f7f7',
    flexWrap: 'wrap',
    borderStyle: 'solid',
    borderRadius: 3,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    padding: 13,
    fontSize: 16,
    maxWidth: 270
  },
  signTextView: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    flexWrap: 'wrap',
    borderStyle: 'dotted',
    // borderRadius: 5,
    borderColor: '#dfdfdf',
    borderWidth: 1,
    padding: 13,
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    marginLeft: 18,
    marginRight: 18,
    height: 30,
  },
  openEditWrap: {
    width: '100%',
    //   flexDirection:'row',
    //   justifyContent:'flex-end'
    alignItems: 'flex-end',
  },
  imageListWrap:{
    flex:1,
    // backgroundColor:'red'
  }
});
