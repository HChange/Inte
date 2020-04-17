import {StyleSheet} from "react-native"

export default StyleSheet.create({
    wrap:{
        flex:1,
        // backgroundColor:"red"
    },
    header:{
        height: 49,
        width: '100%',
        backgroundColor:'green'
    },
    body:{
        width: "100%",
        flex:1,
        backgroundColor:'yellow'
    },
    bottom:{
        width: "100%",
        height: 49,
        backgroundColor:'blue',
        padding: 10,
        borderTopWidth:1,
        borderStyle:'solid',
        borderColor:'#ccc',
        flexDirection:'row',
    }
})