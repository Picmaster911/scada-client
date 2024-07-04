import { createSlice } from '@reduxjs/toolkit';
import { moduleName } from './constants';
import checkUser from './thunks';
import setUserToLocal from './actions'; // Импортируйте ваш новый action

const initialState = {
  result: null,
  userName: null,
};

const authSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.checkUser.fulfilled, (state, { payload }) => {
        state.result = payload.result;
        state.userName = payload.userName;
      })
      .addCase(setUserToLocal.setUserToLocal, (state, { payload }) => {
        state = payload;
      });
  },
});

export default authSlice.reducer;