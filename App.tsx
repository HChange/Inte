// import React from 'react';
// import {StatusBar} from 'react-native';
// import Index from './pages/index/Index';
// const App = () => {
//   return (
//     <>
//       <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
//       <Index />
//     </>
//   );
// };

// export default App;

/**方法一 */
import React, {useEffect} from 'react';
import {Image, View, Text, StatusBar} from 'react-native';
import Home from './pages/home/Home';
//转载导航的容器
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import configStore from './store/index';
import {Provider} from 'react-redux';
import Camera from './pages/common/camera/Camera';
import IconBox from './assets';
import tabBarConfig from './config/tabBarConfig';
const store = configStore();

const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Set = function () {
  return (
    <View>
      <Text>setting</Text>
    </View>
  );
};
function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#ececec" barStyle="dark-content" />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="app"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
            }}
            // header={null}
            // hideStatusBar={true}
            // drawerType="back"
            // statusBarAnimation="fade"
            // drawerStyle={{
            //   backgroundColor: '#c6cbef',
            //   width: '100%',
            // }}
            // drawerContent={({navigation}) => {
            //   // console.log(state);

            //   return <Camera {...navigation} />;
            // }}
          >
            <Stack.Screen name="camera" component={Camera} />
            <Stack.Screen name="app">
              {() => (
                <Stack.Navigator mode="card" headerMode="none">
                  <Stack.Screen name="app">
                    {() => (
                      <BottomTabs.Navigator
                        tabBarOptions={{
                          showLabel: false,
                          style: {
                            backgroundColor: '#fafafa',
                          },
                        }}>
                        {tabBarConfig.map((item) => {
                          if (item.children) {
                            return (
                              <BottomTabs.Screen
                                key={item.id}
                                name={item.name}
                                options={{
                                  tabBarIcon: ({focused}) => {
                                    return (
                                      <Image
                                        // eslint-disable-next-line react-native/no-inline-styles
                                        style={{width: 25, height: 25}}
                                        source={
                                          focused ? item.selectIcon : item.icon
                                        }
                                      />
                                    );
                                  },
                                }}>
                                {() => (
                                  <Drawer.Navigator
                                    // hideStatusBar
                                    drawerType="back"
                                    drawerPosition="right"
                                    // statusBarAnimation="fade"
                                    drawerStyle={{
                                      backgroundColor: '#c6cbef',
                                      width: 242,
                                    }}
                                    // initialRouteName="set"
                                    >
                                    <Drawer.Screen
                                      name="set"
                                      component={Set}
                                    />
                                    
                                  </Drawer.Navigator>
                                )}
                              </BottomTabs.Screen>
                            );
                          }
                          return (
                            <BottomTabs.Screen
                              key={item.id}
                              name={item.name}
                              component={item.component}
                              options={{
                                tabBarIcon: ({focused}) => {
                                  return (
                                    <Image
                                      // eslint-disable-next-line react-native/no-inline-styles
                                      style={{width: 25, height: 25}}
                                      source={
                                        focused ? item.selectIcon : item.icon
                                      }
                                    />
                                  );
                                },
                              }}
                            />
                          );
                        })}
                        {/* <BottomTabs.Screen
                          name="homeTab"
                          component={Home}
                          options={{
                            tabBarIcon: ({focused}) => {
                              return (
                                <Image
                                  style={{width: 25, height: 25}}
                                  source={
                                    focused ? IconBox.homes : IconBox.home
                                  }
                                />
                              );
                            },
                          }}
                        />
                        <BottomTabs.Screen name="selectTab" component={Home} />
                        <BottomTabs.Screen name="uploadTab" component={Home} />
                        <BottomTabs.Screen name="likeTab" component={Home} />
                        <BottomTabs.Screen name="userTab">
                          {() => (
                            <Drawer.Navigator
                              hideStatusBar
                              drawerType="back"
                              drawerPosition="right"
                              statusBarAnimation="fade"
                              drawerStyle={{
                                backgroundColor: '#c6cbef',
                                width: '100%',
                              }}>
                              <Drawer.Screen name="appx" component={Home} />
                            </Drawer.Navigator>
                          )}
                        </BottomTabs.Screen> */}
                      </BottomTabs.Navigator>
                    )}
                  </Stack.Screen>

                  <Stack.Screen
                    name="direct"
                    component={Set}
                    options={{
                      animationTypeForReplace: 'pop',
                      gestureEnabled: true,
                    }}
                  />
                </Stack.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen name="direct" component={Set} />
            <Stack.Screen name="upload" component={Set} />
          </Stack.Navigator>
          {/*  */}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
