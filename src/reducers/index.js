import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import usernameReducer from './usernameReducer';

export default combineReducers({
    loginReducer,
    usernameReducer,
})