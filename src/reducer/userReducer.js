import * as types from "../constants/user.constants";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      return { ...state, loading: false, user: payload };
    case types.LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    case types.LOGOUT:
      return { ...state, user: null };
    case types.REGISTER_USER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_USER_SUCCESS:
      return { ...state, loading: false };
    case types.REGISTER_USER_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default userReducer;