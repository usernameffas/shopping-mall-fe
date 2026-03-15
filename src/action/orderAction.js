import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const response = await api.post("/api/order", payload);
    dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: response.data.orderNum });
    dispatch(cartActions.getCartList());
    dispatch(commonUiActions.showToastMessage("주문이 완료됐습니다!", "success"));
    } catch (error) {
      dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.error });
      dispatch(commonUiActions.showToastMessage(error.error || "주문에 실패했습니다.", "error"));
    }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST });
    const response = await api.get("/api/order");
    dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data.order });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_FAIL, payload: error.message });
  }
};

const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST });
    const response = await api.get("/api/order", { params: { ...query } });
    dispatch({ type: types.GET_ORDER_LIST_SUCCESS, payload: response.data.orders });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: error.message });
  }
};

const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });
    const response = await api.put(`/api/order/${id}`, { status });
    dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: response.data.order });
  } catch (error) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, payload: error.message });
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};