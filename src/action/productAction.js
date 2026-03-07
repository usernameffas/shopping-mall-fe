import api from "../utils/api";
import * as types from "../constants/product.constants";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_GET_REQUEST });
    const response = await api.get("/api/product", { params: { ...query } });
    dispatch({ 
      type: types.PRODUCT_GET_SUCCESS, 
      payload: { products: response.data.products, totalPageNum: response.data.totalPageNum } 
    });
  } catch (error) {
    dispatch({ type: types.PRODUCT_GET_FAIL, payload: error.message });
  }
};

const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
    const response = await api.get(`/api/product/${id}`);
    dispatch({ type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: response.data.product });
  } catch (error) {
    dispatch({ type: types.GET_PRODUCT_DETAIL_FAIL, payload: error.message });
  }
};

const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_CREATE_REQUEST });
    const response = await api.post("/api/product", formData);
    dispatch({ type: types.PRODUCT_CREATE_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage("상품 등록 완료!", "success"));
  } catch (error) {
    dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_DELETE_REQUEST });
    await api.delete(`/api/product/${id}`);
    dispatch({ type: types.PRODUCT_DELETE_SUCCESS, payload: id });
    dispatch(commonUiActions.showToastMessage("상품 삭제 완료!", "success"));
  } catch (error) {
    dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

const editProduct = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_EDIT_REQUEST });
    const response = await api.put(`/api/product/${id}`, formData);
    dispatch({ type: types.PRODUCT_EDIT_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage("상품 수정 완료!", "success"));
  } catch (error) {
    dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, "error"));
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};

export default productActions;