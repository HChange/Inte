import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  pageWrap: {
    width: '100%',
    height: '100%',
    paddingBottom: 49,
  },
  headerWrap: {
    flexDirection: 'row',
    height: 49,
    width: '100%',
    borderBottomWidth: 1,
    backgroundColor: '#fafafa',
    borderColor: '#e7e7e7',
  },
  iconStyle: {
    width: 25,
    height: 25,
    margin: 12,
  },
  logoStyle: {
    height: 25,
    width: 66,
    marginTop: 12,
  },
  myBottom: {
    height: 99,
    width: '100%',
  },

  //card
  cardWrap: {
    width: '100%',
    marginBottom:10
  },
  cardHeader: {
    height: 52,
    width: '100%',
    flexDirection: 'row',
    padding: 11,
  },
  cardHIcon: {
    height: 30,
    width: 30,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 15,
  },
  cardHIImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  cardHName: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 30,
    flex: 1,
    marginLeft: 11,
    color: '#333333',
  },
  cardHMore: {
    height: 30,
    width: 30,
    // backgroundColor: 'red',
  },
  cardHMImg: {
    height: '54%',
    width: '54%',
    margin: '23%',
  },

  // banner
  bannerWrap: {
    width: '100%',
    height: 'auto',
  },
  bannerOne: {
    width: '100%',
    height: 'auto',
  },
  bannerImg: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  cardAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  cardIcon: {
    width: 26,
    height: 26,
    marginLeft: 11,
    marginTop: 8,
    marginBottom: 4,
    marginRight: 11,
  },
  actionLeft: {
    flexDirection: 'row',
  },
  actionRight: {
    flexDirection: 'row',
  },
  desc: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  descContent: {
    fontSize: 14,
    lineHeight: 30,
    flex: 1,
    marginLeft: 11,
    color: '#666',
    marginRight: 11,
    fontWeight:"bold"
  },
  replyWrap: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -5
  },
  replyerIcon: {
    height: 30,
    width: 30,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 15,
  },
  addReply:{
    marginLeft: 6,
    color:"#888"
  },
  time:{
    fontSize:11,
    color:"#999",
    marginLeft:12,
    marginTop:-4
  }
});
