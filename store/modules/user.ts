enum userType {
  a = 'add',
  b = 'delete',
}

/*初始化*/
const initialState = {
  value: '初始值',
};

/*同步事件*/
export const add = (type: userType, value: any) => ({
  type,
  value,
});

/*输出user仓库模块*/
export default (state = initialState, action: ReturnType<typeof add>) => {
  /*判断执行哪个方法*/
  switch (action.type) {
    case userType.a:
      return {
        ...state,
        value: state.value + action.value,
      };
    default:
      return state;
  }
};
