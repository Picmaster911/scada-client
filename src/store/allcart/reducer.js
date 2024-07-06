import { createSlice } from '@reduxjs/toolkit';
import { moduleName } from './constants';
import getAllCarts from './thunks';

const initialState = {
  respone: [],
  userName: null,
};

const getAllCartsSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarts.getAllCarts.fulfilled, (state, { payload }) => {
        state.respone = payload;
        state.userName = payload.userName;
      })
  },
});

export default getAllCartsSlice.reducer;