import React, {useEffect, useCallback} from 'react';
import {Image, View, Text, StatusBar} from 'react-native';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import VerifyCode from './pages/register/VerifyCode';
import InputNamePassword from './pages/register/InputNamePassword';
import Forget from './pages/forget/Forget';
import ForgetVerifyCode from './pages/forget/ForgetVerifyCode';
import InputNewPassword from './pages/forget/InputNewPassword';

//转载导航的容器
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Camera from './pages/common/camera/Camera';
import tabBarConfig from './config/tabBarConfig';
import { Button } from '@ant-design/react-native';


const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Set = function () {
  const dispatch = useDispatch();
  const logoutAction = useCallback(
    () => {
      dispatch({type:"logout",value:false})
    },
    [dispatch],
  )

  return (
    <View>
      <Text>setting</Text>
      <Button type="primary" onPress={logoutAction}>退出登录</Button>
    </View>
  );
};
function Navigator() {
  const isLogin = useSelector((state: any) => state.loginStatus.loginStatus);
  console.log(isLogin);

  return (
    <>
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
      <SafeAreaProvider>
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
                                        drawerStyle={{
                                          backgroundColor: '#c6cbef',
                                          width: 242,
                                        }}>
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
                <Stack.Screen name="direct" component={Set} />
                <Stack.Screen name="upload" component={Set} />
              </>
            ) : (
              <Stack.Screen name="login">
                {() => (
                  <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                      // gestureEnabled: true,
                    }}
                    >
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen name="register" component={Register} />
                    <Stack.Screen name="verifyCode" component={VerifyCode} />
                    <Stack.Screen name="inputNamePassword" component={InputNamePassword} />
                    <Stack.Screen name="forget" component={Forget} />
                    <Stack.Screen name="inputNewPassword" component={InputNewPassword} />
                    <Stack.Screen name="forgetVerifyCode" component={ForgetVerifyCode} />
                  </Stack.Navigator>
                )}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

export default Navigator;
