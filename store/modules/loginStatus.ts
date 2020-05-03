/*初始化*/
const initialState = {
  loginStatus: false,
};

/*登录*/
export const login = (type: string,value:any) => ({
  type,
  value
});
/**退出登录 */
export const logout = (type: string)=>({
    type
})
/*输出user仓库模块*/
export default (state = initialState, action:any) => {

  /*判断执行哪个方法*/
  switch (action.type) {
    case 'login':
      return {
        loginStatus: true,
      };
    case 'logout':
      return {
        loginStatus: false,
      };
    default:
      return state;
  }
};
