import { createAction } from '@reduxjs/toolkit';
import { moduleName } from './constants';

const setUserToLocal = createAction(`${moduleName}/setUser`, (payload) => {
  localStorage.setItem('user', JSON.stringify(payload)); // Сохраняем пользователя в Local Storage
  return { payload };
});

export default {
  setUserToLocal,
};