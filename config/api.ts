const ADDRESS = "http://www.hellochange.cn:8088"
export default {
    /**请求地址 */
    ADDRESS:ADDRESS,
    /**发送验证码 */
    SEND_CODE:ADDRESS+"/api/users/send_code",
    /**验证验证码 */
    VERIFY_CODE:ADDRESS+"/api/users/verify_code",
    /**注册 */
    REGISTER:ADDRESS+"/api/users/register",
    /**登录 */
    LOGIN:ADDRESS+"/api/users/Login",
    /**修改密码 */
    CHANGE_PASSWORD:ADDRESS+"/api/users/change_password"
}