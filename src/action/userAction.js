import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";

const loginWithToken = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    dispatch({ type: types.LOGIN_REQUEST });
    const response = await api.get("/api/user/me");
    dispatch({ type: types.LOGIN_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL, payload: error.message });
  }
};

const loginWithEmail = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });
    const response = await api.post("/api/user/login", { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: response.data.user });
    sessionStorage.setItem("token", response.data.token);
    dispatch(commonUiActions.showToastMessage("로그인 성공!", "success"));
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage("이메일 또는 비밀번호가 틀렸습니다", "error"));
  }
};

const logout = () => async (dispatch) => {
  sessionStorage.removeItem("token");
  dispatch({ type: types.LOGOUT });
};

const registerUser = ({ email, name, password }, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_USER_REQUEST });
    await api.post("/api/user", { email, name, password });
    dispatch({ type: types.REGISTER_USER_SUCCESS });
    dispatch(commonUiActions.showToastMessage("회원가입 성공!", "success"));
    navigate("/login");
  } catch (error) {
    dispatch({ type: types.REGISTER_USER_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const loginWithGoogle = (credential) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });
    const response = await api.post("/api/user/google", { credential });
    dispatch({ type: types.LOGIN_SUCCESS, payload: response.data.user });
    sessionStorage.setItem("token", response.data.token);
    dispatch(commonUiActions.showToastMessage("구글 로그인 성공!", "success"));
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage("구글 로그인 실패", "error"));
  }
};

export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  registerUser,
  loginWithGoogle,
};