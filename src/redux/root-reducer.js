import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import loaderReducer from './loader/loader-reducer';
import userReducer from './user/user-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  user: userReducer,
  loading: loaderReducer,
});

export default persistReducer(persistConfig, rootReducer);
