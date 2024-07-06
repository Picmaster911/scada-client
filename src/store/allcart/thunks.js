import { createAsyncThunk } from '@reduxjs/toolkit';
import { moduleName } from './constants';
import { controller } from '../../api/controller';


const getAllCarts = createAsyncThunk(`${moduleName}/checkAuth`, async (req) => {
  const  { data }  = await controller.get('http://scada.asuscomm.com:8081/api/v1/data');
  return data
});

export default {
  getAllCarts
};