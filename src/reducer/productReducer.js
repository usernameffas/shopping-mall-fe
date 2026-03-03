import * as types from "../constants/product.constants";

const initialState = {
  products: [], // 📦 전체 목록 방 (ProductAll에서 사용)
  selectedProduct: null, // 🔍 상세 정보 방 (ProductDetail에서 사용)
  loading: false,
  error: ""
};

function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.PRODUCT_GET_REQUEST:
    case types.GET_PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true };

    case types.PRODUCT_GET_SUCCESS:
      return { ...state, loading: false, products: payload.products }; // products 방에 저장

    case types.GET_PRODUCT_DETAIL_SUCCESS:
      return { ...state, loading: false, selectedProduct: payload }; // selectedProduct 방에 저장

    case types.PRODUCT_GET_FAIL:
    case types.GET_PRODUCT_DETAIL_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}

export default productReducer;