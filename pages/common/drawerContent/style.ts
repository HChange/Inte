import {StyleSheet} from "react-native"

export default StyleSheet.create({
  wrap: {
    flex: 1,
    // backgroundColor:"red"
  },
  header: {
    height: 49,
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  body: {
    width: '100%',
    flex: 1,
    // backgroundColor:'yellow'
  },
  bottom: {
    width: '100%',
    height: 49,
    // backgroundColor:'blue',
    padding: 10,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    flexDirection: 'row',
  },
  title: {
    lineHeight: 29,
    marginLeft: 10,
    fontSize: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 49,
    marginLeft: 18,
    maxWidth:170,
  },
  label: {
    fontSize: 16,
    marginLeft: -20
  },
});