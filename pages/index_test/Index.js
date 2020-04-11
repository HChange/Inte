import React, {useState, Suspense} from 'react';
import config from './config';
import TabNavigator from 'react-native-tab-navigator';
import {View, Text, Image} from 'react-native';
import homeStyle from './style';
import Loading from '../common/Loading';
const App = () => {
  const [state, setState] = useState('home');

  return (
    <>
      <TabNavigator>
        {config.map(item => {
          return (
            <TabNavigator.Item
              key={item.id}
              selected={state === item.key}
              renderIcon={() => (
                <Image style={homeStyle.iconStyle} source={item.icon} />
              )}
              renderSelectedIcon={() => {
                return item.key != 'upload' ? (
                  <Image style={homeStyle.iconStyle} source={item.selectIcon} />
                ) : (
                  <></>
                );
              }}
              onPress={() => setState(item.key)}>
              <View>
                <Suspense
                  fallback={
                    <View>
                      <Text>Load...</Text>
                    </View>
                  }>
                  {<item.page />}
                </Suspense>
              </View>
            </TabNavigator.Item>
          );
        })}
      </TabNavigator>
    </>
  );
};
export default App;
