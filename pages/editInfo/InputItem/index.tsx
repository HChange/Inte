import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {InputItem} from '@ant-design/react-native';
import {StyleProp} from 'react-native';
import styles from './style';

interface Props {
  title: any;
  onChangeText: (value: string) => any;
  value: any;
  editable?: boolean;
  style?: StyleProp<any>;
  maxLength?: number;
  type?: any;
}
const CInputItem: React.FC<Props> = (props) => {
  const {
    title,
    onChangeText,
    value,
    editable = true,
    style,
    maxLength = 30,
    type = 'text',
  } = props;
  const [fouces, setFouces] = useState(false);
  const [hasTitle, setHasTitle] = useState(false);
  useEffect(() => {
    if (fouces || value) {
      setHasTitle(true);
    } else {
      setHasTitle(false);
    }
  }, [fouces, value]);
  return (
    <View style={styles.inputWrap}>
      <Text style={[styles.title, !hasTitle && {display: 'none'}]}>
        {title}
      </Text>
      <InputItem
        type={type}
        maxLength={maxLength}
        style={{...style}}
        placeholder={hasTitle ? '' : title}
        onChangeText={(value) => onChangeText(value)}
        onFocus={() => {
          setFouces(true);
        }}
        onBlur={() => setFouces(false)}
        value={value}
        editable={editable}
      />
    </View>
  );
};

export default CInputItem;
