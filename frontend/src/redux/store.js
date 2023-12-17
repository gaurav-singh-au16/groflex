import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducer/rootReducer';
import { checkAuthentication } from './action/authActions';

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(checkAuthentication());

export default store;
