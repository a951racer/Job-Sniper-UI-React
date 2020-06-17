import { REQUEST_LOGIN, LOGIN_SUCCESS, LOGOUT } from '../actionTypes/auth'
import AuthApi from '../../API/auth'

const api = new AuthApi();

export const requestLogin = () => {
  return {
    type: REQUEST_LOGIN
  }
}

export const loginSuccess = ({userId, token, tokenExpiration}) => {
  return {
    type: LOGIN_SUCCESS,
    userId: userId,
    token: token,
    tokenExpiration: tokenExpiration
  }
}

/*
export const loginFail = () => {
  return {
    type: LOGIN_FAIL
  }
}
*/

export const requestLogout = () => {
  return {
    type: LOGOUT
  }
}

export const login = (email, password) => async dispatch => {
  dispatch(requestLogin())
  const authData = await api.login(email, password)
  dispatch(loginSuccess(authData))
}

export const logout = () => async dispatch => {
  dispatch(requestLogout())
}