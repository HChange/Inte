/**集中处理reducer */
import {combineReducers} from 'redux';
import user from './modules/user';
import loginStatus from './modules/loginStatus';
import camera from './modules/camera';
export default combineReducers({
  user,
  loginStatus,
  camera
});
