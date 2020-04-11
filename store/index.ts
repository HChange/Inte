import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
/*定义一个中间件数组*/
const middlewares = [thunkMiddleware];

/*中间件使用*/
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

/*输出创建store的方法*/
export default function configStore() {
  const store = createStore(rootReducer, enhancer);
  return store;
}
