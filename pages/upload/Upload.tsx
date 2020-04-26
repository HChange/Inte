import React from 'react';
import {View, Text} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
type Props = {
  navigation: NavigationProp<any>;
};
function Home() {
  return (
    <View>
      <Text>home</Text>
    </View>
  );
}
function Set() {
  return (
    <View>
      <Text>set</Text>
    </View>
  );
}
function Upload() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{title: '图库'}} name="Home" component={Home} />
      <Tab.Screen options={{title: '拍摄'}} name="Settings" component={Set} />
    </Tab.Navigator>
  );
}
export default Upload;
