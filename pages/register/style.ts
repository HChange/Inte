import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  registerWrap: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 27,
    paddingRight: 27,
  },
  headImage: {width: 150, height: 150, marginTop: 123},

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
  button: {
    width: '100%',
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
  btLeft: {
    color: '#c1c1c1',
    fontSize: 13,
  },
  btRight: {
    color: '#214f7c',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
