enum userType {
  SET_USERINFO = 'setUserInfo',
  CLEAR_USERINFO = 'clearUserInfo',
}

/*初始化*/
const initialState = {
  userInfo: {},
};

/*同步事件*/
export const add = (type: userType, value: any) => ({
  type,
  value,
});

/*输出user仓库模块*/
export default (state = initialState, action: {type: any; value: any}) => {
  /*判断执行哪个方法*/
  switch (action.type) {
    case userType.SET_USERINFO:
      return {
        userInfo: action.value,
      };
    case userType.CLEAR_USERINFO:
      return {
        userInfo: {},
      };
    default:
      return state;
  }
};
