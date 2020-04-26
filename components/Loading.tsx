import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
interface Props{
    loadingVisible:boolean;
    text:string
}
const Loading:React.FC<Props> = (props) => {
    const {loadingVisible,text} = props;
    return (
      <View style={styles.container}>
        <Spinner
          visible={loadingVisible}
          textContent={text}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontWeight: 'normal',
    fontSize: 15,
  },
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    zIndex: 999,
  },
});
export default Loading
