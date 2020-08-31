import { actionTypes } from "./actionTypes";

export const logout = () => ({
  type: actionTypes.Logout,
});

export const login = (data) => ({
  type:actionTypes.Login,
  payload: data
})