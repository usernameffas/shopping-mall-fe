import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { commonUiActions } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 상품 ID를 가져옵니다.

  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);

  // 🛰️ 창고(Redux)에서 선택된 상품 정보를 마중 나갑니다.
  const { selectedProduct, loading } = useSelector((state) => state.product);

  useEffect(() => {
    // 🚚 페이지가 열리자마자 해당 ID의 진짜 상품 정보를 가져오라고 지시합니다.
    dispatch(productActions.getProductDetail(id));
  }, [id, dispatch]);

  const selectSize = (value) => {
    setSize(value);
    if (sizeError) setSizeError(false);
  };

  const addItemToCart = () => {
    if (size === "") {
      setSizeError(true);
      return;
    }
    // 카트 추가 로직은 다음 단계에서 조립합시다!
  };

  // ⏳ 물건을 가져오는 중이라면 로딩 스피너를 보여줍니다.
  if (loading || !selectedProduct) {
    return (
      <Container className="text-center">
        <ColorRing />
      </Container>
    );
  }

  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          {/* 🖼️ 가짜 H&M 주소 대신 진짜 상품 이미지를 연결합니다. */}
          <img
            src={selectedProduct?.image || "https://via.placeholder.com/400?text=No+Image"}
            className="w-100"
            alt={selectedProduct?.name}
          />
        </Col>
        <Col className="product-info-area" sm={6}>
          {/* 🏷️ "셔츠" 대신 진짜 이름을 출력합니다. */}
          <div className="product-info-name">{selectedProduct?.name}</div>
          {/* 💰 "45,000" 대신 진짜 가격을 통화 형식으로 보여줍니다. */}
          <div className="product-info-price">₩ {selectedProduct?.price?.toLocaleString()}</div>
          <div className="product-info-desc">{selectedProduct?.description}</div>

          <Dropdown
            className="drop-down size-drop-down"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Toggle
              className="size-drop-down"
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
            >
              {size === "" ? "사이즈 선택" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              {/* 📏 창고에 등록된 실제 사이즈 목록만 보여줍니다. */}
              {selectedProduct?.stock && Object.keys(selectedProduct.stock).length > 0 ? (
                Object.keys(selectedProduct.stock).map((s) => (
                  <Dropdown.Item key={s} eventKey={s}>
                    {s.toUpperCase()}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>품절</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          
          <div className="warning-message">
            {sizeError && "사이즈를 선택해주세요."}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;