const ADDRESS = 'http://www.hellochange.cn:8088';
export default {
  /**请求地址 */
  ADDRESS: ADDRESS,
  /****************************用户操作******************************************** */
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
  CHECK_LOGIN: ADDRESS + '/api/users/check_login',
  /**设置个性签名 */
  SET_SIGN: ADDRESS + '/api/users/set_sign',
  /**获得用户信息 */
  GET_USERINFO: ADDRESS + '/api/users/get_userInfo',
  /**id查询 */
  GET_USERBYID: ADDRESS + '/api/users/get_userById',
  /**设置用户信息 */
  SET_USERINFO: ADDRESS + '/api/users/set_userInfo',
  /**用户查询*/
  FIND_USER: ADDRESS + '/api/users/find_user',

  /*******************************帖子操作************************************** */
  /**发表帖子 */
  PUBLISH_POST: ADDRESS + '/api/posts/publish_post',
  /**删除帖子 */
  DELETE_POST: ADDRESS + '/api/posts/delete_post',
  /**查询一个用户的帖子列表 */
  GET_USERALLPOST: ADDRESS + '/api/posts/get_userAllPost',
  /**首页数据 */
  GET_HOMEALLPOST: ADDRESS + '/api/posts/get_homeAllPost',
  /**模糊查询帖子 */
  GET_POST: ADDRESS + '/api/posts/get_post',
  /**获取用户帖子总数 */
  GET_POSTCOUNT: ADDRESS + '/api/posts/get_postCount',
  /**id查询 */
  GET_POSTBYID: ADDRESS + '/api/posts/get_postById',
  /******************************帖子点赞操作*********************************** */
  /**点赞 */
  ADD_LIKE: ADDRESS + '/api/likes/add_like',
  /**取消点赞 */
  DELETE_LIKE: ADDRESS + '/api/likes/delete_like',
  /**查询帖子的点赞数 */
  GET_LIKECOUNT: ADDRESS + '/api/likes/get_likeCount',
  /**查询帖子的点赞列表 */
  GET_LIKELIST: ADDRESS + '/api/likes/get_likeList',
  /**查询用户点赞过的帖子数 */
  GET_MYLIKECOUNT: ADDRESS + '/api/likes/get_myLikeCount',
  /**查询用户点赞过的帖子列表 */
  GET_MYLIKELIST: ADDRESS + '/api/likes/get_myLikeList',

  /********************************帖子评论操作*************************************** */
  /**添加评论 */
  ADD_REPLY: ADDRESS + '/api/replys/add_reply',
  /**删除评论 */
  DELELE_REPLY: ADDRESS + '/api/replys/delete_reply',
  /**获得一个帖子的评论数 */
  GET_REPLYCOUNT: ADDRESS + '/api/replys/get_replyCount',
  /**获得一个帖子的评论列表 */
  GET_REPLYLIST: ADDRESS + '/api/replys/get_replyList',
  /**获得用户评论数 */
  GET_MYREPLYCOUNT: ADDRESS + '/api/replys/get_myReplyCount',
  /**获得用户评论的列表 */
  GET_MYREPLYLIST: ADDRESS + '/api/replys/get_myReplyList',

  /************************************收藏******************************************** */
  /**添加收藏 */
  ADD_COLLECTION: ADDRESS + '/api/collections/add_collection',
  /**移除收藏 */
  DELETE_COLLECTION: ADDRESS + '/api/collections/delete_collection',
  /**用户的收藏总数 */
  GET_COLLECTIONCOUNT: ADDRESS + '/api/collections/get_collectionCount',
  /**用户的收藏列表 */
  GET_COLLECTIONLIST: ADDRESS + '/api/collections/get_collectionList',

  /************************************关注********************************************* */
  /**添加关注 */
  ADD_FOLLOW: ADDRESS + '/api/follows/add_follow',
  /**取消关注 */
  DELETE_FOLLOW: ADDRESS + '/api/follows/delete_follow',
  /**用户的被关注数 */
  GET_FOLLOWCOUNT: ADDRESS + '/api/follows/get_followCount',
  /**用户的被关注列表 */
  GET_FOLLOWLIST: ADDRESS + '/api/follows/get_followList',
  /**用户的关注数 */
  GET_MYFOLLOWCOUNT: ADDRESS + '/api/follows/get_myFollowCount',
  /**用户的关注列表 */
  GET_MYFOLLOWLIST: ADDRESS + '/api/follows/get_myFollowList',
};