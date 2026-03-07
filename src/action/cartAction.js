import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";

const addToCart = ({ id, size }) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_TO_CART_REQUEST });
    const response = await api.post("/api/cart", { productId: id, size, qty: 1 });
    dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage("장바구니에 추가됐습니다!", "success"));
  } catch (error) {
    dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const getCartList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_LIST_REQUEST });
    const response = await api.get("/api/cart");
    dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.message });
  }
};

const deleteCartItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
    await api.delete(`/api/cart/${id}`);
    dispatch({ type: types.DELETE_CART_ITEM_SUCCESS, payload: id });
    dispatch(commonUiActions.showToastMessage("상품이 삭제됐습니다!", "success"));
  } catch (error) {
    dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: error.message });
  }
};

const updateQty = (id, value) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
    const response = await api.put(`/api/cart/${id}`, { qty: value });
    dispatch({ type: types.UPDATE_CART_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: error.message });
  }
};

const getCartQty = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_QTY_REQUEST });
    const response = await api.get("/api/cart/qty");
    dispatch({ type: types.GET_CART_QTY_SUCCESS, payload: response.data.qty });
  } catch (error) {
    dispatch({ type: types.GET_CART_QTY_FAIL, payload: error.message });
  }
};

export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};