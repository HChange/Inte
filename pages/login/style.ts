import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  loginWrap: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    alignItems:'center'
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 17,
    // backgroundColor: 'red'
  },
  input: {
    width: Dimensions.get('window').width - 50,
    marginTop: 15,
    height: 49,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 15,
  },
  button: {
    marginTop: 15,
    width: 310,
  },
  retrieve: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fontSize13: {
    fontSize: 13,
  },
  color888: {
    color: '#888',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#333',
  },
  marginLeft5: {
    marginLeft: 5,
  },
  split: {
    width: Dimensions.get('window').width - 50,
    height: 1,
    marginTop: 40,
    marginBottom: 40,
    // marginLeft: 25,
    backgroundColor: '#888',
    position: 'relative',
  },
  or: {
    width: 30,
    height: 30,
    position: 'absolute',
    transform: [{translateX: -15}],
    backgroundColor: '#f0f0f0',
    left: '50%',
    top: -15,
    borderRadius: 15,
  },
  orText: {
    fontSize: 15,
    lineHeight: 30,
    textAlign: 'center',
    color: '#888',
    fontWeight: 'bold',
  },
});
