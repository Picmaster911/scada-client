import { createAsyncThunk } from '@reduxjs/toolkit';
import { moduleName } from './constants';
import { controllerPut } from '../../api/controller';


const checkUser = createAsyncThunk(`${moduleName}/checkAuth`, async (req) => {
  console.log(req)
  const  { data }  = await controllerPut.put(req);
  return {...data, userName:req.username}
});

export default {
    checkUser
};