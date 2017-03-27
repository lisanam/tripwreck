import { combineReducers } from 'redux';
import SearchBarReducer from './SearchBarReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  auth: AuthReducer,
  searchInput: SearchBarReducer,
});
