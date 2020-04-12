/**集中处理reducer */
import {combineReducers} from 'redux';
import user from './modules/user';
import loginStatus from './modules/loginStatus';
export default combineReducers({
  user,
  loginStatus,
});
