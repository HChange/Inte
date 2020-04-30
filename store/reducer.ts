/**集中处理reducer */
import {combineReducers} from 'redux';
import user from './modules/user';
import loginStatus from './modules/loginStatus';
import camera from './modules/camera';
import upload from './modules/upload';
import update from './modules/update';
import like from './modules/like';
export default combineReducers({
  user,
  loginStatus,
  camera,
  upload,
  update,
  like
});
