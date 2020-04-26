import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  wrap: {
    flex: 1,
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
    height: ((Dimensions.get('window').width - 40) / 3) * 2 + 20,
    overflow: 'hidden',
  },
  imageWrap: {
    width: (Dimensions.get('window').width - 40) / 3,
    marginLeft: 10,
    marginTop: 10,
  },
  image: {
    width: (Dimensions.get('window').width - 40) / 3,
    height: (Dimensions.get('window').width - 40) / 3,
    borderRadius:5
  },
  title: {
    padding: 10,
    paddingBottom: 5,
    fontSize: 16,
    color: '#214f7c',
    fontWeight:"bold"
  },
  textarea: {
    marginTop: 10,
    backgroundColor: '#fcfcfc',
    borderRadius:2,
    borderTopWidth:1,
    borderColor:"#ddd"
  },
});
