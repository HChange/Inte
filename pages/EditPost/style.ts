import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    position: 'relative',
  },
  header: {
    height: 49,
    width: '100%',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 10,
    maxHeight: ((Dimensions.get('window').width - 40) / 3) * 2 + 20,
    overflow: 'hidden',
  },
  imageWrap: {
    width: (Dimensions.get('window').width - 40) / 3,
    height: (Dimensions.get('window').width - 40) / 3,
    marginLeft: 10,
    marginTop: 10,
    position: 'relative',
  },
  image: {
    width: (Dimensions.get('window').width - 40) / 3,
    height: (Dimensions.get('window').width - 40) / 3,
    borderRadius: 5,
  },
  title: {
    padding: 10,
    paddingBottom: 5,
    fontSize: 16,
    color: '#214f7c',
    fontWeight: 'bold',
  },
  textarea: {
    marginTop: 10,
    backgroundColor: '#fcfcfc',
    borderRadius: 2,
    borderTopWidth: 1,
    borderColor: '#ddd',
  
  },
  addImage: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#ddd',
    backgroundColor: '#eee',
    width: (Dimensions.get('window').width - 40) / 3,
    height: (Dimensions.get('window').width - 40) / 3,
    marginLeft: 10,
    marginTop: 10,
  },
  addIcon: {
    fontSize: 50,
    color: '#3897f0',
  },
  close: {
    width:30,
    height:30,
    position: 'absolute',
    right: 0,
    marginBottom: 30,
    zIndex:666,
    // borderRadius: 20,
    padding: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
  },
  tips: {
    color: '#3897f0',
    fontSize: 14,
    marginLeft: 10,
  },
});
