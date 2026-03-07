import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const { selectedProduct, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
  }, [id]);

  const selectSize = (value) => {
    setSize(value);
    if (sizeError) setSizeError(false);
  };

  const addItemToCart = () => {
    if (size === "") {
      setSizeError(true);
      return;
    }
    dispatch(cartActions.addToCart({ id: selectedProduct._id, size }));
  };

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
          <img
            src={selectedProduct?.image || "https://via.placeholder.com/400?text=No+Image"}
            className="w-100"
            alt={selectedProduct?.name}
          />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info-name">{selectedProduct?.name}</div>
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