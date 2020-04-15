import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    width: '100%',
    height: 49,
    backgroundColor:'rgb(16, 142, 233)',
    borderRadius: 5,
    alignItems: "center",
    justifyContent:"center",
    shadowColor:"#999",
    shadowOffset:{height:4,width:4},
  },
  buttonText:{
    flex:1,
    width: 305,
    lineHeight: 49,
    fontSize:14.5,
    color: "#ffffff",
  },
  disabledButton:{
    width: '100%',
    height: 49,
    backgroundColor:'rgb(16, 142, 233)',
    borderRadius: 5,
    alignItems: "center",
    justifyContent:"center",
    shadowColor:"#999",
    shadowOffset:{height:4,width:4},
    opacity:0.7
  }
});
