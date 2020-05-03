enum userType {
  SET_USERINFO = 'setUserInfo',
  CLEAR_USERINFO = 'clearUserInfo',
  SET_USERDATA = 'setUserData',
  CLEAR_USERDATA = 'clearUserData',
  PUBLISH_POST = 'publishPost',
  DELETE_POST = 'deletePost',
}


/*初始化*/
const initialState = {
  userInfo: {},
  userData: {
    postCount:0,
    followCount:0,
    myFollowCount:0
  },
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
        ...state,
        userInfo: action.value,
      };
    case userType.CLEAR_USERINFO:
      return {
        ...state,
        userInfo: {},
      };
    case userType.SET_USERDATA:
      return {
        ...state,
        userData: {...state.userData, ...action.value},
      };
    case userType.CLEAR_USERDATA:
      return {
        ...state,
         userData: {
    postCount:0,
    followCount:0,
    myFollowCount:0
  },
      };
    case userType.PUBLISH_POST:
      return {
        ...state,
        userData: {
          ...state.userData,
          postCount: state.userData.postCount + 1,
        },
      };
    default:
      return state;
  }
};
