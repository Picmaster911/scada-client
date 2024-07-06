import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/reducer'
import getAllCartsSlice from './allcart/reducer'

const rootReducer = combineReducers({
    authSlice,
    getAllCartsSlice,
});
const store = configureStore({ reducer: rootReducer });

export default store;
