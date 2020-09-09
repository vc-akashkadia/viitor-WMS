import { actionTypes } from "./actionTypes";

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const login = (data) => ({
  type: actionTypes.LOGIN,
  payload: data,
});

export const remember = (data) => ({
  type: actionTypes.REMEMBER_ME_ACTION,
  payload: data,
});
