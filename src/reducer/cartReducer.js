import * as types from "../constants/cart.constants";
import { LOGOUT } from "../constants/user.constants";

const initialState = {
  cartList: [],
  cartItemCount: 0,
  loading: false,
  error: null,
};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART_REQUEST:
    case types.GET_CART_LIST_REQUEST:
    case types.DELETE_CART_ITEM_REQUEST:
    case types.UPDATE_CART_ITEM_REQUEST:
      return { ...state, loading: true };

    case types.GET_CART_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        cartList: payload.cart.items,
        cartItemCount: payload.cart.items.length, // ✅ 수정
      };

    case types.ADD_TO_CART_SUCCESS:
      return { ...state, loading: false };

    case types.DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartList: state.cartList.filter((item) => item._id !== payload), // ✅ 수정
        cartItemCount: state.cartItemCount - 1, // ✅ 수정
      };

    case types.UPDATE_CART_ITEM_SUCCESS:
      return { ...state, loading: false };

    case types.GET_CART_QTY_SUCCESS:
      return { ...state, cartItemCount: payload };

    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
}

export default cartReducer;