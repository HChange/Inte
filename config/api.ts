const ADDRESS = 'http://192.168.1.106:8088';
export default {
  /**请求地址 */
  ADDRESS: ADDRESS,
  /**发送验证码 */
  SEND_CODE: ADDRESS + '/api/users/send_code',
  /**验证验证码 */
  VERIFY_CODE: ADDRESS + '/api/users/verify_code',
  /**注册 */
  REGISTER: ADDRESS + '/api/users/register',
  /**登录 */
  LOGIN: ADDRESS + '/api/users/Login',
  /**修改密码 */
  CHANGE_PASSWORD: ADDRESS + '/api/users/change_password',
  /**退出登录 */
  LOGOUT: ADDRESS + '/api/users/logout',
  /**检查登录状态 */
  CHECK_LOGIN: ADDRESS+'/api/users/check_login',
  /**设置个性签名 */
  SET_SIGN:ADDRESS+'/api/users/set_sign',
  /**获得用户信息 */
  GET_USERINFO:ADDRESS+'/api/users/get_userInfo',
  /**设置用户信息 */
  SET_USERINFO:ADDRESS+'/api/users/set_userInfo'
};