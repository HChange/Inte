import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  registerWrap: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 27,
    paddingRight: 27,
    width:'100%',
    height:'100%',
  },
  headImage: {
    width: 150,
    height: 100,
    marginTop: 127,
    // backgroundColor: 'red',
  },

  splitLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#888',
    marginTop: 37,
    marginBottom: 37,
    position: 'relative',
  },
  title: {
    fontWeight: 'bold',
    position: 'absolute',
    // width: 30,
    height: 20,
    transform: [{translateX: -30}],
    backgroundColor: '#f0f0f0',
    left: '50%',
    top: -10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#888',
  },
  input: {
    width: '100%',
    height: 49,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 15,
  },
  desc: {
    marginTop: 20,
    marginBottom: 20,
    color: '#888',
    fontSize: 13,
  },
  buttonWrap:{
    width: '100%',
    justifyContent:'center'
  },
  button: {
    width: '100%',
    height: 49,
    backgroundColor:'rgb(16, 142, 233)',
    borderRadius: 5,
    alignItems: "center",
    justifyContent:"center",
    shadowColor:"#999",
    shadowOffset:{height:4,width:4},
    fontSize:14.5,

    // opacity:0.5
  },
  buttonText:{
    flex:1,
    width: 305,
    lineHeight: 49,
    fontSize:14.5,
    color: "#ffffff",
  },
  bottom: {
    height: 49,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 17,
    borderColor: '#dddddd',
    borderTopWidth: 1,
    borderStyle: 'solid',
    bottom: 0,
    backgroundColor: '#f0f0f0',
    
  },
  hiddenBottom:{
    // display:'flex'
    display:'none'
  },
  btLeft: {
    color: '#c1c1c1',
    fontSize: 13,
  },
  btRight: {
    color: '#214f7c',
    fontWeight: 'bold',
    fontSize: 13,
  },

  /****验证验证码 */
  vcText:{
    marginTop: 120,
    marginLeft: -173,
    marginBottom: 20,
    fontSize: 26,
    color: "#333",
    fontWeight:"bold"
  },
  vcDesc:{
    marginTop: 20,
    marginBottom: 20,
    color: '#888',
    fontSize: 13,
    // alignItems:"center",
    justifyContent:'center',
    flexDirection: 'row',
    flexWrap:"wrap",
  },
  newReqWrap:{
    justifyContent:'flex-end',
    flexDirection: 'row',
    marginTop:20,
    // marginLeft: 126
  },
  newReqLeft: {
    color: '#c1c1c1',
    fontSize: 13,
  },
  newReq:{
    color: '#214f7c',
    fontWeight: 'bold',
    fontSize: 13,
  },

  /**密码用户名输入 */
  marginBottom20:{
    marginBottom: 20
  },
  tips:{
    marginTop: 10,
    marginBottom: 20,
    color: '#888',
    fontSize: 13,
    // alignItems:"center",
    justifyContent:'center',
    flexDirection: 'row',
    flexWrap:"wrap"
  },
  npTitle:{
    fontWeight: 'bold',
    position: 'absolute',
    // width: 30,
    height: 20,
    transform: [{translateX: -40}],
    backgroundColor: '#f0f0f0',
    left: '50%',
    top: -10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#888',
  }
});
