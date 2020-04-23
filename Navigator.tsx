import React, {useEffect, useState} from 'react';
import {Image, StatusBar} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import VerifyCode from './pages/register/VerifyCode';
import InputNamePassword from './pages/register/InputNamePassword';
import Forget from './pages/forget/Forget';
import ForgetVerifyCode from './pages/forget/ForgetVerifyCode';
import InputNewPassword from './pages/forget/InputNewPassword';
import DrawerContent from './pages/common/drawerContent';
import Mine from './pages/mine/Mine';
import Setting from './pages/setting/Setting';
import EditInfo from './pages/editInfo/EditInfo';
import Loading from './pages/common/loading';
import EditPost from './pages/EditPost';

//转载导航的容器
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Camera from './pages/common/camera/Camera';
import tabBarConfig from './config/tabBarConfig';

import api from './config/api';

const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Navigator() {
  const [showLoad, setShowLoad] = useState(true);
  useEffect(() => {
    checkLogin();
    setTimeout(() => {
      setShowLoad(false);
    }, 1000);
  }, []);

  const dispatch = useDispatch();
  const checkLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('LOGINSTATUS');
      const userInfo = await AsyncStorage.getItem('USERINFO');

      if (value === 'true' && userInfo) {
        console.log("重新验证登录");
        dispatch({type: 'login', value: true});
        dispatch({type: 'setUserInfo', value: JSON.parse(userInfo)})
        let newUserInfo;
        let response = await fetch(api.GET_USERINFO);
        let res = await response.json();
        if (res && res.code === 0) {
          console.log("res");
          console.log(res);
          
          newUserInfo = res.data;
          await AsyncStorage.setItem('USERINFO', JSON.stringify(newUserInfo));
        } 
        dispatch({type: 'setUserInfo', value: newUserInfo});
      } else {
        console.log("else");
        
        let response = await fetch(api.CHECK_LOGIN, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        let result = await response.json();
        if (result && result.code === 0) {
          await AsyncStorage.setItem('LOGINSTATUS', 'true');
          let userInfo;
          let response = await fetch(api.GET_USERINFO);
          let res = await response.json();
          if (res && res.code === 0) {
            userInfo = res.data;
          } else {
            userInfo = result.data;
          }
          await AsyncStorage.setItem('USERINFO', JSON.stringify(userInfo));
          dispatch({type: 'login', value: true});
          dispatch({type: 'setUserInfo', value: userInfo});
        } else {
          dispatch({type: 'logout', value: false});
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const isLogin = useSelector((state: any) => state.loginStatus.loginStatus);

  return (
    <>
      <SafeAreaProvider>
        {showLoad ? (
          <Loading />
        ) : (
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="app"
              screenOptions={{
                headerShown: false,
                gestureEnabled: true,
              }}>
              {isLogin ? (
                <>
                  <Stack.Screen name="camera" component={Camera} />
                  <Stack.Screen name="editPost" component={EditPost} />
                  <Stack.Screen name="app">
                    {() => (
                      <Stack.Navigator
                        initialRouteName="app"
                        mode="card"
                        headerMode="none">
                        <Stack.Screen name="editInfo" component={EditInfo} />
                        <Stack.Screen name="app">
                          {() => (
                            <BottomTabs.Navigator
                              tabBarOptions={{
                                showLabel: false,
                                style: {
                                  backgroundColor: '#fafafa',
                                },
                                keyboardHidesTabBar: true,
                              }}>
                              {tabBarConfig.map((item) => {
                                if (item.children) {
                                  return (
                                    <BottomTabs.Screen
                                      key={item.id}
                                      name={item.name}
                                      options={{
                                        tabBarIcon: ({focused}) => {
                                          if (focused) {
                                            StatusBar.setBackgroundColor(
                                              '#f0f0f0',
                                            );
                                          }
                                          return (
                                            <Image
                                              style={{width: 25, height: 25}}
                                              source={
                                                focused
                                                  ? item.selectIcon
                                                  : item.icon
                                              }
                                            />
                                          );
                                        },
                                      }}>
                                      {() => (
                                        <Drawer.Navigator
                                          drawerType="back"
                                          drawerPosition="right"
                                          drawerContent={(props) => (
                                            <DrawerContent {...props} />
                                          )}
                                          edgeWidth={36}
                                          drawerStyle={{
                                            // backgroundColor: '#c6cbef',
                                            width: 242,
                                          }}>
                                          <Drawer.Screen
                                            name="mine"
                                            component={Mine}
                                          />
                                          <Drawer.Screen
                                            name="setting"
                                            component={Setting}
                                          />
                                          <Drawer.Screen
                                            name="collection"
                                            component={Setting}
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
                                            style={{width: 25, height: 25}}
                                            source={
                                              focused
                                                ? item.selectIcon
                                                : item.icon
                                            }
                                          />
                                        );
                                      },
                                    }}
                                  />
                                );
                              })}
                            </BottomTabs.Navigator>
                          )}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Stack.Screen>
                  <Stack.Screen name="direct" component={Setting} />
                  <Stack.Screen name="upload" component={Setting} />
                </>
              ) : (
                <Stack.Screen name="login">
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerShown: false,
                        // gestureEnabled: true,
                      }}>
                      <Stack.Screen name="login" component={Login} />
                      <Stack.Screen name="register" component={Register} />
                      <Stack.Screen name="verifyCode" component={VerifyCode} />
                      <Stack.Screen
                        name="inputNamePassword"
                        component={InputNamePassword}
                      />
                      <Stack.Screen name="forget" component={Forget} />
                      <Stack.Screen
                        name="inputNewPassword"
                        component={InputNewPassword}
                      />
                      <Stack.Screen
                        name="forgetVerifyCode"
                        component={ForgetVerifyCode}
                      />
                    </Stack.Navigator>
                  )}
                </Stack.Screen>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </>
  );
}

export default Navigator;
