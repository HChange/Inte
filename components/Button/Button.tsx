import React from 'react';
import {
  Alert,
} from 'react-native';
import Button from 'react-native-button';
import styles from './style';
interface Props{
    /**是否禁用 */
    disabled: boolean,
    /**点击执行的函数 */
    onPress: ()=>any,
}
const InteButton = (props: Props) => {
  
  return (
        <Button
        style={styles.buttonText}
        disabled={true}
        containerStyle={styles.button}
        disabledContainerStyle={styles.disabledButton}
        onPress={() => {Alert.alert("1")}}
      >
        继续
      </Button>
  );
};

export default Button;
