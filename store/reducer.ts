/**集中处理reducer */
import {combineReducers} from 'redux';
import user from './modules/user';
export default combineReducers({
  user,
});
